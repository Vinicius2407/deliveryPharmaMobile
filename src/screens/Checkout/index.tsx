import { useState } from 'react'
import { Alert, Image, ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { CameraSlash, Eye, FileArrowUp, User, Warning, XCircle } from "phosphor-react-native";
import { GoBackButton } from "../../components/GoBackButton";
import { SimpleButton } from "../../components/SimpleButton";
import { Wrapper } from "../../components/Wrapper";
import { useCart } from "../../contexts/CartContext";
import { Divider, Highlight, Row, RowJustifyBetween, styles, Text, Title } from "../../globals/styles.global";
import { formatCurrency } from "../../utils/format.util";
import { ImageContainer, OpenRecipe, RecipeContainer, UndoOrder, WarningContainer } from "./styles";
import { ModalPopup } from '../../components/ModalPopup';
import { IAddress } from '../../utils/interfaces.backend';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { api } from '../../services/api.service';
import * as ExpoImagePicker from "expo-image-picker";
import { BoxBordered } from './styles';


interface RouteParams {
    deliveryAddress: IAddress;
    deliveryFee: {
        distancia: string;
        tempoParaEntrega: string;
        valorDoFrete: string;
    }
}

interface OrderItens {
    produto: {
        id: string | number;
    };
    quantidade: string | number;
}


export function Checkout() {
    const { user, getUserID } = useAuthentication()
    const { productsCart, getTotalParcial, clearProductsFromCart } = useCart()
    const navigation = useNavigation()

    const route = useRoute()
    const { deliveryAddress, deliveryFee } = route.params as RouteParams

    const [modalVisible, setModalVisible] = useState<boolean>(false);


    const [image, setImage] = useState("");
    
    async function handleSelectImage() {
        const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();
        if (status === "granted") {
            const selected = await ExpoImagePicker.launchImageLibraryAsync({
                quality: 1,
                allowsEditing: true,
            });

            if (!selected.cancelled) {
                setImage(selected.uri);
            }
        }
    }

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleRecipeWarnings = () => {
        Alert.alert(
            'Aviso', 
            'A receita deste produto deve ser deixada com o entregador apos receber seu pedido!'
        )
    }

    const handleCheckoutConfirm = () => {
        Alert.alert(
            'Pedido', 
            'Finalizar o seu pedido?',
            [
                { text: 'Confirmar', onPress: () => handleCheckout() },
                { text: 'Cancelar', onPress: () => { return false } }
            ]
        )
    }

    async function handleCheckout() {
        const itensRequiredRecipe = productsCart.some((item) => item.precisa_receita)

        if(itensRequiredRecipe && image.trim().length == 0) {
            Alert.alert('Anexar receita', 'Há um item do carrinho que é obrigatório o anexo da receita!')
            return false;
        }

        if (user && deliveryAddress && productsCart.length > 0) {

            const itens = productsCart.map<OrderItens>((item, index) => {
                return {
                    produto: { id: item.id },
                    quantidade: item.quantidade
                } as OrderItens
            })

            if (!!image) {
                const orderWithRecipe = new FormData();

                orderWithRecipe.append("imagens_receitas", {
                    uri: image,
                    name: image.split("/").pop(),
                    type: "image/jpeg",
                } as any);

                const idCliente = getUserID() as string

                orderWithRecipe.append('status', 'SOLICITADA');
                orderWithRecipe.append('cliente', idCliente);
                orderWithRecipe.append('endereco', deliveryAddress.id);

                itens.map((item, index) => {
                    orderWithRecipe.append(`itens[${index}].produto.id`, item.produto.id.toString());
                    orderWithRecipe.append(`itens[${index}].quantidade`, item.quantidade.toString());
                })

                try {
                    const { data } = await api.post("/venda/add_with_image", orderWithRecipe, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                    });

                    if(data && data.id) {
                        Alert.alert('Pedido', 'Pedido realizado com succeso.')
                    }
                    clearProductsFromCart()
                    navigation.navigate('Orders' as never)
                } catch (error: any) {
                    console.log(error.message)
                    Alert.alert('Pedido', 'Não foi possivel realizar o pedido.')
                }
            } else {
                const orderWithoutRecipe = {
                    status: 'SOLICITADA',
                    cliente: {
                        id: getUserID() as string
                    },
                    endereco: {
                        id: deliveryAddress.id
                    },
                    itens: [
                        ...itens
                    ]
                }
                try {
                    const { data } = await api.post('venda/add', orderWithoutRecipe)
                    Alert.alert('Pedido', 'Pedido realizado com succeso.') 
                    if (data && data.id) {
                        clearProductsFromCart()
                    }
                    navigation.navigate('Orders' as never)
                } catch (error: any) {
                    console.log(error.message)
                    Alert.alert('Pedido', 'Não foi possivel realizar o pedido.')
                }
            }
        }
    }

    
    const handleUndoOrderConfirmation = () => {
        Alert.alert(
            'Cancelar pedido', 
            'Você tem certeza que quer cancelar o seu pedido?',
            [
                { text: 'Sim', onPress: () => handleUndoOrder() },
                { text: 'Não', onPress: () => { return false } }
            ]
        )
    }

    const handleUndoOrder = () => {
        clearProductsFromCart()
        navigation.navigate('Home' as never)
    }

    return (
        <Wrapper>
             <RowJustifyBetween style={{ backgroundColor: styles.colors.contrast }}>
                <GoBackButton />
                <Highlight style={{ fontSize: 16, textTransform: 'uppercase' }}>
                    Finalizar pedido
                </Highlight>
                <UndoOrder onPress={handleUndoOrderConfirmation}>
                    <XCircle size={26} color={styles.colors.heading} />
                </UndoOrder>
            </RowJustifyBetween>

            { modalVisible && (
                <ModalPopup modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} resizeMode='contain' />}
                </ModalPopup>
            )}
            
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16 }}
            >
                <Row>
                    <Title style={{ fontSize: 20 }}>
                        Itens do carrinho
                    </Title>
                </Row>

                {productsCart.length > 0 && (
                    productsCart.map(({ id, imagem, nome, valor_unitario, quantidade, precisa_receita, precisa_recolher_receita }) => {
                        return (
                            <View key={id} style={{ borderWidth: 1, borderColor: styles.colors.border, borderRadius: 6, padding: 8, marginVertical: 4 }}>
                                <Row style={{ justifyContent: 'space-between' }}>
                                    <Row style={{ justifyContent: 'space-between' }}>
                                        <Highlight style={{ fontSize: 16, width: '80%' }}>
                                            { nome }
                                        </Highlight>
                                    </Row>
                                    <ImageContainer>
                                        { imagem ? (
                                            <Image source={{ uri: imagem }} style={{ width: 50, height: 50 }} resizeMode="contain" />
                                        ) : (
                                            <CameraSlash color={styles.colors.border} size={35} />
                                        )}
                                    </ImageContainer>
                                </Row>
                                {precisa_receita && (
                                    <>
                                        <Divider />
                                        <Row>
                                            <RecipeContainer
                                                activeOpacity={0.8}
                                                onPress={handleSelectImage}
                                            >
                                                <FileArrowUp size={20} color="#FFF" weight="fill" />
                                                <Highlight style={{ marginLeft: 6, color: "#FFF" }}>
                                                    Anexar receita
                                                </Highlight>
                                            </RecipeContainer>
                                            { !!precisa_recolher_receita && precisa_recolher_receita && (
                                                <WarningContainer
                                                    activeOpacity={0.8}
                                                    onPress={handleRecipeWarnings}
                                                >
                                                    <Warning size={20} color="#FFF" weight="fill" />
                                                    <Highlight style={{ marginLeft: 6, color: "#FFF" }}>
                                                        Aviso
                                                    </Highlight>
                                                </WarningContainer>
                                            )}

                                            { !!image && (
                                                <OpenRecipe
                                                    activeOpacity={0.8}
                                                    onPress={handleModal}
                                                >
                                                    <Eye size={20} color={styles.colors.muted} />
                                                    <Highlight style={{ marginLeft: 6, color: styles.colors.muted }}>
                                                        Visualizar
                                                    </Highlight>
                                                </OpenRecipe>
                                            )}
                                        </Row>
                                    </>
                                )}
                                <Divider />
                                <Row style={{ justifyContent: 'space-between', marginVertical: 4 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: styles.colors.muted, marginRight: 8 }}>
                                        { `Unidade: ${quantidade} x ${formatCurrency(valor_unitario)}` }
                                    </Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: styles.colors.red, marginRight: 8 }}>
                                        { formatCurrency(valor_unitario * quantidade) }
                                    </Text>
                                </Row>
                            </View>
                        )
                    })
                )}

                <BoxBordered>
                    <Title style={{ fontSize: 20, textAlign: 'left' }}>
                        Endereço de entrega
                    </Title>

                    <Highlight style={{ fontSize: 16, marginTop: 8 }}>{deliveryAddress.descricao}</Highlight>
                    <Text style={{ marginTop: 4 }}>
                        {
                            `${deliveryAddress.logradouro}, ${deliveryAddress.numero} - ${deliveryAddress.bairro}`
                        }
                    </Text>
                    <Text style={{ marginTop: 4 }}>
                        {
                            `${deliveryAddress.cidade} - ${deliveryAddress.estado}, ${deliveryAddress.cep}`
                        }
                    </Text>
                    <Text style={{ marginTop: 4, color: styles.colors.heading }}>
                        {
                            `Aproximadamente ${parseInt(deliveryFee.tempoParaEntrega)} min para entrega` 
                        }
                    </Text>
                </BoxBordered>

                <BoxBordered>
                    <Title style={{ fontSize: 20, textAlign: 'left' }}>
                        Resumo
                    </Title>
                    <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                        <Text style={{ fontSize: 16, marginTop: 8 }}>
                            Subtotal dos produtos
                        </Text>
                        <Highlight style={{ fontSize: 16 }}>
                            { formatCurrency(getTotalParcial())}
                        </Highlight>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                        <Text>Taxa de entrega</Text>
                        <Highlight style={{ fontSize: 16 }}>
                            { formatCurrency(parseFloat(deliveryFee.valorDoFrete))}
                        </Highlight>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', marginTop: 4 }}>
                        <Highlight style={{ fontSize: 18 }}>
                        Total do pedido
                        </Highlight>
                        <Highlight style={{ fontSize: 18, color: styles.colors.red }}>
                            { formatCurrency(getTotalParcial() + parseFloat(deliveryFee.valorDoFrete))}
                        </Highlight>
                    </Row>
                </BoxBordered>
            </ScrollView>
            <SimpleButton 
                title="Finalizar pedido"
                styles={{ backgroundColor: styles.colors.green, marginTop: 24 }}
                activeOpacity={0.8}
                onPress={handleCheckoutConfirm}
            />
        </Wrapper>
    )
}