import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

const Container = styled.View`
    /* flex: 1; */
    /* max-height: fit-content; */
    margin-top: 24px;
    border: 2px solid ${styles.colors.border};
    border-radius: 6px;
    background-color: ${styles.colors.contrast};
`;

const Title = styled.Text`
    font-size: 16px;
    text-align: center;
    font-family: ${styles.fonts.bold};
    padding: 6px;
`;

const Label = styled.Text`
    font-size: 14px;
    font-family: ${styles.fonts.medium};
    color: ${styles.colors.muted};
`;

const UserInfo = styled.Text`
    font-size: 14px;
    font-family: ${styles.fonts.medium};
    color: ${styles.colors.heading};
`;

const Button = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 6px;
`;

const ButtonText = styled.Text`
    font-size: 16px;
    font-family: ${styles.fonts.bold};
    color: ${styles.colors.blue};
    margin-right: 10px;
`;

export { Container, Title, Label, UserInfo, Button, ButtonText }
