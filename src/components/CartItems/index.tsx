import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../contexts/CartContext";
import { CaretRight } from 'phosphor-react-native';
import { Column, Divider, styles, Title } from "../../globals/styles.global";
import { formatCurrency } from "../../utils/format.util";
import { List } from "../List";
import { CardCartItem } from "../CardCartItem";
import { CartProductItem } from "../../utils/interfaces.backend";

interface CartItemsProps {
    closeBottomSheet: () => void;
}

interface RenderItemProps {
    item: CartProductItem;
}

export function CartItems({ closeBottomSheet } : CartItemsProps) {
    const { productsCart, getTotalParcial } = useCart();
    const { navigate } = useNavigation()

    function handleGoToDeliveryAddressConfirmation() {
        closeBottomSheet()
        navigate("DeliveryAddressConfirmation" as never)
    }

    return (
        <View style={{ flex: 1 }}>
            <Divider />
            <List
                data={productsCart}
                renderItem={({ item }: RenderItemProps) => (
                    <CardCartItem 
                        key={item.id}
                        id={item.id}
                        nome={item.nome}
                        imagem={item.imagem}
                        valor_unitario={item.valor_unitario}
                        quantidade={item.quantidade}
                        precisa_receita={item.precisa_receita}
                        precisa_recolher_receita={item.precisa_recolher_receita}
                    />
                )}
            />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Column>
                    <Text style={{ color: styles.colors.muted }}>Subtotal</Text>
                    <Title style={{ marginTop: 0, marginBottom: 0, color: styles.colors.blue }}>{formatCurrency(getTotalParcial())}</Title>
                </Column>
                <TouchableOpacity
                    onPress={handleGoToDeliveryAddressConfirmation}
                    activeOpacity={0.8}
                    style={{
                        width: '50%',
                        paddingVertical: 12, borderRadius: 20,
                        marginLeft: 32,
                        backgroundColor: styles.colors.green, flexDirection: 'row', 
                        justifyContent: 'center', alignItems: 'center', elevation: 1 
                    }}
                >
                    <Text style={{ color: styles.colors.contrast, fontWeight: "bold" }}>
                        Avançar
                    </Text>
                    <CaretRight size={20} color={styles.colors.contrast} weight={"bold"} style={{ marginLeft: 6 }}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
