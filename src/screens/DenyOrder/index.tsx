import { useState } from 'react'
import { Alert, Keyboard, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import { useRoute } from "@react-navigation/native";
import { Wrapper } from "../../components/Wrapper";
import { GoBackButton } from "../../components/GoBackButton";
import { Highlight, InputContainer, RowJustifyBetween, styles, Text } from "../../globals/styles.global";
import { Row } from "../../globals/styles.global";
import { api } from '../../services/api.service';
import { SimpleButton } from '../../components/SimpleButton';
import { InputDenyDescription } from './styles';
import { useAuthentication } from '../../contexts/AuthenticationContext';


interface RouteParams {
    id: number | string;
}

export function DenyOrder(props : any) {
    const { getUserID } = useAuthentication()
    const route = useRoute()
    const { id } = route.params as RouteParams 

    const [denyDescription, setDenyDescription] = useState('')

    const handleDenyOrderConfirmation = () => {
        if(denyDescription.trim().length < 10) {
            Alert.alert('Motivo', 'Por favor, deescreva o motivo da reprovação do pedido...')
            return false
        }

        Alert.alert(
            'Reprovar pedido', 
            `Você esta prestes a reprovar o pedido, confirmar ação?`,
            [
                { text: 'Confirmar', onPress: () => handleDenyOrder() },
                { text: 'Cancelar', onPress: () => { return false } }
            ]
        )
    }

    const handleDenyOrder = async() => {
        try{
            const userID = getUserID()

            const { data } = await api.put(`venda/edit_status/${id}`, {
                status: 'REPROVADA',
                observacao: denyDescription,
                usuario: {
                    id: userID
                }
            })
            if (data && data.id) {
                Alert.alert('Reprovar pedido', 'O pedido foi reprovado com sucesso.')
            }
        } catch (error: any) {
            console.log(error.message)
            Alert.alert('Reprovar pedido', 'Erro ao reprovar o pedido.')
        }
        props.navigation.navigate('ClientsOrders' as never)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <Wrapper>
                <RowJustifyBetween>
                    <GoBackButton />
                    <Highlight style={{ textTransform: 'uppercase' }}>Reprovar pedido</Highlight>
                    <GoBackButton disabled style={{ opacity: 0 }}/>
                </RowJustifyBetween>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
                    <>
                        <InputContainer style={{ flexGrow: 1 }}>
                            <Text style={{ marginBottom: 2 }}>Descreva o motivo do pedido ser reprovado...</Text>
                            <InputDenyDescription 
                                value={denyDescription}
                                onChangeText={(text) => setDenyDescription(text)}
                                multiline
                                style={{ textAlignVertical: 'top', lineHeight: 20 }}
                            />
                        </InputContainer>

                        <SimpleButton 
                            title='Reprovar pedido'
                            style={{ backgroundColor: styles.colors.red, marginVertical: 16 }}
                            textStyles={{ fontSize: 14 }}
                            onPress={handleDenyOrderConfirmation}
                        />
                    </>
                </TouchableWithoutFeedback>
            </Wrapper>
        </KeyboardAvoidingView>
    )
}