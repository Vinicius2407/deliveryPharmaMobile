import { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SimpleButton } from '../../components/SimpleButton';
import { GoBackButton } from "../../components/GoBackButton";
import { Wrapper } from "../../components/Wrapper";
import { Input } from '../../components/Input';
import { Box, ColumnJustifyBetween, Highlight, RowJustifyBetween, InputContainer, styles, Text } from "../../globals/styles.global";
import { InputMasked } from '../../components/InputMasked';

// interface EditUserDataProps {
//     navigation: NavigationProp<ReactNavigation.RootParamList>
//     props: any;
// }

export function EditUserData({ navigation } : any) {
    const { user, updateUserData } = useAuthentication()

    const [nome, setNome] = useState(user.nome);
    const [cpf, setCpf] = useState(user.cpf);
    const [crf, setCrf] = useState(user.crf)
    const [celular, setCelular] = useState(user?.celular);


    const validateForm = () => {
        if(nome.trim().length < 5) {
            Alert.alert('Nome completo', 'Por favor, preencha o seu nome completo!')
            return false;
        }

        if (!!cpf && cpf?.length != 14){
            Alert.alert('C.P.F', 'Por favor, preencha o seu C.P.F corretamente!')
            return false;
        }

        if (!!crf && crf?.length < 8){
            Alert.alert('C.E.P', 'Por favor, preencha o seu C.R.F corretamente!')
            return false;
        }
        
        if(celular.trim().length != 14) {
            Alert.alert('Celular', 'Por favor, preencha o seu número de celular!')
            return false;
        }

        return true
    }

    async function handleUpdateUserData () {
        if(!validateForm()) return false;

        if(user?.usuarioTipo == 'CLIENTE') {
            await updateUserData({ nome, cpf, celular, usuarioTipo: 'CLIENTE' })
        } else {
            await updateUserData({ nome, crf, celular, usuarioTipo: 'FARMACEUTICO' })
        }
    }

    return (
        <Wrapper>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
                <ColumnJustifyBetween>
                    <Box>
                        <RowJustifyBetween>
                            <GoBackButton />
                            <Highlight style={{ fontSize: 16, textTransform: 'uppercase' }}>
                                editar informações pessoais
                            </Highlight>
                            <GoBackButton disabled style={{ opacity: 0 }} />
                        </RowJustifyBetween>

                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Nome completo</Text>
                            <Input 
                                placeholder='Nome completo'
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                                // minLength={5}
                            />
                        </InputContainer>

                        {user?.usuarioTipo == 'CLIENTE' ? (
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
                        ):(
                            <InputContainer>
                                <Text style={{ marginBottom: 2 }}>C.R.F</Text>
                                <Input 
                                    placeholder='C.R.F'
                                    keyboardType='numeric'
                                    value={crf}
                                    onChangeText={(text) => setCrf(text)}
                                    maxLength={14}
                                />
                            </InputContainer>
                        )}

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
                    </Box>

                    <SimpleButton 
                        title='Atualizar'
                        styles={{ backgroundColor: styles.colors.blue }}
                        textStyles={{ fontSize: 16 }}
                        activeOpacity={0.8}
                        onPress={handleUpdateUserData}
                    />
                </ColumnJustifyBetween>
            </TouchableWithoutFeedback>
        </Wrapper>
    )
}