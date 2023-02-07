import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useRoute, NavigationProp } from "@react-navigation/native";
import { Wrapper } from "../../components/Wrapper";
import { GoBackButton } from "../../components/GoBackButton";
import { Column, Highlight, RowJustifyBetween, styles, Text } from "../../globals/styles.global";
import { Row } from "../../globals/styles.global";
import { CheckCircle, XCircle } from "phosphor-react-native";
import { api } from '../../services/api.service';
import { IVendaAtualizacao } from '../../utils/interfaces.backend';
import { formatDateAndTime } from '../../utils/date.format.util';
import { OrderStatus } from '../../components/OrderStatus';

const defaultStatus = ['SOLICITADA', 'SEPARACAO', 'ENTREGA', 'CONCLUIDA', 'REPROVADA'];

interface TrackOrderProps {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
    props: any;
}

interface RouteParams {
    id: number | string;
}

export function TrackOrder({ navigation }: any) {
    const route = useRoute()
    const { id } = route.params as RouteParams

    const [orderStatusUpdates, setOrderStatusUpdates] = useState<IVendaAtualizacao[]>([])

    async function trackOrderStatus() {
        try {
            const { data } = await api.get<IVendaAtualizacao[]>(`venda/atts/${id}`)

            if (data) {
                setOrderStatusUpdates(data)
            } else {
                throw new Error()
            }
        } catch (error: any) {
            console.log(error.message)
            Alert.alert('Acompanhar pedido', 'Erro ao acompanhar o status do pedido.')
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            trackOrderStatus()
        })
        return unsubscribe
    }, [navigation])

    return (
        <Wrapper>
            <RowJustifyBetween>
                <GoBackButton />
                <Highlight style={{ textTransform: 'uppercase' }}>Acompanhar pedido</Highlight>
                <GoBackButton disabled style={{ opacity: 0 }}/>
            </RowJustifyBetween>

            <>
                {/* {defaultStatus.map((defaultStatus) => {
                    const exits = orderStatusUpdates.some(function(orderStatus) {
                        return orderStatus.status == defaultStatus;
                    })
                    if (exits) {
                        return (
                            <Row key={defaultStatus} style={{ marginTop: 16, padding: 16, backgroundColor: styles.colors.opaques.green, borderRadius: 6, borderColor: styles.colors.green, borderWidth: 2 }}>
                                <CheckCircle size={30} color={styles.colors.green} weight='fill' style={{ margin: 6 }}/>
                                <Column style={{ marginLeft: 12 }}>
                                    <Text style={{ fontSize: 14 }}>123</Text>
                                    <OrderStatus status={defaultStatus} />
                                </Column>
                            </Row>
                        )
                    }else {
                        return (
                            <Row key={defaultStatus} style={{ marginTop: 16, padding: 16, backgroundColor: "#f1f3f5", borderRadius: 6, borderColor: styles.colors.border, borderWidth: 2 }}>
                                <Spinner size={30} color={styles.colors.body} weight='fill' style={{ margin: 6 }}/>
                                <Column style={{ marginLeft: 12 }}>
                                    <Text style={{ fontSize: 14, textTransform: 'uppercase' }}>{defaultStatus}</Text>
                                </Column>
                            </Row>
                        )
                    }
                })} */}
                {orderStatusUpdates.map(({ status, dh_atualizacao }) => {
                    if(status == 'REPROVADA') {
                        return (
                            <Row key={status} style={{ marginTop: 16, padding: 16, backgroundColor: styles.colors.contrast, borderRadius: 6, borderColor: styles.colors.red, borderWidth: 2 }}>
                                <XCircle size={30} color={styles.colors.red} weight='fill' style={{ margin: 6 }}/>
                                <Column style={{ marginLeft: 12 }}>
                                    <Text style={{ fontSize: 14, color: styles.colors.red }}>{formatDateAndTime(new Date(dh_atualizacao))}</Text>
                                    <OrderStatus status={status} />
                                </Column>
                            </Row>
                        )
                    }else {
                        return (
                            <Row key={status} style={{ marginTop: 16, padding: 16, backgroundColor: styles.colors.opaques.green, borderRadius: 6, borderColor: styles.colors.green, borderWidth: 2 }}>
                                <CheckCircle size={30} color={styles.colors.green} weight='fill' style={{ margin: 6 }}/>
                                <Column style={{ marginLeft: 12 }}>
                                    <Text style={{ fontSize: 14 }}>{formatDateAndTime(new Date(dh_atualizacao))}</Text>
                                    <OrderStatus status={status} />
                                </Column>
                            </Row>
                        )
                    }
                })}

                {/* <Row style={{ marginTop: 16, padding: 16, backgroundColor: "#f1f3f5", borderRadius: 6, borderColor: styles.colors.border, borderWidth: 2 }}>
                    <Spinner size={30} color={styles.colors.body} weight='fill' style={{ margin: 6 }}/>
                    <Column style={{ marginLeft: 12 }}>
                        <Text style={{ fontSize: 14, textTransform: 'uppercase' }}>{`pedido reprovado`}</Text>
                    </Column>
                </Row> */}
            </>
            {/* {handleTrack('SOLICITADA') && !handleTrack('REPROVADO') && (
                <Row>
                    <CheckCircle size={30} color={styles.colors.green} weight='fill' />
                    <Text>SOLICITADO</Text>
                </Row>
            )}
            {handleTrack('SEPARACAO') && !handleTrack('REPROVADO') && (
                <Row>
                    <CheckCircle size={30} color={styles.colors.green} weight='fill' />
                    <Text>EM SEPARAÇÃO</Text>
                </Row>
            )}
            {handleTrack('ENTREGA') && !handleTrack('REPROVADO') && (
                <Row>
                    <CheckCircle size={30} color={styles.colors.green} weight='fill' />
                    <Text>SAIU PARA ENTREGA</Text>
                </Row>
            )}
            {handleTrack('CONCLUIDA') && !handleTrack('REPROVADO') && (
                <Row>
                    <CheckCircle size={30} color={styles.colors.green} weight='fill' />
                    <Text>CONCLUÍDA</Text>
                </Row>
            )}
            {handleTrack('REPROVADA') && (
                <Row>
                    <XCircle size={30} color={styles.colors.red} weight='fill' />
                    <Text>REPROVADO</Text>
                </Row>
            )} */}
        </Wrapper>
    )
}