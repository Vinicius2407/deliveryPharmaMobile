import { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { useNavigation } from '@react-navigation/native';
import { GoBackButton } from "../../components/GoBackButton";
import { Wrapper } from "../../components/Wrapper";
import { SimpleButton } from '../../components/SimpleButton';
import { Input } from '../../components/Input';
import { ButtonIsPasswordEditable } from './styles';
import { CaretDown, CaretUp } from 'phosphor-react-native';
import { Box, ColumnJustifyBetween, Highlight, RowJustifyBetween, InputContainer, styles, Text } from "../../globals/styles.global";


export function EditUserAccessData() {
    const { user, updateUserAccessData } = useAuthentication()
    const navigation = useNavigation()

    // const [email, setEmail] = useState(user?.email);
    const [username, setUsername] = useState(user?.username);

    //const [senhaAtual, setSenhaAtual] = useState('');
    const [senhaNova, setSenhaNova] = useState<string>('');
    const [confirmarSenhaNova, setConfirmarSenhaNova] = useState('');
    
    const [isPasswordEditable, setIsPasswordEditable] = useState(false)
    
    const handleIsPasswordEditable = () => {
        //setSenhaAtual('')
        setSenhaNova('')
        setConfirmarSenhaNova('')
        setIsPasswordEditable(!isPasswordEditable)
    }

    const handleConfirmUpdate = () => {
        Alert.alert(`Dados de acesso`, `Tem certeza que quer atualizar seus dados de acesso?`, [
            {
                text: 'confirmar',
                onPress: handleUpdateUserAccessData
            },
            {
                text: 'cancelar',
                onPress: () => { return false }
            },
        ])
    }

    const handleUpdateUserAccessData = async () => {
        if(username?.trim().length == 0) {
            Alert.alert('Preencha o campo de login');
            return false;
        }

        if(isPasswordEditable && senhaNova != confirmarSenhaNova) {
            Alert.alert('Senhas não coincidem', 'As senhas não são iguais, favor, verifique')
            return false;
        }
        

        if (!!username && senhaNova.trim().length > 3) {
            await updateUserAccessData({ username, password: senhaNova })
        } else if (!!username) {
            await updateUserAccessData({ username, password: null })
        }

        navigation.goBack()
    }

    return (
        <Wrapper>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
                <ColumnJustifyBetween>
                    <Box>
                        <RowJustifyBetween>
                            <GoBackButton />
                            <Highlight style={{ fontSize: 16, textTransform: 'uppercase' }}>
                                editar dados de acesso
                            </Highlight>
                            <GoBackButton disabled style={{ opacity: 0 }} />
                        </RowJustifyBetween>

                        {/* <InputContainer>
                            <Input 
                                placeholder='E-mail'
                                keyboardType='email-address'
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </InputContainer> */}
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Login</Text>
                            <Input 
                                placeholder='Login'
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                // maxLength={8}
                            />
                        </InputContainer>
                        
                        <ButtonIsPasswordEditable 
                            activeOpacity={0.5}
                            style={{
                                backgroundColor: isPasswordEditable ? styles.colors.blue : styles.colors.contrast, 
                                borderColor: isPasswordEditable ? styles.colors.contrast : styles.colors.border, 
                            }}
                            onPress={handleIsPasswordEditable}
                        >
                            <Highlight 
                                style={{
                                    color: isPasswordEditable ? styles.colors.contrast : styles.colors.heading 
                                }}
                            >
                                Atualizar senha
                            </Highlight>
                            {
                                isPasswordEditable ? (
                                    <CaretDown 
                                        color={styles.colors.contrast} 
                                        size={18} 
                                        style={{ marginLeft: 4 }} 
                                    />
                                ): (
                                    <CaretUp 
                                        color={styles.colors.body} 
                                        size={18} 
                                        style={{ marginLeft: 4 }} 
                                    />
                                )
                            }
                        </ButtonIsPasswordEditable> 

                        {
                            isPasswordEditable && (
                                <>
                                    {/* <InputContainer>
                                        <Input 
                                            placeholder='Senha atual'
                                            type='password'
                                            value={senhaAtual}
                                            onChangeText={(text) => setSenhaAtual(text)}
                                        />
                                    </InputContainer> */}
                                    <InputContainer>
                                        <Text style={{ marginBottom: 2 }}>Nova senha</Text>
                                        <Input 
                                            placeholder='Nova senha'
                                            type='password'
                                            value={senhaNova}
                                            onChangeText={(text) => setSenhaNova(text)}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Text style={{ marginBottom: 2 }}>Confirmar senha</Text>
                                        <Input 
                                            placeholder='Confirmar nova senha'
                                            type='password'
                                            value={confirmarSenhaNova}
                                            onChangeText={(text) => setConfirmarSenhaNova(text)}
                                        />
                                    </InputContainer>
                                </>
                            )
                        }
                    </Box>

                    <SimpleButton 
                        title='Atualizar'
                        styles={{ backgroundColor: styles.colors.green }}
                        textStyles={{ fontSize: 16 }}
                        activeOpacity={0.8}
                        onPress={handleConfirmUpdate}
                    />
                </ColumnJustifyBetween>
            </TouchableWithoutFeedback>
        </Wrapper>
    )
}