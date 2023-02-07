import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowSquareOut, CameraSlash } from "phosphor-react-native";
//import axios from "axios";
import { List } from "../List";
import { Divider, styles } from "../../globals/styles.global";
import { Image, ImageContainer, Item, Price, Row, Title } from "../ProductListItem/styles";
import { formatCurrency } from "../../utils/format.util";
import { ICategory, IProduct, ProductDataBackend } from '../../utils/interfaces.backend'
import { api } from "../../services/api.service";

interface ProductsListProps {
  categoryId?: number;
}

interface RenderItemBackendProps {
  item: ProductDataBackend;
  index: number;
}

export function ProductsList({ categoryId }: ProductsListProps) {
  const { navigate } = useNavigation();
  
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false)


  function handleProductDetails(product: IProduct) {
    navigate("ProductDetails" as never, { product } as never);
  }

  useEffect(() => {
    const getProductsFromDB = async () => {
      try {
        setIsLoading(true)
        const url = categoryId ? `/produto/categoria/${categoryId}` : "/produto";
        const { data } = await api.get(url);
        
        if (data) {
          setProducts(data)
        } 
      } catch (error: any) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    getProductsFromDB();
  }, []);

  return (
    <List
      data={products}
      numColumns={2}
      style={{ paddingTop: 10 }}
      contentContainerStyle={{ paddingBottom: 32 }}
      renderItem={({ item, index }: RenderItemBackendProps) => (
        <Item
          style={{
            marginLeft: index % 2 ? 8 : 0,
            marginTop: index > 1 ? 8 : 0,
          }}
          onPress={() => handleProductDetails(item)}
          activeOpacity={0.6}
        >
          <Row>
            <ImageContainer
              style={{
                borderWidth: item ? 0 : 1,
                backgroundColor: item.imagem ? styles.colors.contrast : styles.colors.background,
              }}
            >
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} resizeMode="contain" />
              ) : (
                <CameraSlash color={styles.colors.border} size={30} />
              )}
            </ImageContainer>
            <ArrowSquareOut style={{ alignSelf: "flex-start" }} color={styles.colors.blue} size={15} weight="fill" />
          </Row>
          <Title numberOfLines={2}>{item.nome}</Title>
          <Divider />
          <Price>{formatCurrency(item.valor_unitario)}</Price>
        </Item>
      )}
    />
  );
}
