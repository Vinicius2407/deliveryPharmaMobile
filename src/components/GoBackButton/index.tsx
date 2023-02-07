import { TouchableOpacityProps } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CaretLeft } from "phosphor-react-native";
import { BackButton } from "./styles";
import { styles } from "../../globals/styles.global";


interface GoBackButtonProps extends TouchableOpacityProps {}

export function GoBackButton(props: GoBackButtonProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <BackButton onPress={handleGoBack} activeOpacity={0.7} { ...props } >
      <CaretLeft color={styles.colors.heading} size={26} weight='bold' />
    </BackButton>
  );
}
