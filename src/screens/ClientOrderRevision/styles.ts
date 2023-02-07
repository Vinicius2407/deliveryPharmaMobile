import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const Box = styled.View`
    background: ${styles.colors.contrast};
    border-radius: 6px;
    border: 1px solid ${styles.colors.blue};
`;

export const BoxBordered = styled.View`
    margin-top: 16px;
    background: #FFF;
    border: 1px solid ${styles.colors.border};
    border-radius: 6px;
    padding: 10px 16px;
`;

export const ImageContainer = styled.View`
    padding: 0px 8px;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
`;

export const ShowRecipe = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: ${styles.colors.contrast};
  border: 1px solid ${styles.colors.muted};
  border-radius: 10px;
  margin: 4px;
`;

export const ImageBox = styled.View`
    /* background: rgba(26, 105, 189, 0.5); */
    border: 1px solid ${styles.colors.border};
    border-radius: 6px;
    padding: 10px 16px;
`;

export const Price = styled.Text`
  font-family: ${styles.fonts.medium};
  font-size: ${styles.sizes.body};
  color: ${styles.colors.red};
`;