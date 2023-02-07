import { useCallback, useMemo, useRef } from 'react'
import { ScrollView, TouchableOpacity,View } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import { X, XCircle } from 'phosphor-react-native';
import { CartButton } from "../../components/CartButton";
// import { HorizontalCategories } from "../../components/HorizontalCategories";
import { SearchInput } from "../../components/SearchInput";
import { VerticalCategories } from "../../components/VerticalCategories";
import { Wrapper } from "../../components/Wrapper";
import { Highlight, Row, styles, Title } from "../../globals/styles.global";
import { Subtitle } from "./styles";
import { CartItems } from '../../components/CartItems';
import { useCart } from '../../contexts/CartContext';
//import { ProductsList } from '../../components/ProductsList';

export function Searchh() {
    const { productsCart } = useCart()
    const bottomSheetRef = useRef<BottomSheet>(null)
    
    const snapPoints = useMemo(() => [1, '100%'], []);

    const handleBottomSheetExpand = useCallback(() => {
        bottomSheetRef.current?.expand()
    }, [])

    const handleBottomSheetClose = useCallback(() => {
        bottomSheetRef.current?.close()
    }, [])

    return (
        <Wrapper>
            <SearchInput />

            <Subtitle>
                <Highlight>Categorias</Highlight>
            </Subtitle>

            <ScrollView>
                <VerticalCategories />
            </ScrollView>

            { productsCart && productsCart.length > 0 && (
                <CartButton
                    quantidade={productsCart.length}
                    onPress={handleBottomSheetExpand}
                />
            )}

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                handleIndicatorStyle={{
                    backgroundColor: '#DDD',
                    width: '15%',
                }}
                enablePanDownToClose
                handleStyle={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                }}
                backgroundStyle={{
                    backgroundColor: styles.colors.contrast,
                    borderRadius: 0
                }}
                // backdropComponent={(backdropProps) => (
                //     <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
                // )}
                style={{
                    paddingHorizontal: 16,
                }}
                detached
                bottomInset={16}
            >
                <Row style={{ justifyContent: 'space-between' }}>
                    <Title style={{ marginLeft: 16 }}>Meu Carrinho</Title>
                    <TouchableOpacity onPress={handleBottomSheetClose} style={{ alignItems: 'flex-end' }}>
                        <XCircle size={26} color={styles.colors.heading} weight='bold'/>
                    </TouchableOpacity>
                </Row>
                <CartItems closeBottomSheet={handleBottomSheetClose}/>
            </BottomSheet>
        </Wrapper>
    );
}
