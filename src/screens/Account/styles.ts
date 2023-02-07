import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const Title = styled.Text`
  font-family: ${styles.fonts.medium};
  font-size: ${styles.sizes.heading};
  color: ${styles.colors.heading};
`;

export const LogOutButton = styled.TouchableOpacity`
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${styles.colors.heading};
  border: 1px solid ${styles.colors.heading};
  border-radius: 6px;
`;

export const UserAvatar = styled.View`
  height: 80px;
  width: 80px;
  border-radius: 40px;

  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  padding: 8px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`; 