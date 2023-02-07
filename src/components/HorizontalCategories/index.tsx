import { useState, useEffect } from 'react';
//import axios from 'axios';
import { FirstAidKit } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { CardCategory, Container, ScrollView, Title } from "./styles";
import { styles } from "../../globals/styles.global";
import { ICategory } from '../../utils/interfaces.backend'
import { api } from '../../services/api.service';

interface HorizontalCategoriesProps {
  showOnlyFavorites?: boolean;
} // Not used yet

export function HorizontalCategories({ showOnlyFavorites }: HorizontalCategoriesProps) {
  const navigation = useNavigation();
      
  const [categories, setCategories] = useState<ICategory[]>([]) 
  
  function handleGoToCategory(category: ICategory) { 
    navigation.navigate("CategoryProducts" as never, { category } as never);
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await api.get<ICategory[]>("/categoria")

        if (data) setCategories(data)
      
      } catch (error: any) {
        console.log(error.message)
      }
    }
    getCategories();
  }, []);

  return (
    <Container>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {categories.map((category, index) => {
          // const CustomIcon = category.icon ? Icon[category.icon] as any : Icon["FirstAidKit"];
          return (
            <CardCategory
              key={category.id}
              style={{ marginLeft: index ? 5 : 0 }}
              activeOpacity={0.6}
              onPress={() => handleGoToCategory(category)}
            >
              <FirstAidKit color={styles.colors.body} size={30} />
              <Title>{category.descricao}</Title>
            </CardCategory>
          );
        })}
      </ScrollView>
    </Container>
  );
}
