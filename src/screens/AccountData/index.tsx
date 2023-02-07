import { useAuthentication } from "../../contexts/AuthenticationContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GoBackButton } from "../../components/GoBackButton";
import { Wrapper } from "../../components/Wrapper";
import { Column, Divider, Row, styles } from "../../globals/styles.global";
import { Container, Title, Button, ButtonText, Label, UserInfo } from "./styles";
import { ArrowSquareOut } from "phosphor-react-native";

interface RouteParams {
    typeData: 'ACCESS' | 'PERSONAL'
}

export function AccountData() {
    const { user } = useAuthentication()
    
    const route = useRoute()
    const { typeData } = route.params as RouteParams

    const { navigate } = useNavigation()

    const handleEditUserData = () => navigate('EditUserData' as  never)
    const handleEditUserAccessData = () => navigate('EditUserAccessData' as  never)

    return (
        <Wrapper>
            <Row>
                <GoBackButton />
            </Row>

            {typeData === 'PERSONAL' ? (
                <Container>
                    <Title>
                        Informações pessoais
                    </Title>
                    <Divider />
                    <Row style={{ paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Column>
                            <Label>Nome</Label>
                            <UserInfo>{ user && user.nome }</UserInfo>
                        </Column>
                    </Row>
                    <Divider />
                    <Row style={{ paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Column>
                            {user && user.usuarioTipo == 'CLIENTE' ? (
                                <>
                                    <Label>C.P.F</Label>
                                    <UserInfo>{ user && user.cpf }</UserInfo>
                                </>
                            ):(
                                <>
                                    <Label>C.R.F</Label>
                                    <UserInfo>{ user && user.crf }</UserInfo>
                                </>
                            )}
                            
                        </Column>
                    </Row>
                    <Divider />
                    <Row style={{ paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Column>
                            <Label>Telefone</Label>
                            <UserInfo>{ user && user.celular }</UserInfo>
                        </Column>
                    </Row>
                    <Divider />
                    <Button onPress={handleEditUserData}>
                        <ButtonText>
                            Atualizar informações pessoais
                        </ButtonText>
                        <ArrowSquareOut color={styles.colors.blue} size={18} />
                    </Button>
                </Container>
            ):(
                <Container>
                    <Title>
                        Dados de acesso
                    </Title>
                    <Divider />
                    <Row style={{ paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Column>
                            <Label>Login</Label>
                            <UserInfo>{ user && user.username }</UserInfo>
                        </Column>
                    </Row>
                    <Divider />
                    <Row style={{ paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Column>
                            <Label>Senha</Label>
                            <UserInfo>******</UserInfo>
                        </Column>
                    </Row>
                    <Divider />
                    <Button onPress={handleEditUserAccessData}>
                        <ButtonText>
                            Atualizar dados de acesso
                        </ButtonText>
                        <ArrowSquareOut color={styles.colors.blue} size={18} />
                    </Button>
                </Container>
            )}
        </Wrapper>
    )
}