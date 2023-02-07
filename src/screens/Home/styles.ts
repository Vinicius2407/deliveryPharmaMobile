import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;

export const Username = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.regular};
  font-size: ${styles.sizes.heading};
  color: ${styles.colors.heading};
`;

export const Subtitle = styled.Text`
  font-family: ${styles.fonts.regular};
  font-size: ${styles.sizes.highlight};
  color: ${styles.colors.body};
`;

export const ProfileButton = styled.TouchableOpacity`
  /* background: ${styles.colors.border}; */
  height: 60px;
  width: 60px;
  border-radius: 25px;
  overflow: hidden;

  align-items: center;
  justify-content: center;
`;
