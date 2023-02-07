import { Image } from "react-native";
import { CameraSlash, MinusCircle, PlusCircle, Trash } from "phosphor-react-native";
import { Text, Column, Highlight, Row, RowJustifyBetween, styles } from "../../globals/styles.global";
import { formatCurrency } from "../../utils/format.util";
import { useCart } from "../../contexts/CartContext";
import { CartProductItem } from "../../utils/interfaces.backend";
import { BoxMinus, BoxPlus, ContainerQuantity, ImageContainer } from "./styles";

export function CardCartItem({ id, nome, valor_unitario, imagem, quantidade, precisa_receita, precisa_recolher_receita }: CartProductItem) {
    const { addProductToCart, removeProductFromCart } = useCart()

    return (
        <RowJustifyBetween style={{ marginVertical: 16, alignItems: 'flex-start' }}>
            <Row style={{ width: '50%' ,alignItems: 'flex-start' }}>
                <ImageContainer>
                    { imagem ? (
                        <Image source={{ uri: imagem }} style={{ width: 50, height: 50 }} resizeMode="contain" />
                    ) : (
                        <CameraSlash color={styles.colors.border} size={35} />
                    )}
                </ImageContainer>
                <Column>
                    <Highlight style={{ fontSize: 16 }}>
                        { nome } 
                    </Highlight>
                    <Text style={{ fontSize: 14, marginTop: 4, fontWeight: 'bold' }}>
                        { formatCurrency(valor_unitario * quantidade) }
                    </Text>
                </Column>
            </Row>
            <ContainerQuantity>
                <BoxMinus
                    onPress={() => removeProductFromCart(id) } 
                    activeOpacity={0.6}
                >
                    {!!quantidade && ( quantidade === 1 ? (
                        <Trash size={24} color={styles.colors.heading} />
                    ) : (
                        <MinusCircle size={24} color={styles.colors.heading} />
                    ))}
                </BoxMinus>
                <Highlight style={{ padding: 6 }}>
                    {quantidade}
                </Highlight>
                <BoxPlus 
                    activeOpacity={0.6}
                    onPress={() => addProductToCart({ id, nome, valor_unitario, imagem, quantidade: 1, precisa_receita, precisa_recolher_receita })}
                >
                    <PlusCircle size={24} color={styles.colors.heading} />
                </BoxPlus>
            </ContainerQuantity>
        </RowJustifyBetween>
    )
}