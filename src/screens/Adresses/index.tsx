import { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { useAuthentication } from "../../contexts/AuthenticationContext";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api.service";
import { ArrowSquareOut } from "phosphor-react-native";
import { List } from "../../components/List";
import { Wrapper } from "../../components/Wrapper";
import { GoBackButton } from "../../components/GoBackButton";
import { SimpleButton } from "../../components/SimpleButton";
import { AdressContainer, Button } from "./styles";
import { IAddress } from "../../utils/interfaces.backend";
import { Highlight, RowJustifyBetween, styles, Text } from "../../globals/styles.global";


interface RenderItemProps {
    item: IAddress;
}

export function Adresses() {
    const navigation = useNavigation()
    const { user } = useAuthentication()

    const [userAdresses, setUserAdresses] = useState<IAddress[]>([])

    function handleGoToNewAddress() {
        navigation.navigate("NewAddress" as never)
    }

    function handleGoToEditAddress(address: IAddress) {
        navigation.navigate("EditAddress" as never, { address } as never)
    }

    async function getUserAdresses() {
        try {
            const { data } = await api.get(`cliente/${user?.id}`)

            if (!!data.enderecos) setUserAdresses(data.enderecos)

        } catch (error: any) {
            console.log(error.message)
            Alert.alert('Endereços', 'Erro ao listar os seus endereços.')
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserAdresses()
        })

        return unsubscribe
    }, [navigation])

    return (
        <Wrapper>
            <RowJustifyBetween>
                <GoBackButton />
                <Highlight style={{ fontSize: 18, textTransform: "uppercase" }}>
                    meus endereços
                </Highlight>
                <GoBackButton disabled style={{ opacity: 0 }} />
            </RowJustifyBetween>
            <List
                data={userAdresses}
                numColumns={1}
                renderItem={({ item }: RenderItemProps) => (
                    <AdressContainer>
                        <View style={{ flex: 1, padding: 18 }}>
                            <Highlight style={{ fontSize: 18, marginBottom: 4 }}>
                                {item.descricao}
                            </Highlight>
                            <Text>
                                {`${item.logradouro}, ${item.numero} - ${item.bairro}`}
                            </Text>
                            <Text>
                                {`${item.cidade} - ${item.estado}`}
                            </Text>
                        </View>
                        <Button onPress={() => handleGoToEditAddress(item)}>
                            <ArrowSquareOut size={22} color={styles.colors.heading} />
                        </Button>
                    </AdressContainer>
                )}
                style={{ marginBottom: 16 }}
            />
            <SimpleButton 
                title="Cadastrar novo endereço"
                style={{ backgroundColor: styles.colors.contrast, borderColor: styles.colors.border, borderWidth: 1, marginBottom: 24 }}
                textStyles={{ color: styles.colors.heading }}
                onPress={handleGoToNewAddress}
            />
        </Wrapper>
    )
}
