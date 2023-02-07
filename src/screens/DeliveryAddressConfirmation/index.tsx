import { useNavigation } from "@react-navigation/native";
import { CheckCircle, MinusCircle, Warning } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Alert, Image, View } from "react-native";
import { GoBackButton } from "../../components/GoBackButton";
import { List } from "../../components/List";
import { Loading } from "../../components/Loading";
import { SimpleButton } from "../../components/SimpleButton";
import { Wrapper } from "../../components/Wrapper";
import { Highlight, RowJustifyBetween, Text ,styles } from "../../globals/styles.global";
import { api } from "../../services/api.service";
import { IAddress } from "../../utils/interfaces.backend";
import { ActiveAddress, AdressContainer } from "./styles";

import MappinImage from '../../assets/images/flaticon/mappin.png' 
import { useAuthentication } from "../../contexts/AuthenticationContext";
import axios from "axios";

interface UserAdressesProps {
    enderecos: IAddress[]
}

interface RenderItemProps {
    item: IAddress;
}

export function DeliveryAddressConfirmation() {
    const { user } = useAuthentication()
    const { navigate } = useNavigation()

    const [userAdresses, setUserAdresses] = useState<IAddress[]>([])
    const [deliveryAddress, setDeliveryAddress] = useState<string>("0")
    const [deliveryFee, setDeliveryFee] = useState<any>()
    const [isLoadingAdresses, setIsLoadingAdresses] = useState(false)

    function confirmDeliveryAddress(id: string, descricao: string) {
        Alert.alert(
            'Endereço de entrega', 
            `Confirmar entrega neste endereço: ${descricao} ?`,
            [
                { text: 'Sim', onPress: () => handleDeliveryAddress(id) },
                { text: 'Não', onPress: () => { return false } },
            ]
        )
    }
    
    function handleDeliveryAddress(id: string) {
        setDeliveryAddress(id)
    }

    function handleGoToAdresses() {
        navigate("Adresses" as never)
    }

    function handleGoToCheckout() {
        const chosenAddress = userAdresses.filter((item) => item.id == deliveryAddress)[0] as IAddress

        navigate("Checkout" as never, { deliveryAddress: chosenAddress, deliveryFee  } as never)
    }

    useEffect(() => {
        async function getUserAdresses() {
            try {
                setIsLoadingAdresses(true)
                const { data } = await api.get(`cliente/${user?.id}`)

                if (!!data.enderecos) {
                    setUserAdresses(data.enderecos)
                }
                
            } catch (error: any) {
                console.log(error.message)
            } finally {
                setIsLoadingAdresses(false)
            }
        }
        getUserAdresses()
    }, [])

    useEffect(() => {
        async function getDeliveryFeeValue() {
            if(deliveryAddress != "0") {
                try {
                    const getAddressCEP = userAdresses.filter((address) => address.id == deliveryAddress)
                    const cepDestination = getAddressCEP[0].cep.replace('-', '')
                    const { data } = await axios.get(`http://18.231.178.72:3333/frete/cep?cep=85860000&cep_destino=${cepDestination}`)

                    //console.log(data)
                    if (data) {
                        setDeliveryFee(data)
                    }
                    
                } catch (error: any) {
                    console.log(error.message)
                }
            } else {
                return false
            }
        }
        getDeliveryFeeValue()
    }, [deliveryAddress])

    if (isLoadingAdresses) return <Loading />

    return (
        <Wrapper backgroundColor={styles.colors.background}>
            <RowJustifyBetween>
                <GoBackButton />
                <GoBackButton disabled style={{ opacity: 0 }} />
            </RowJustifyBetween>
            <Image source={MappinImage} resizeMode={"center"} style={{ width: '100%', height: 100, marginVertical: 16 }}/>
            <Highlight style={{ fontSize: 18, textAlign: 'center' }}>
                Endereço de entrega
            </Highlight>
            <Highlight style={{ textAlign: 'center', color: styles.colors.muted, padding: 8 }}>
                Selecione em qual endereço {'\n'} você gostaria de receber seu pedido
            </Highlight>
            { userAdresses.length > 0 ? (
                <>
                    <List
                        data={userAdresses}
                        numColumns={1}
                        renderItem={({ item }: RenderItemProps) => (
                            <AdressContainer key={item.id} style={{ borderColor: deliveryAddress == item.id ? styles.colors.green : styles.colors.border }}>
                                <ActiveAddress activeOpacity={0.5} onPress={() => confirmDeliveryAddress(item.id, item.descricao)}>
                                    {
                                        deliveryAddress == item.id ? (
                                            <CheckCircle size={24} weight="fill" color={styles.colors.green} />
                                        ) : (
                                            <MinusCircle size={24} weight="fill" color={styles.colors.border} />
                                        )
                                    }
                                </ActiveAddress>
                                <View style={{ flex: 1, padding: 18 }}>
                                    <Highlight style={{ fontSize: 18, marginBottom: 4 }}>
                                        {item.descricao}
                                    </Highlight>
                                    <Text>
                                        {`${item.logradouro}, ${item.numero} - ${item.bairro}`}
                                    </Text>
                                    <Text>
                                        {`${item.cidade} - ${item.estado}`}
                                    </Text>
                                </View>
                            </AdressContainer>
                        )}
                        style={{ marginBottom: 16 }}
                    />
                    <SimpleButton 
                        title="Avançar"
                        style={{ backgroundColor: styles.colors.green, marginBottom: 24 }}
                        textStyles={{ color: styles.colors.contrast }}
                        onPress={handleGoToCheckout}
                    />
                </>
            ): (
                <>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#FFF', marginTop: 32, borderRadius: 6, overflow: 'hidden', elevation: 2 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: styles.colors.red, paddingVertical: 24 }}>
                                <Warning size={60} color={styles.colors.contrast} />
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 16 }}>
                                <Highlight style={{ textAlign: 'center' }}>
                                    Não há endereços cadastrados! {'\n'}
                                    Cadastre um novo para finalizar sua compra {'\n'}
                                    Basta clicar no botão abaixo.
                                </Highlight>
                                <SimpleButton 
                                    title="Ir para meus endereços"
                                    style={{ backgroundColor: styles.colors.contrast, borderColor: styles.colors.border, borderWidth: 1, marginVertical: 16, borderRadius: 24 }}
                                    textStyles={{ color:styles.colors.heading }}
                                    onPress={handleGoToAdresses}
                                />
                            </View>
                        </View>
                    </View>
                </>
            )}
        </Wrapper>
        
    )
}