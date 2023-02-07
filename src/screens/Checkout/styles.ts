import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const UndoOrder = styled.TouchableOpacity`
  padding: 8px;
`;

export const ImageContainer = styled.View`
    padding: 0px 8px;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
`;

export const RecipeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: ${styles.colors.red};
  border-radius: 10px;
  margin: 4px 0px;
`;

export const WarningContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: ${styles.colors.red};
  border-radius: 10px;
  margin: 4px;
`;

export const OpenRecipe = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: ${styles.colors.contrast};
  border: 1px solid ${styles.colors.muted};
  border-radius: 10px;
  margin: 4px;
`;

export const BoxBordered = styled.View`
    margin-top: 16px;
    background: #FFF;
    border: 1px solid ${styles.colors.border};
    border-radius: 6px;
    padding: 10px 16px;
`;
