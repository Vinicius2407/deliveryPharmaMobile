import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const ImageContainer = styled.View`
    padding: 0px 16px;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
`;

export const ContainerQuantity = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BoxMinus = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const BoxPlus = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px;
`;