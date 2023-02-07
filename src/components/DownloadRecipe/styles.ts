import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

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