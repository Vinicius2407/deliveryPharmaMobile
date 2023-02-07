import { createContext, useContext, useEffect, useState } from "react";
import { getStorageObject, getStorageString, removeStorageItem, setStorageObject, setStorageString } from "../utils/asyncstorage.util";
import { api, setHeadersAuthorization } from "../services/api.service";
import { IUser } from "../utils/interfaces.backend";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface UserDataCredentials {
  nome?: string;
  cpf?: string;
  crf?: string;
  celular?: string;
  usuarioTipo: string;
}

interface UserAccessDataCredentials {
  username: string;
  password: string | null;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignUpCredentials {
    nome: string;
    cpf: string;
    celular: string;
    username: string;
    password: string;
    usuarioTipo: string;
}

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

interface AuthenticationContextData {
    user: IUser;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signUp: (credentials: SignUpCredentials) => Promise<void>;
    signOut: () => void;
    getUserID: () => string | undefined;
    updateUserData: (userData: UserDataCredentials) => Promise<void>;
    updateUserAccessData: (userAccessData: UserAccessDataCredentials) => Promise<void>;
}

const AuthenticationContext = createContext({} as AuthenticationContextData);

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const [user, setUser] = useState<any>();
  const isAuthenticated = !!user;

  const navigation = useNavigation()
  
  const [isLoading, setIsLoading] = useState(false);

  const getUserID = () => { return user?.id }

  async function signIn({ username, password }: SignInCredentials) {
    try {
      setIsLoading(true);

      const basicAuth = `${username}:${password}`
      setHeadersAuthorization(basicAuth)

      const { data: userAPI } = await api.get<IUser>(`login/${username}`)

      if (userAPI && userAPI.id) {
        await setStorageObject('@user', userAPI)
        await setStorageString('@user-auth', basicAuth)
        setUser(userAPI)
      }
    } catch (error: any) {
      console.log(error.message)
      Alert.alert('Entrar', 'Credenciais de acesso inválidas! Favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  async function signUp(credentials: SignUpCredentials) {
    try {
        setIsLoading(true)
        const { data: newUser } = await api.post<IUser>('cliente/add', credentials)

        if (newUser && newUser.id) {
            const { username, password } = credentials;

            const basicAuth = `${username}:${password}`
            
            await setStorageObject('@user', newUser)
            await setStorageString('@user-auth', basicAuth)

            setHeadersAuthorization(basicAuth)
            
            setUser(newUser)
        }
      } catch(error:any) {
          console.log(error.message)
          Alert.alert('Nova conta', 'Infelizmente, houve um erro durante a criação da sua conta. Favor, tente novamente')
      } finally {
          setIsLoading(false)
      }
  }

  async function signOut(){
    try {
      setIsLoading(true)

      await removeStorageItem('@user')
      await removeStorageItem('@user-auth')
        
      setUser(undefined)

    }catch(error: any) {
        console.log(error.message)
    } finally {
        setIsLoading(false)
    }
  }

  async function updateUserData(userData: UserDataCredentials) {
    try {
      if (userData.usuarioTipo == 'CLIENTE') {
        const data = { nome: userData.nome, cpf: userData.cpf, celular: userData.celular }

        const { data: userUpdated } = await api.put<IUser>(`cliente/edit/${user?.id}`, data)
  
        if (userUpdated && userUpdated.id) setUser(userUpdated)

      } else {
        const data = { nome: userData.nome, crf: userData.crf, celular: userData.celular }

        //console.log(data)

        const { data: userUpdated } = await api.put<IUser>(`farmaceutico/edit/${user?.id}`, data)
  
        if (userUpdated && userUpdated.id) setUser(userUpdated)
      }
      Alert.alert(
        'Dados pessoais', 
        'Seus dados pessoais foram atualizados com sucesso',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      )
    } catch (error: any) {
        console.log(error.message)
        Alert.alert(
          'Dados pessoais', 
          'Erro ao atualizar seus dados pessoais',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        )
    }
  }

  async function updateUserAccessData(userAccessData: UserAccessDataCredentials) {
      try {
          const { data: userUpdated } = await api.put<IUser>(`cliente/edit/${user?.id}`, userAccessData)

          if (userUpdated && userUpdated.id) {
              const { username, password } = userAccessData

              const currentBasicAuth = await getStorageString('@user-auth')
              
              if(!!password && password.length > 3) {
                const updatedBasicAuth = `${userUpdated.username}:${password}`
                
                await setStorageString('@user-auth', updatedBasicAuth)

                setHeadersAuthorization(updatedBasicAuth)
              } else {
                if (!!currentBasicAuth) setHeadersAuthorization(currentBasicAuth)
              }

              await setStorageObject('@user', userUpdated)

              setUser(userUpdated)
              Alert.alert('Dados de acesso', 'Dados de acesso atualizados com sucesso')
          }
      } catch (error: any) {
          console.log(error.message)
          Alert.alert('Dados de acesso', 'Erro ao atualizar seus dados de acesso')
      }
  }

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true)
        const userStorage = await getStorageObject("@user") as IUser | null
        if (!!userStorage) {
            const basicAuth = await getStorageString("@user-auth")

            if (!!basicAuth) {
                setHeadersAuthorization(basicAuth)

                setUser(userStorage)
            }
        } else {
          setUser(undefined)
        }
        setIsLoading(false)
      } catch (error: any) {
        console.log(error.message)
      }
    }
	  getUser()
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
        getUserID,
        updateUserData,
        updateUserAccessData
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
