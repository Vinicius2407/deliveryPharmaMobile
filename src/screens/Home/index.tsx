import { Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Wrapper } from "../../components/Wrapper";
import { SearchInput } from "../../components/SearchInput";
import { HorizontalCategories } from "../../components/HorizontalCategories";
import { ProductsList } from "../../components/ProductsList";
import { Divider, Highlight } from "../../globals/styles.global";
import { Header, ProfileButton, Subtitle, Title, Username } from "./styles";
import { useAuthentication } from "../../contexts/AuthenticationContext";
import avatar from '../../assets/images/flaticon/avatar.png'

export function Home() {
  const { user } = useAuthentication()
  const nome = user && user.nome.split(' ')[0]
  
  const { navigate } = useNavigation();

  function handleGoToAccount() {
    navigate("Account" as never);
  }

  return (
    <Wrapper>
      <Header>
        <Username>
          <Title>
            Hey, <Highlight>{ nome }</Highlight>
          </Title>
          <Subtitle>O que vai pedir hoje?</Subtitle>
        </Username>
        <ProfileButton activeOpacity={0.6} onPress={handleGoToAccount}>
          <Image source={avatar} resizeMode='contain' style={{ width: 60, height: 60 }}/>
        </ProfileButton>
      </Header>

      <SearchInput style={{ marginBottom: 20 }} />

      <HorizontalCategories />

      <Subtitle style={{ marginTop: 20 }}>
        <Highlight>Alguns produtos</Highlight>
      </Subtitle>

      {/* <Divider style={{ marginBottom: 0 }} /> */}

      <ProductsList />
    </Wrapper>
  );
}
