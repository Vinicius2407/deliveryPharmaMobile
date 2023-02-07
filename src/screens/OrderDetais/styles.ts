import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const Item = styled.View`
  flex: 1;
  background: ${styles.colors.contrast};
  /* border: 1px solid ${styles.colors.border}; */
  border-radius: 10px;
  padding: 15px;
`;

export const Box = styled.View`
    background: #FFF;
    /* elevation: 2; */
    border: 1px solid ${styles.colors.border};
    border-radius: 6px;
    padding: 10px 16px;
`;

export const ImageBox = styled.View`
    /* background: rgba(26, 105, 189, 0.5); */
    border: 1px solid ${styles.colors.border};
    border-radius: 6px;
    padding: 10px 16px;
`;

export const Title = styled.Text`
    font-family: ${styles.fonts.medium};
    font-size: ${styles.sizes.heading};
    color: ${styles.colors.body};
`;

export const Price = styled.Text`
  font-family: ${styles.fonts.medium};
  font-size: ${styles.sizes.body};
  color: ${styles.colors.red};
`;