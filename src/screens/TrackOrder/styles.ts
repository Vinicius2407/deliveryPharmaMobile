import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const RowGreen = styled.View`
  flex-direction: row;
  align-items: center;
  background: ${styles.colors.opaques.green};
  margin-top: 16px,; 
  padding: 16px;
  border-radius: 6px; 
  border: 2px solid ${styles.colors.green}; 
`;

export const RowGray = styled.View`
  flex-direction: row;
  align-items: center;
  background: #f1f3f5;
  margin-top: 16px,; 
  padding: 16px;
  border-radius: 6px; 
  border: 2px solid ${styles.colors.border}; 
`;

export const RowRed = styled.View`
  flex-direction: row;
  align-items: center;
  background: rgba(219, 64, 64, 0.5);
  margin-top: 16px,; 
  padding: 16px;
  border-radius: 6px; 
  border: 2px solid ${styles.colors.red}; 
`;