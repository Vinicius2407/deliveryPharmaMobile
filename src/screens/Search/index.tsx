import { useState, useEffect, useRef } from "react";
import { Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CaretLeft, Check } from "phosphor-react-native";

import { Wrapper } from "../../components/Wrapper";
import { Input } from "../../components/Input";
import { styles } from "../../globals/styles.global";
import { BackButton, InputContainer, Row, SearchButton } from "./styles";
import { List } from "../../components/List";
import { ProductListItem } from "../../components/ProductListItem";
import { api } from "../../services/api.service";
import { IProduct } from "../../utils/interfaces.backend";

interface RenderItemProps {
  item: IProduct;
  index: number;
}

export function Search() {
  const inputRef = useRef<TextInput>(null);

  const { navigate, goBack } = useNavigation();

  const [searchValue, setSearchValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([]);

  function handleGoBack() {
    goBack();
  }

  async function handleSearchProduct() {
    if(searchValue.trim().length == 0) {
      Alert.alert('Favor, preencha o campo.')
      return false;
    }
    try {
      const { data } = await api.get<IProduct[]>('produtos', { params: { nome: searchValue }})
      if (data.length > 0) {
        setSearchedProducts(data)
      }
    } catch (error: any) {
      Alert.alert('Erro inesperado ao buscar o produto')
    }
  }

  function handleProductDetails(product: IProduct) {
    navigate("ProductDetails" as never, { product } as never);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Wrapper>
      <Row>
        <BackButton onPress={handleGoBack} activeOpacity={0.7}>
          <CaretLeft color={styles.colors.heading} size={26} />
        </BackButton>
        <InputContainer>
          <Input 
            inputRef={inputRef} 
            icon="MagnifyingGlass" 
            placeholder="Pesquisar produto"
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
          />
        </InputContainer>
        <SearchButton onPress={handleSearchProduct}>
          <Check size={26} color={styles.colors.body} weight='bold' />
        </SearchButton>
      </Row>
      <List
        data={searchedProducts}
        numColumns={2}
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item, index }: RenderItemProps) => (
          <ProductListItem
            index={index}
            nome={item.nome}
            imagem={item.imagem}
            valor_unitario={item.valor_unitario}
            onPress={() => handleProductDetails(item)}
          />
        )}
        //extraData
      />
    </Wrapper>
  );
}