import { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { useNavigation } from '@react-navigation/native';
import { InputContainer, styles, Text, Title, Subtitle } from "../../globals/styles.global"
import { SimpleButton } from '../../components/SimpleButton';
import { Wrapper } from "../../components/Wrapper";
import { InputMasked } from '../../components/InputMasked';
import { Input } from '../../components/Input';

export function SignUp() {
    const navigation = useNavigation()

    const { signUp } = useAuthentication()

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [celular, setCelular] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => navigation.goBack()

    const validateForm = () => {
        if(nome.trim().length < 5) {
            Alert.alert('Nome completo', 'Por favor, preencha o seu nome completo!')
            return false;
        }

        if (cpf.length != 14){
            Alert.alert('C.P.F', 'Por favor, preencha o seu C.P.F corretamente!')
            return false;
        }
        
        if(celular.trim().length != 14) {
            Alert.alert('Celular', 'Por favor, preencha o seu número de celular!')
            return false;
        }

        if(username.trim().length == 0) {
            Alert.alert('Login', 'Por favor, preencha o informe o seu login!')
            return false;
        }

        if(password.trim().length == 0) {
            Alert.alert('Senha', 'Por favor, preencha o informe a sua senha!')
            return false;
        }

        return true
    }

    async function handleSignUp() {
        if(!validateForm()) return false;

        const userCredentials = {
            nome,
            cpf,
            celular,
            username,
            password,
            usuarioTipo: 'CLIENTE'
        }
        await signUp(userCredentials)
    }

    return (
        <Wrapper>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
                <>
                    <ScrollView style={{ flex: 1 }}>
                        <Title style={{ textAlign: 'left', marginTop: 32 }}>
                            Cadastre-se
                        </Title>
                        <Subtitle style={{ color: styles.colors.muted }}>
                            Informe seus dados abaixo
                        </Subtitle>

                        <InputContainer style={{ marginTop: 32 }}>
                            <Text style={{ marginBottom: 2 }}>Nome completo</Text>
                            <Input 
                                placeholder='Nome completo'
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                                // minLength={3}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>C.P.F</Text>
                            <InputMasked 
                                placeholder='000.000.000-00'
                                keyboardType='numeric'
                                value={cpf}
                                onChangeText={(text) => setCpf(text)}
                                maxLength={14}
                                // minLength={14}
                                mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}  
                            />
                        </InputContainer>
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Celular</Text>
                            <InputMasked 
                                placeholder='(45)99999-9999'
                                keyboardType='numeric'
                                value={celular}
                                onChangeText={(text) => setCelular(text)}
                                maxLength={14}
                                // minLength={14}
                                mask={["(",/\d/, /\d/, ")", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}  
                            />
                        </InputContainer>
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Login</Text>
                            <Input
                                placeholder='Login'
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                // minLength={5}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Senha</Text>
                            <Input
                                placeholder='Senha'
                                value={password}
                                type='password'
                                onChangeText={(text) => setPassword(text)}
                                // minLength={5}
                            />
                        </InputContainer>
                    </ScrollView>
                    <SimpleButton 
                        title='Criar conta'
                        styles={{ backgroundColor: styles.colors.blue }}
                        textStyles={{ fontSize: 18 }}
                        activeOpacity={0.8}
                        onPress={handleSignUp}
                    />
                    <SimpleButton 
                        title='Já possui uma conta? Entrar'
                        styles={{ backgroundColor: 'transparent', marginTop: 24 }}
                        textStyles={{ color: styles.colors.heading,  fontSize: 16 }}
                        activeOpacity={0.8}
                        onPress={handleSignIn}
                    />
                </>
            </TouchableWithoutFeedback>
        </Wrapper>
    )
}