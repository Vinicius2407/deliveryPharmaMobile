import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const Container = styled.View``;

export const Label = styled.Text`
  font-family: ${styles.fonts.medium};
  font-size: ${styles.sizes.body};
  color: ${styles.colors.heading};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${styles.colors.contrast};
  border-bottom-color: ${styles.colors.border};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  height: 46px;
  padding: 2px;
`;

export const IconContainer = styled.TouchableOpacity`
  justify-content: center;
  height: 100%;
  width: 35px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${styles.fonts.regular};
  font-size: ${styles.sizes.body};
  color: ${styles.colors.heading};
`;
