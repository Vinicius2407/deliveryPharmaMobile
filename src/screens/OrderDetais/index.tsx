import { useEffect, useState } from 'react';
import { Image, View, ScrollView, Alert } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { GoBackButton } from "../../components/GoBackButton";
import { Wrapper } from "../../components/Wrapper";
import { Text, Highlight, Row, styles, Column, Divider } from "../../globals/styles.global";
import { IVendaAtualizacao, OrderItemProps, OrderProps } from "../../utils/interfaces.backend";
import { ImageBox, Box, Title, Price } from "./styles";
import { OrderStatus } from "../../components/OrderStatus";
// import { List } from "../../components/List";
import { CameraSlash } from "phosphor-react-native";
import { formatCurrency } from "../../utils/format.util";
import { formatDate } from "../../utils/date.format.util";
import { SimpleButton } from '../../components/SimpleButton';
import { api } from '../../services/api.service';

interface RouteParamsData {
    order: OrderProps
}

interface RenderItemProps {
    item: OrderItemProps;
}

export function OrderDetails() {
    const [trackOrderUpdate, setTrackOrderUpdates] = useState<any>()
    const [deniedOrderDescription, setDeniedOrderDescription] = useState('')

    const route = useRoute()
    const { order } = route.params as RouteParamsData

    const navigation = useNavigation() 

    const handleTrackOrder = () => { navigation.navigate('TrackOrder' as never, { id: order.id } as never) }

    async function getTrackOrderUpdates() {
        try {
            const { data } = await api.get<IVendaAtualizacao[]>(`/venda/atts/${order.id}`)

            
            if (data && data.length > 0) {
                const searchDeniedStatus = data.filter((trackedOrder: any) => trackedOrder.status == 'REPROVADA')
    
                if (!!searchDeniedStatus && searchDeniedStatus.length != 0) {
                    setDeniedOrderDescription(searchDeniedStatus[0].observacao)
                }
                setTrackOrderUpdates(data)
            } else {
                throw new Error()
            }
        } catch (error : any) {
            console.log(error.message)
            Alert.alert('Status do pedido', 'Erro ao buscar as atualizações de status do pedido.')
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTrackOrderUpdates()
        })

        return unsubscribe;
    }, [navigation])

    return (
        <Wrapper>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>
                    <Row style={{ justifyContent: 'space-between'}}>
                        <GoBackButton />
                        <Box>
                            <Highlight style={{ fontSize: 18, color: styles.colors.body }}>
                                {`pedido#${order.id}`}
                            </Highlight>
                        </Box>
                    </Row>
                    <Box style={{ marginTop: 16 }}>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 12, textTransform: 'uppercase' }}>
                                { formatDate(new Date(order.dh_registro)) }
                            </Text>
                            <OrderStatus status={order.status} />
                        </Row>
                    </Box>

                    <Box style={{ marginTop: 16 }}>
                        <Title style={{ fontSize: 18, color: styles.colors.heading }}>
                            Itens do pedido
                        </Title>
                        {order.itens.length > 0 && (
                            order.itens.map((item) => {
                                return (
                                    <View key={item.id} style={{ flex: 1 }}>
                                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
                                            <Row>
                                                <ImageBox>
                                                    {!!item.produto.imagem ? (
                                                        <Image source={{ uri: item.produto.imagem }} resizeMode='contain' style={{ width: 30, height: 30 }} />
                                                    ):(
                                                    <CameraSlash size={40} color={styles.colors.border}/>
                                                    )}
                                                </ImageBox>
                                                <Column style={{ marginLeft: 6 }}>
                                                    <Text style={{ color: styles.colors.heading }}>{item.produto.nome}</Text>
                                                    <Text style={{ fontSize: 14 }}>{`${item.quantidade} x ${formatCurrency(item.produto.valor_unitario)}`}</Text>
                                                </Column>
                                            </Row>
                                            <Price style={{ fontSize: 18 }}>
                                                { formatCurrency(item.valor_total)}
                                            </Price> 
                                        </Row>
                                    </View>
                                )
                            })
                        )}
                    </Box>
                    <Box style={{ marginTop: 16 }}>
                        <Title style={{ fontSize: 18, color: styles.colors.heading }}>Resumo</Title>
                        <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                            <Text style={{ fontSize: 14 }}>Subtotal do produtos</Text>
                            <Text style={{ fontSize: 14, color: styles.colors.heading }}>{formatCurrency(order.valor_produtos)}</Text>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                            <Text style={{ fontSize: 14 }}>Taxa de entrega</Text>
                            <Text style={{ fontSize: 14, color: styles.colors.heading }}>{formatCurrency(order.valor_frete)}</Text>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                            <Text style={{ fontFamily: styles.fonts.bold, fontSize: 14, color: styles.colors.heading }}>Total do pedido</Text>
                            <Text style={{ fontFamily: styles.fonts.bold, fontSize: 14, color: styles.colors.heading }}>{formatCurrency(order.valor_total)}</Text>
                        </Row>
                    </Box>

                    <Box style={{ marginTop: 16 }}>
                        <Title style={{ fontSize: 20, color: styles.colors.heading }}>
                            Endereço de entrega
                        </Title>

                        <Highlight style={{ fontSize: 16, marginTop: 8 }}>{order.endereco.descricao}</Highlight>
                        <Text style={{ fontSize: 14, marginTop: 4 }}>
                            {
                                `${order.endereco.logradouro}, ${order.endereco.numero} - ${order.endereco.bairro}`
                            }
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 4 }}>
                            {
                                `${order.endereco.cidade} - ${order.endereco.estado}, ${order.endereco.cep}`
                            }
                        </Text>
                    </Box>

                    {order.status == 'CONCLUIDA' && (
                        <SimpleButton 
                            title='Ver histórico do pedido'
                            style={{ backgroundColor: styles.colors.green, marginTop: 32 }}
                            textStyles={{ fontSize: 14 }}
                            onPress={handleTrackOrder}
                        />  
                    )}

                    {order.status == 'REPROVADA' && (
                        <>
                            <Box style={{ marginTop: 16 }}>
                                <Highlight style={{ textAlign: 'center' }}>
                                    Infelizmente, seu pedido vou reprovado. {'\n'}
                                    Confira abaixo o motivo pelo qual seu pedido não foi aceito. {'\n'}
                                </Highlight>
                                <Divider />
                                <Text style={{ textAlign: 'center', padding: 16 }}>
                                    { deniedOrderDescription }
                                </Text>
                            </Box>

                            <SimpleButton 
                                title='Ver histórico do pedido'
                                style={{ backgroundColor: styles.colors.red, marginTop: 32 }}
                                textStyles={{ fontSize: 14 }}
                                onPress={handleTrackOrder}
                            />  
                        </>
                    )}

                    {order.status != 'CONCLUIDA' && order.status != 'REPROVADA' && (
                        <SimpleButton 
                            title='Acompanhar pedido'
                            style={{ backgroundColor: styles.colors.blue, marginTop: 32 }}
                            textStyles={{ fontSize: 14 }}
                            onPress={handleTrackOrder}
                        />  
                    )}
                </View>
            </ScrollView>
        </Wrapper>
    )
}