import { useState } from 'react'
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SimpleButton } from '../../components/SimpleButton';
import { GoBackButton } from "../../components/GoBackButton";
import { Wrapper } from "../../components/Wrapper";
import { Box, ColumnJustifyBetween, Highlight, InputContainer, RowJustifyBetween, styles, Text } from "../../globals/styles.global";
import { Input } from '../../components/Input';
import { consultarCEP } from '../../services/api.viacep';
import { IAddress } from '../../utils/interfaces.backend';
import { api } from '../../services/api.service';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { InputMasked } from '../../components/InputMasked';

interface RouteParams {
    address: IAddress;
}

export function EditAddress() {
    const { getUserID } = useAuthentication()
    const { goBack } = useNavigation()

    const route = useRoute()
    const { address } = route.params as RouteParams

    const [cep, setCep] = useState(address.cep)
    const [descricao, setDescricao] = useState(address.descricao)
    const [logradouro, setLogradouro] = useState(address.logradouro)
    const [bairro, setBairro] = useState(address.bairro)
    const [numero, setNumero] = useState(address.numero)
    const [cidade, setCidade] = useState(address.cidade)
    const [estado, setEstado] = useState(address.estado)

    const observacaoExtra = !!address.observacao ? address.observacao : ''
    const [observacao, setObservacao] = useState(observacaoExtra)

    const handleConsultaCEP = async() => {
        try {
            const viaCepResults = await consultarCEP(cep)
            if (!!viaCepResults) {

                if(!!viaCepResults.erro) throw Error('C.E.P - formato inválido!')
                if(viaCepResults.localidade != "Foz do Iguaçu") throw Error('C.E.P - formato inválido!')

                const { logradouro, bairro, localidade, uf, cep } = viaCepResults
                setCep(cep)
                setLogradouro(logradouro)
                setBairro(bairro)
                setCidade(localidade)
                setEstado(uf)

                return true
            } else {
                throw Error('C.E.P - formato inválido!')
            }
        } catch (error: any) {

            Alert.alert('C.E.P inválido', 'C.E.P não é da região de Foz do Iguaçu!')
            return false
        }
    }

    const validateForm = () => {
        if(descricao.trim().length < 3) {
            Alert.alert('Descrição', 'Por favor, preencha o campo Descrição!')
            return false;
        }

        if (cep.length != 9) {
            Alert.alert('C.E.P', 'Por favor, preencha o campo C.E.P!')
            return false;
        }
        
        if(logradouro.trim().length < 6) {
            Alert.alert('Logradouro', 'Por favor, preencha o campo Logradouro!')
            return false;
        }

        if(bairro.trim().length < 3) {
            Alert.alert('Bairro', 'Por favor, preencha o campo Bairro!')
            return false;
        }

        if(numero.trim().length == 0) {
            Alert.alert('Número', 'Por favor, preencha o campo N°!')
            return false;
        }

        return true
    }

    async function handleUpdateAddress() {
        if(!validateForm()) return false
        let isValidCep = await handleConsultaCEP()
        if(!isValidCep) return false;
        
        try {
            const userID = getUserID() as string

            const updatedAddress = {
                descricao, cep, logradouro, bairro, numero, cidade, estado, observacao
            }
            const { data } = await api.put(`endereco/${address.id}/${userID}`, updatedAddress)
            
            if (data && data.id) {
                Alert.alert(
                    'Endereço', 
                    'Endereço atualizado com sucesso.', 
                    [{ text: 'OK', onPress: () => goBack() }]
                )
            }
        } catch (error: any) {
            console.log(error.message)
            Alert.alert('Endereço', 'Erro ao atualizar o endereço.')
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
                                editar endereço
                            </Highlight>
                            <GoBackButton disabled style={{ opacity: 0 }} />
                        </RowJustifyBetween>

                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Descrição</Text>
                            <Input 
                                placeholder='Ex: Trabalho'
                                value={descricao}
                                onChangeText={(text) => setDescricao(text)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>C.E.P</Text>
                            <InputMasked 
                                value={cep}
                                onChangeText={(text) => setCep(text)}
                                onBlur={handleConsultaCEP}
                                maxLength={9}
                                keyboardType='numeric'
                                placeholder='000000-000'
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Logradouro</Text>
                            <Input 
                                placeholder='Logradouro'
                                value={logradouro}
                                onChangeText={(text) => setLogradouro(text)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Bairro</Text>
                            <Input 
                                placeholder='Bairro'
                                value={bairro}
                                onChangeText={(text) => setBairro(text)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <RowJustifyBetween>
                                <Box style={{ width: '20%' }}>
                                    <Text style={{ marginBottom: 2 }}>N°</Text>
                                    <Input 
                                        placeholder='N°'
                                        keyboardType='numeric'
                                        value={numero}
                                        onChangeText={(text) => setNumero(text)}
                                        maxLength={4}
                                    />
                                </Box>
                                <Box style={{ width: '55%' }}>
                                    <Text style={{ marginBottom: 2 }}>Cidade</Text>
                                    <Input 
                                        placeholder='Cidade'
                                        value={cidade}
                                        editable={false}
                                    />
                                </Box>
                                <Box style={{ width: '20%' }}>
                                    <Text style={{ marginBottom: 2 }}>Estado</Text>
                                    <Input 
                                        placeholder='U.F'
                                        value={estado}
                                        maxLength={2}
                                        editable={false}
                                    />
                                </Box>
                            </RowJustifyBetween>
                        </InputContainer>
                        <InputContainer>
                            <Text style={{ marginBottom: 2 }}>Observação...</Text>
                            <Input
                                placeholder='Observação...'
                                value={observacao}
                                onChangeText={(text) => setObservacao(text)}
                            />
                        </InputContainer>
                    </Box>

                    <SimpleButton 
                        title='Atualizar'
                        styles={{ backgroundColor: styles.colors.green }}
                        textStyles={{ fontSize: 16 }}
                        activeOpacity={0.8}
                        onPress={handleUpdateAddress}
                    />
                </ColumnJustifyBetween>
            </TouchableWithoutFeedback>
        </Wrapper>
    )
}