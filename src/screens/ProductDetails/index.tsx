import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCart } from "../../contexts/CartContext";
import { CameraSlash, ShoppingCartSimple, CircleWavyWarning, User, MinusCircle, PlusCircle, Article } from "phosphor-react-native"

import { GoBackButton } from "../../components/GoBackButton";
import { Row, Description, Image, ImageContainer, Title, Box, Minus, Plus, ProductAmount, ProductPrice, Price, ButtonAddProductToCart, ProductInCart, RecipeContainer, UseContainer, BulaButton } from "./styles";
import { Divider, Highlight, styles, Text } from "../../globals/styles.global";
import { formatCurrency } from "../../utils/format.util";
import { CartProductItem, ProductDataBackend } from "../../utils/interfaces.backend";
import { ModalPopup } from "../../components/ModalPopup";

interface RouteParamsData {
    product: ProductDataBackend
}

export function ProductDetails() {
    const { getProductCountFromCart, addProductToCart } = useCart()
    //const changeTimer: React.MutableRefObject<any> = useRef(null);
    const route = useRoute();
    const { product } = route.params as RouteParamsData

    const [productCount, setProductCount] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    
    const productCountInCart = getProductCountFromCart(product.id)

    const handleIncreaseProductCount = () => setProductCount((state) => state + 1)
    const handleDecreaseProductCount = () => {
        if (productCount == 0) return false
        setProductCount((state) => state - 1)
    }

    function confirmAddProductToCart() {
        if (productCount == 0) {
            Alert.alert('Quantidade não especificada', 'Por favor, informe a quantidade desejada do produto');
            return false;
        }

        Alert.alert(`Adicionar ${product.nome} ao carrinho?`, `Quantidade: ${productCount}\nTotal ${formatCurrency(productCount * product.valor_unitario)}`, [
            {
                text: 'confirmar',
                onPress: handleAddProductToCart
            },
            {
                text: 'cancelar',
                onPress: () => { return false }
            },
        ])
    }

    const handleAddProductToCart = () => {
        const item = {
            id: product.id,
            nome: product.nome,
            valor_unitario: product.valor_unitario,
            imagem: product.imagem,
            quantidade: productCount,
            precisa_receita: product.precisa_receita,
            precisa_recolher_receita: product.precisa_recolher_receita,
        } as CartProductItem

        addProductToCart(item)

        setProductCount(0)

        Alert.alert('', 'Produto adicionado ao carrinho')
    }

    function showQuantityOfProductInCart() {
        Alert.alert('Carrinho', `Você já possui ${productCountInCart} unidade(s) deste produto em seu carrinho`)
    }

    const handleRecipeWarnings = () => {
        Alert.alert(
            'Receita', 
            'Para adquirir este produto, será necessário anexar a receita do mesmo, basta anexa-la durante a finalização do pedido.'
        )
    }

    const handleModalBula = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: styles.colors.background }}>
            <View style={{ flex: 1 }}>
                <ScrollView 
                    style={{ flex: 1, backgroundColor: styles.colors.contrast }} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >   
                    <Row style={{ padding: 16 }}>
                        <GoBackButton />
                        {
                            productCountInCart > 0 && (
                                <ProductInCart onPress={showQuantityOfProductInCart}>
                                    <ShoppingCartSimple color={styles.colors.blue} size={26} weight='bold' />
                                </ProductInCart>
                            )
                        }
                    </Row>
                    <ImageContainer>
                        { product.imagem ? (
                                <Image source={{ uri: product.imagem }} resizeMode="contain" />
                            ) : (
                                <CameraSlash color={styles.colors.border} size={108} />
                            )
                        }
                    </ImageContainer>
                    <View style={{ flex: 1, flexGrow: 1, backgroundColor: '#F0F0F0', padding: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                            <View style={{ width: 50, height: 4, borderRadius: 2, backgroundColor: styles.colors.heading }}></View>
                        </View>
                        <Title numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 22 }}>
                            {product.nome}
                            {product.conteudo && ` - ${product.conteudo}`}
                        </Title>
                        <Title numberOfLines={2} ellipsizeMode="tail">
                            {product.categoria.descricao}
                        </Title>
                        <Highlight style={{ fontSize: 18, marginTop: 16 }}>
                            Descrição
                        </Highlight>
                        <Description style={{ marginBottom: 8}}>
                            {`${product.descricao}`}
                        </Description>
                        <Divider />
                        <Row style={{ justifyContent: 'space-between', marginTop: 8 }}>
                            <UseContainer>
                                <User size={20} color={styles.colors.heading} />
                                <Highlight style={{ marginLeft: 6 }}>
                                    { product.uso }
                                </Highlight>
                            </UseContainer>
                            <BulaButton onPress={handleModalBula}>
                                <Article size={20} color={styles.colors.heading} />
                                <Highlight style={{ marginLeft: 6 }}>
                                    Bula
                                </Highlight>
                            </BulaButton>
                        </Row>
                        {product.precisa_receita && (
                            <RecipeContainer
                                activeOpacity={0.8}
                                onPress={handleRecipeWarnings}
                            >
                                <CircleWavyWarning size={20} color="#FFF" weight="fill" />
                                <Highlight style={{ marginLeft: 6, color: "#FFF" }}>
                                    Receita obrigatória
                                </Highlight>
                            </RecipeContainer>
                        )}
                        <Row style={{ justifyContent: 'space-between', marginVertical: 16 }}>
                            <ProductPrice>
                                <Price>{ formatCurrency(product.valor_unitario) }</Price>
                            </ProductPrice>
                            <Box style={{ justifyContent: "space-between" }}>
                                <Minus activeOpacity={0.6} onPress={handleDecreaseProductCount}>
                                    <MinusCircle size={32} color={styles.colors.heading} />
                                </Minus>
                                <ProductAmount style={{ marginHorizontal: 24 }}>
                                    {productCount}
                                </ProductAmount>
                                <Plus activeOpacity={0.6} onPress={handleIncreaseProductCount}>
                                    <PlusCircle size={32} color={styles.colors.heading} />
                                </Plus>
                            </Box>
                        </Row>
                        <ButtonAddProductToCart onPress={confirmAddProductToCart}>
                            <Highlight style={{ color: styles.colors.contrast }}>
                                Adicionar ao carrinho
                            </Highlight>
                        </ButtonAddProductToCart>
                    </View>
                </ScrollView>
                <ModalPopup modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <Highlight style={{ fontSize: 22, textAlign: 'center' }}>
                        Bula
                    </Highlight>
                    <Highlight>
                        {product.nome}
                    </Highlight>
                    <Text>
                        {!!product.bula && product.bula.length > 0 ? (
                            product.bula
                        ):(
                            'Não há informações sobre a bula...'
                        )}
                    </Text>
                </ModalPopup>
            </View>
        </SafeAreaView>
    );
}
