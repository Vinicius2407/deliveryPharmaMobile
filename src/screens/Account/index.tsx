import { Alert, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignOut, MapPin, CaretRight, UserCircle, Keyhole } from "phosphor-react-native";
import { Wrapper } from "../../components/Wrapper";
import { useAuthentication } from "../../contexts/AuthenticationContext";
import { Row, Highlight, styles, Divider, Column } from "../../globals/styles.global";
import { Title, LogOutButton, UserAvatar, Button } from "./styles";
import avatar from '../../assets/images/flaticon/avatar.png'

export function Account() {
    const { user, signOut } = useAuthentication()
    const { navigate } = useNavigation()

    const handleGoToAccountData = (typeData: 'ACCESS' | 'PERSONAL') => navigate("AccountData" as never, { typeData } as never)
    const handleGoToAdresses = () => navigate("Adresses" as never)

    function handleLogOut() {
        Alert.alert(
            'Deslogar da conta', 
            'Tem certeza que deseja deslogar da sua conta ?',
            [ 
                { text: 'Sim', onPress: () => signOut() },
                { text: 'Não', onPress: () => { return false } },
            ]
        )
    }

    return (
        <Wrapper>
            <View style={{ flex: 1 }}>

                <Title style={{ textAlign: 'center' }}>Meu perfil</Title>
                <Column style={{ marginVertical: 16, alignItems: 'center' }}>
                    <UserAvatar>
                        <Image source={avatar} resizeMode='contain' style={{ width: 80, height: 80 }}/>
                    </UserAvatar>
                    <Highlight style={{ textTransform: 'uppercase', marginTop: 6 }}>
                        { user?.nome}
                    </Highlight>
                    <Highlight style={{ color: styles.colors.muted }}>
                        { user?.username}
                    </Highlight>
                </Column>
                <Divider />
                <Button onPress={() => handleGoToAccountData("PERSONAL")}>
                    <Row>
                        <UserCircle size={26} color={styles.colors.heading }  />
                        <Highlight style={{ marginLeft: 8 }}>Dados pessoais</Highlight>
                    </Row>
                    <CaretRight size={24} color={styles.colors.heading } />
                </Button>
                <Divider />
                <Button onPress={() => handleGoToAccountData("ACCESS")}>
                    <Row>
                        <Keyhole size={26} color={styles.colors.heading } />
                        <Highlight style={{ marginLeft: 8 }}>Dados de acesso</Highlight>
                    </Row>
                    <CaretRight size={24} color={styles.colors.heading } />
                </Button>
                <Divider />
                {user && user.usuarioTipo != 'FARMACEUTICO' && (
                    <>
                        <Button onPress={handleGoToAdresses}>
                            <Row>
                                <MapPin size={26} color={styles.colors.heading } />
                                <Highlight style={{ marginLeft: 8 }}>Meus endereços</Highlight>
                            </Row>
                            <CaretRight size={24} color={styles.colors.heading } />
                        </Button>
                        <Divider />
                    </>
                )}
            </View>
            <LogOutButton onPress={handleLogOut}>
                <Highlight style={{ textTransform: 'uppercase', color: '#FFF' }}>Sair</Highlight>
                <SignOut color={styles.colors.contrast} size={26} />
            </LogOutButton>
        </Wrapper>
    );
}
