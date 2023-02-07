import { useState } from "react";
import { Alert, Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useAuthentication } from "../../contexts/AuthenticationContext";
import { SimpleButton } from "../../components/SimpleButton";
import { Input } from "../../components/Input";
import { Wrapper } from "../../components/Wrapper";
import { InputContainer, styles, Title, Subtitle } from "../../globals/styles.global";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface SignInProps {
    navigation: NavigationProp<ReactNavigation.RootParamList>
    props: any
}

export function SignIn({ navigation } : SignInProps) {
    const { signIn } = useAuthentication()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn() {
        if (username.trim().length == 0 || password.trim().length == 0) {
            Alert.alert('Entrar', 'Favor, preencha todos os campos!')
            return false
        }
        await signIn({ username, password })
    }

    const handleSignUp = () => navigation.navigate('SignUp' as never)

    return (
        <Wrapper>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
                <>
                    <ScrollView 
                        style={{ flex: 1 }} 
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                        <Title style={{ textAlign: 'left' }}>
                            Acessar conta
                        </Title>
                        <Subtitle style={{ color: styles.colors.muted }}>
                            Informe seus dados de acesso
                        </Subtitle>
                        <InputContainer style={{ marginTop: 32 }}>
                            <Input
                                placeholder='Login'
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                icon='User'
                            />
                        </InputContainer>
                        <InputContainer>
                            <Input 
                                placeholder='Senha'
                                value={password}
                                type='password'
                                onChangeText={(text) => setPassword(text)}
                                icon='Key'
                            />
                        </InputContainer>
                        <SimpleButton 
                            title="Entrar" 
                            style={{ backgroundColor: styles.colors.blue, marginTop: 24 }}
                            textStyles={{ color: styles.colors.contrast }} 
                            onPress={handleSignIn} 
                        />
                    </ScrollView>
                    <SimpleButton 
                        title='Ainda não possui conta? Cadastre-se'
                        styles={{ backgroundColor: 'transparent', marginTop: 24 }}
                        textStyles={{ color: styles.colors.heading,  fontSize: 16 }}
                        activeOpacity={0.8}
                        onPress={handleSignUp}
                    />
                </>
            </TouchableWithoutFeedback>
        </Wrapper>
    )
}