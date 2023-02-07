import { useRoute } from "@react-navigation/native";

import { Wrapper } from "../../components/Wrapper";
import { Input } from "../../components/Input";
import { ProductsList } from "../../components/ProductsList";
import { GoBackButton } from "../../components/GoBackButton";
import { Row, Title } from "./styles";
import { ICategory } from "../../utils/interfaces.backend";
//import { ICategory } from "../../components/HorizontalCategories";

// interface RouteParamsData {
//   category: {
//     id: string;
//     name: string;
//   };
// }

interface RouteParamsData {
  category: ICategory;
}
  

export function CategoryProducts() {
  const route = useRoute();

  const { category } = route.params as RouteParamsData;

  return (
    <Wrapper>
      <Row>
        <GoBackButton />
        <Title>{category.descricao}</Title>
      </Row>

      <Input icon="MagnifyingGlass" placeholder="Pesquisar produto" />

      <ProductsList categoryId={category.id} />
    </Wrapper>
  );
}
