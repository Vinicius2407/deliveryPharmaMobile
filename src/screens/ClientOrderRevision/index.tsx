import { useEffect, useState } from 'react'
import { ScrollView, View, Image, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Wrapper } from "../../components/Wrapper";
import { IRecipe, OrderProps } from '../../utils/interfaces.backend';
import { api } from '../../services/api.service';
import { Loading } from '../../components/Loading';
import { Highlight, RowJustifyBetween, Row, styles, Text, Divider, Title, Column } from '../../globals/styles.global';
import { GoBackButton } from '../../components/GoBackButton';
import { Box, BoxBordered, ImageBox, Price, ShowRecipe } from './styles';
import { formatDate } from '../../utils/date.format.util';
import { formatCurrency } from '../../utils/format.util';
import { CameraSlash, Eye } from 'phosphor-react-native';
import { ModalPopup } from '../../components/ModalPopup';
import { SimpleButton } from '../../components/SimpleButton';
import { OrderStatus } from '../../components/OrderStatus';
import { useAuthentication } from '../../contexts/AuthenticationContext';

interface RouteParams {
    id: number | string;
}

const statusOrderSequence = ['SEPARACAO', 'ENTREGA', 'CONCLUIDA'];

export function ClientOrderRevision() {
    const { getUserID } = useAuthentication()
    const userID = getUserID() as string;

    const route = useRoute()
    const { id } = route.params as RouteParams

    const { navigate } = useNavigation()

    const [orderStatus, setOrderStatus] = useState('');
    const [clientOrderInformations, setClientOrderInformations] = useState<OrderProps>();
    const [orderRecipes, setOrderRecipes] = useState<IRecipe[]>([])
    const [imageBase64, setBase64Image] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    async function downloadRecipe(arquivo: string) {
        try {
            if(!!arquivo && arquivo.length < 10) throw new Error()
            
            const { data } = await api.get<Blob>(`download/${arquivo}`, {responseType: 'blob'})
    
            const reader = new FileReader();
            
            reader.readAsDataURL(data);
            reader.onloadend = function () {
                let base64String = reader.result as string;
                let imageBase64 = base64String.replace('data:application/octet-stream;base64,', 'data:image/jpg;base64, ')
                setBase64Image(imageBase64)
            }
    
        } catch (error : any) {
            console.log(error.message)
            Alert.alert('Receita', 'Erro ao baixar a imagem da receita!')
        }
    }
    
    const handleModal = () => setModalVisible(!modalVisible)
    
    const handleShowRecipe = (arquivo : string) => {
        if (!!arquivo && arquivo.length > 0) {
            downloadRecipe(arquivo)
            handleModal()
        } else {
            Alert.alert('Receita', 'Erro ao carregar a imagem da receita!')
            return false
        }
    }

    const handleUpdateOrderStatusConfirmation = async(status: string) => {
        Alert.alert(
            'Status do pedido', 
            `Atualizar status do pedido para ${status.toUpperCase()}`,
            [
                { text: 'Confirmar', onPress: () => handleUpdateOrderStatus(status) },
                { text: 'Cancelar', onPress: () => { return false } }
            ]
        )
    }

    const handleUpdateOrderStatus = async(status: string) => {
        try{
            const { data } = await api.put<OrderProps>(`venda/edit_status/${id}`, {
                status,
                usuario: {
                    id: userID
                }
            })
            if (data && data.id) {
                setOrderStatus(data.status)
                Alert.alert('Status do pedido', 'Status do pedido atualizado com sucesso.')
            }
        } catch (error: any) {
            console.log(error.message)
            Alert.alert('Status do pedido', 'Não foi possivel atualizar o status do pedido.')
        }
    }

    const handleNextOrderStatusConfirmation = () => {
        Alert.alert(
            'Status do pedido', 
            `Atualizar status do pedido`,
            [
                { text: 'Confirmar', onPress: () => handleNextOrderStatus() },
                { text: 'Cancelar', onPress: () => { return false } }
            ]
        )
    }

    const handleNextOrderStatus = () => {
        const currentOrder = statusOrderSequence.indexOf(clientOrderInformations?.status as string)
        if (currentOrder < 3){
            const nextOrder = statusOrderSequence[currentOrder + 1];
            handleUpdateOrderStatus(nextOrder)
        }
    }

    const handleDenyOrder = () => navigate('DenyOrder' as never, { id } as never)


    useEffect(() => {
        async function getVendaById() {
            try {
                setIsLoading(true)
                const { data } = await api.get<OrderProps>('venda/one', { params: { id }})

                if (data && data.id) {
                    setClientOrderInformations(data)
                    
                    if (!!data.receitas && data.receitas.length > 0) {
                        setOrderRecipes(data.receitas)
                    }
                } else {
                    throw Error('Pedido não encontrado.')
                }

            } catch (error: any) {
                console.log(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        getVendaById()
    }, [orderStatus])

    return (
        <Wrapper>
            {isLoading ? <Loading /> : (
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <RowJustifyBetween>
                            <GoBackButton />
                            <Box style={{ padding: 6, borderColor: styles.colors.muted }}>
                                <Highlight style={{ fontSize: 18, fontFamily: styles.fonts.bold, textAlign: 'center', color: styles.colors.muted }}>
                                    {`pedido#${id}`}
                                </Highlight>
                            </Box>
                        </RowJustifyBetween>


                        <Box style={{ marginTop: 16, padding: 6, flexDirection:'row', justifyContent: 'center', alignItems: 'center', borderColor: styles.colors.border }}>
                            <Text>{ formatDate(new Date()) }</Text>
                        </Box>

                        <BoxBordered>
                            <Title style={{ fontSize: 18, color: styles.colors.heading, textAlign: 'left' }}>
                                Dados do cliente
                            </Title>
                            <Row style={{ justifyContent: 'space-between', marginTop: 16 }}>
                                <Text>Nome completo</Text>
                                <Text>{clientOrderInformations?.cliente.nome}</Text>
                            </Row>
                            <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                                <Text>C.P.F</Text>
                                <Text>{clientOrderInformations?.cliente.cpf}</Text>
                            </Row>
                        </BoxBordered>

                        <BoxBordered>
                            <Title style={{ fontSize: 18, color: styles.colors.heading, textAlign: 'left' }}>
                                Itens do pedido
                            </Title>
                            { clientOrderInformations && clientOrderInformations?.itens.length > 0 && (
                                clientOrderInformations?.itens.map(({ id, produto, quantidade, valor_total, valor_unitario }) => {
                                    return (
                                        <View key={id} style={{ flex: 1, borderRadius: 6 }}>
                                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
                                                <Row>
                                                    <ImageBox>
                                                        {!!produto.imagem ? (
                                                            <Image source={{ uri: produto.imagem }} resizeMode='contain' style={{ width: 30, height: 30 }} />
                                                        ):(
                                                        <CameraSlash size={40} color={styles.colors.border}/>
                                                        )}
                                                    </ImageBox>
                                                    <Column style={{ marginLeft: 6 }}>
                                                        <Text style={{ color: styles.colors.heading }}>{produto.nome}</Text>
                                                        <Text style={{ fontSize: 14 }}>{`${quantidade} x ${formatCurrency(valor_unitario)}`}</Text>
                                                    </Column>
                                                </Row>
                                                <Price style={{ fontSize: 18 }}>
                                                    { formatCurrency(valor_total)}
                                                </Price> 
                                            </Row>
                                        </View>
                                    )
                                })
                            )}
                        </BoxBordered>

                        {orderRecipes.length > 0 && (
                            <BoxBordered>
                                <Title style={{ fontSize: 18, color: styles.colors.heading, textAlign: 'left' }}>
                                    Receitas anexadas
                                </Title>
                                
                                <Row style={{ flexWrap: 'wrap' }}>
                                    {orderRecipes.map((recipe) => {
                                        return (
                                            <ShowRecipe key={recipe.id} onPress={() => handleShowRecipe(recipe.arquivo)}>
                                                <Eye color={styles.colors.heading} size={26} />
                                            </ShowRecipe>
                                        )
                                    })}
                                </Row>
                            </BoxBordered>
                        )}

                        <BoxBordered>
                            <Title style={{ fontSize: 18, color: styles.colors.heading, textAlign: 'left' }}>
                                Resumo
                            </Title>
                            
                            <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                                <Text style={{ fontSize: 14 }}>Subtotal do produtos</Text>
                                <Text style={{ fontSize: 14, color: styles.colors.heading }}>
                                    {!!clientOrderInformations?.valor_produtos && formatCurrency(clientOrderInformations?.valor_produtos)}
                                </Text>
                            </Row>
                            <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                                <Text style={{ fontSize: 14 }}>Taxa de entrega</Text>
                                <Text style={{ fontSize: 14, color: styles.colors.heading }}>{ clientOrderInformations?.valor_frete && formatCurrency(clientOrderInformations?.valor_frete)}</Text>
                            </Row>
                            <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                                <Text style={{ fontFamily: styles.fonts.bold, fontSize: 14, color: styles.colors.heading }}>Total do pedido</Text>
                                <Text style={{ fontFamily: styles.fonts.bold, fontSize: 14, color: styles.colors.heading }}>
                                    {!!clientOrderInformations?.valor_total && formatCurrency(clientOrderInformations?.valor_total)}
                                </Text>
                            </Row>
                        </BoxBordered>

                        <BoxBordered style={{ marginBottom: 16 }}>
                            <Title style={{ fontSize: 18, color: styles.colors.heading, textAlign: 'left', marginTop: 16 }}>
                                Endereço de entrega
                            </Title>

                            <Highlight style={{ fontSize: 16, marginTop: 8 }}>{clientOrderInformations?.endereco.descricao}</Highlight>
                            <Text style={{ fontSize: 14, marginTop: 4 }}>
                                {
                                    `${clientOrderInformations?.endereco.logradouro}, ${clientOrderInformations?.endereco.numero} - ${clientOrderInformations?.endereco.bairro}`
                                }
                            </Text>
                            <Text style={{ fontSize: 14, marginTop: 4 }}>
                                {
                                    `${clientOrderInformations?.endereco.cidade} - ${clientOrderInformations?.endereco.estado}, ${clientOrderInformations?.endereco.cep}`
                                }
                            </Text>
                        </BoxBordered>

                        {clientOrderInformations?.status == 'SOLICITADA' && (
                            <Row style={{ justifyContent: 'space-between', marginTop: 16 }}>
                                <SimpleButton 
                                    title='Reprovar pedido'
                                    style={{ width: '40%', backgroundColor: styles.colors.red }}
                                    textStyles={{ color: styles.colors.contrast }}
                                    onPress={handleDenyOrder}
                                />
                                <SimpleButton 
                                    title='Aprovar pedido'
                                    style={{ width: '40%', backgroundColor: styles.colors.green }}
                                    textStyles={{ color: styles.colors.contrast }}
                                    onPress={() => handleUpdateOrderStatusConfirmation('SEPARACAO')}
                                />
                            </Row>
                        )}

                        {clientOrderInformations?.status != 'SOLICITADA' && clientOrderInformations?.status != 'REPROVADA' && (
                            <>
                                <Box style={{ marginTop: 16, padding: 6, flexDirection:'row', justifyContent: 'center', alignItems: 'center', borderColor: styles.colors.border }}>
                                    {!!clientOrderInformations?.status && <OrderStatus status={clientOrderInformations?.status} /> }
                                </Box>

                                {clientOrderInformations?.status != statusOrderSequence[2] && (
                                    <SimpleButton 
                                        title='Atualizar status do pedido'
                                        style={{ backgroundColor: styles.colors.blue, marginTop: 16 }}
                                        textStyles={{ fontSize: 14 }}
                                        onPress={handleNextOrderStatusConfirmation}
                                    />
                                )}
                            </>
                        )}

                        <ModalPopup modalVisible={modalVisible} setModalVisible={setModalVisible}>
                            {imageBase64 && <Image source={{ uri: imageBase64 }} style={{ width: '100%', height: 200 }} resizeMode='contain'/>}
                        </ModalPopup>
                        
                    </View>
                </ScrollView>
            )}
        </Wrapper>
    )
}
