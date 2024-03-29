import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
  background: ${styles.colors.contrast};
  border: 1px solid ${styles.colors.border};
  border-radius: 20px;
`;

export const SearchButton = styled.TouchableOpacity`
  padding: 8px;
  background: ${styles.colors.contrast};
  border: 1px solid ${styles.colors.border};
  border-radius: 21px;
  margin-left: 16px;
`;

export const InputContainer = styled.View`
  flex: 1;
  margin-left: 15px;
`;

export const Item = styled.TouchableOpacity`
  flex: 1;
  background: ${styles.colors.contrast};
  border: 1px solid ${styles.colors.border};
  border-radius: 10px;
  padding: 15px;
`;

export const ImageContainer = styled.View`
  height: 46px;
  width: 60px;
  border-color: ${styles.colors.border};
  border-radius: 6px;

  overflow: hidden;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const Image = styled.Image`
  height: 100%;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.medium};
  font-size: ${styles.sizes.normal};
  height: 32px;
`;

export const Price = styled.Text`
  font-family: ${styles.fonts.bold};
  font-size: ${styles.sizes.body};
  color: ${styles.colors.blue};

  align-self: flex-end;
`;