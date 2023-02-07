import { TouchableOpacityProps } from 'react-native';
import { ArrowSquareOut, CameraSlash } from "phosphor-react-native";
import { Image, ImageContainer, Item, Price, Row, Title } from "./styles";
import { Divider, styles } from "../../globals/styles.global";
import { formatCurrency } from "../../utils/format.util";

interface ProductListItemProps extends TouchableOpacityProps {
    index: number;
    imagem: string | null;
    nome: string;
    valor_unitario: number;
}

export function ProductListItem({ index, imagem, nome, valor_unitario, ...props }: ProductListItemProps) {
    return (
        <Item
            style={{
                marginLeft: index % 2 ? 8 : 0,
                marginTop: index > 1 ? 8 : 0,
            }}
            activeOpacity={0.6}
            {...props}
        >
            <Row>
                <ImageContainer
                    style={{
                        //borderWidth: item ? 0 : 1,
                        backgroundColor: imagem ? styles.colors.contrast : styles.colors.background,
                    }}
                >
                    {imagem ? (
                        <Image source={{ uri: imagem }} resizeMode="contain" />
                    ) : (
                    <CameraSlash color={styles.colors.border} size={30} />
                )}
                </ImageContainer>
                <ArrowSquareOut 
                    style={{ alignSelf: "flex-start" }} 
                    color={styles.colors.blue} 
                    size={15} 
                    weight="fill" 
                />
            </Row>
            <Title numberOfLines={2}>
                {nome}
            </Title>
            <Divider />
            <Price>
                {formatCurrency(valor_unitario)}
            </Price>
        </Item>
    )
}
