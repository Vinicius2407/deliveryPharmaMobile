import { useState, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ArrowSquareOut } from "phosphor-react-native";
import { List } from "../../components/List";
import { Wrapper } from "../../components/Wrapper";
import { Divider, Highlight, Row, styles } from "../../globals/styles.global";
import { formatDate } from "../../utils/date.format.util";
import { formatCurrency } from "../../utils/format.util";
import { OrderProps } from "../../utils/interfaces.backend";
import { BoxContainer, BoxTitle, BoxButton, BoxButtonText, BoxSpan } from "./styles";
import { api } from "../../services/api.service";
import { OrderStatus } from "../../components/OrderStatus";
import { SimpleButton } from "../../components/SimpleButton";


interface RenderItemProps {
    index: number;
    item: OrderProps;
}

export function ClientsOrders() {
    const [allOrders, setAllOrders] = useState<OrderProps[]>([])
    //const [refreshList, setRefreshList] = useState(false)
    
    const navigation = useNavigation()

    const handleGoToClientOrderRevision = (id: string | number) => navigation.navigate('ClientOrderRevision' as  never, { id } as never)
    
    async function getAllOrders() {
        try {
            const { data } = await api.get<OrderProps[]>(`/venda`)

            if (data && data.length > 0) {
                setAllOrders(data)
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllOrders()
        })

        return unsubscribe;
    }, [navigation])

    return (
        <Wrapper>
            <Highlight style={{ fontSize: 18, textTransform: "uppercase", textAlign: 'center' }}>Solicitações</Highlight>

            <List 
                data={allOrders}
                emptyListMessage='Não há solicitações no momento.'
                style={{ marginBottom: -16}}
                contentContainerStyle={{ paddingBottom: 16 }}
                renderItem={({ index, item } : RenderItemProps) => (
                    <BoxContainer>
                        <BoxTitle>
                            {`pedido#${item.id}`}
                        </BoxTitle>
                        <Divider />
                        <Row style={{ justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 4 }}>
                            <BoxSpan>Nome</BoxSpan>
                            <BoxSpan>C.P.F</BoxSpan>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 4 }}>
                            <BoxSpan style={{ color: styles.colors.muted }}>
                                {!!item && item.cliente.nome}
                            </BoxSpan>
                            <BoxSpan style={{ color: styles.colors.muted }}>
                                {item.cliente.cpf}
                            </BoxSpan>
                        </Row>
                        <Divider />
                        <Row style={{ justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 4 }}>
                            <BoxSpan>Data do pedido</BoxSpan>
                            <BoxSpan style={{ color: styles.colors.muted }}>
                                { !!item.dh_registro ? formatDate(new Date(item.dh_registro)) : formatDate(new Date())}
                            </BoxSpan>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 4 }}>
                            <BoxSpan>Total do pedido</BoxSpan>
                            <BoxSpan style={{ color: styles.colors.muted }}>
                                { formatCurrency(item.valor_total) }
                            </BoxSpan>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 4 }}>
                            <BoxSpan>Status</BoxSpan>
                            <OrderStatus status={item.status} />
                        </Row>
                        <Divider />
                        <BoxButton onPress={() => handleGoToClientOrderRevision(item.id)}>
                            <BoxButtonText>
                                Revisar solicitação
                            </BoxButtonText>
                            <ArrowSquareOut color={styles.colors.blue} size={18} />
                        </BoxButton>
                    </BoxContainer>
                )}
                //extraData={refreshList}
            />
            {/* <SimpleButton 
                title="Atualizar lista"
                style={{ backgroundColor: styles.colors.blue }}
                onPress={() => setRefreshList(!refreshList)}
            /> */}
        </Wrapper>
    )
}