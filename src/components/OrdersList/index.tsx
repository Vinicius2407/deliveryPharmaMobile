import { View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { List } from "../List";
import { Divider, Column, Text, styles } from "../../globals/styles.global";
import { BoxQuantity, Item, Price } from "./styles";
import { formatCurrency } from "../../utils/format.util";
import { Row, Highlight } from "../../globals/styles.global";
import { OrderStatus } from "../OrderStatus";
import { ArrowSquareOut } from "phosphor-react-native";
import { OrderProps } from "../../utils/interfaces.backend";
import { useEffect, useState } from "react";
import { api } from "../../services/api.service";
import { formatDate } from "../../utils/date.format.util";
import { useAuthentication } from "../../contexts/AuthenticationContext";

interface RenderItemProps {
    item: OrderProps;
    index: number;
}

export function OrdersList() {
    const { getUserID } = useAuthentication()
    const userID = getUserID();

    const navigation = useNavigation()

    const [clientOrders, setClientOrders] = useState<OrderProps[]>([])

    function handleOrderDetails(item: OrderProps) {
        navigation.navigate('OrderDetails' as never, { order: item } as never)
    }

    async function getOrders() {
        try {
            const { data } = await api.get<OrderProps[]>(`venda`)

            if (data && data.length > 0) {

                if (userID){
                    const orders = data.filter((item) => item.cliente.id == userID)

                    if (orders.length > 0) setClientOrders(orders)
                    else setClientOrders([])
                }
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getOrders()
        })

        return unsubscribe
    }, [navigation])

    return (
        <List
            data={clientOrders}
            emptyListMessage='Nenhum pedido efetuado.'
            // initialNumToRender={3}
            style={{ paddingTop: 6 }}
            contentContainerStyle={{ paddingBottom: 32 }}
            renderItem={({ item, index }: RenderItemProps) => (
                <Item
                    style={{ borderRadius: 6, elevation: 2, marginTop: index ? 12 : 0 }}
                    onPress={() => handleOrderDetails(item)}
                    activeOpacity={0.6}
                >
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Highlight>
                            { formatDate(new Date(item.dh_registro)) }
                        </Highlight>
                        <OrderStatus key={item.id} status={item.status} />
                    </Row>
                    <Divider />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end', paddingVertical: 4 }}>
                        <Column>
                            {item.itens.map(({ id, quantidade, produto }) => (
                                <Row key={id} style={{ marginVertical: 1 }}>
                                    <BoxQuantity style={{ marginRight: 6 }}>
                                        <Text>
                                            { quantidade.toString() }
                                        </Text>
                                    </BoxQuantity>
                                    <Highlight>
                                        { produto.nome }
                                    </Highlight>
                                </Row>
                            ))}
                        </Column>
                        <Price style={{ fontSize: 20 }}>
                            { formatCurrency(item.valor_total) }
                        </Price>
                    </Row>
                    <Divider />
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Highlight>
                            { `pedido#${item.id}` }
                        </Highlight>
                        <Row>
                            <Text style={{ color: styles.colors.blue, fontSize: 14, marginRight: 6 }}>
                                Ir para os detalhes do pedido
                            </Text>
                            <ArrowSquareOut color={styles.colors.blue} size={15} />
                        </Row>
                    </Row>
                </Item>
            )}
        />
    );
}
