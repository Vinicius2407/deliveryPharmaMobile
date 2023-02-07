import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const BoxContainer = styled.View`
    margin-top: 24px;
    border: 1px solid ${styles.colors.border};
    border-radius: 6px;
    background-color: ${styles.colors.contrast};
`;

export const BoxTitle = styled.Text`
    font-size: 16px;
    text-align: center;
    font-family: ${styles.fonts.bold};
    color: ${styles.colors.blue};
    padding: 6px;
`;

export const BoxSpan = styled.Text`
    font-size: 14px;
    font-family: ${styles.fonts.medium};
    color: ${styles.colors.blue};
`;

export const BoxContainerUserInfo = styled.Text`
    font-size: 14px;
    font-family: ${styles.fonts.medium};
    color: ${styles.colors.heading};
`;


export const BoxButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 6px;
`;

export const BoxButtonText = styled.Text`
    font-size: 16px;
    font-family: ${styles.fonts.bold};
    color: ${styles.colors.blue};
    margin-right: 10px;
`
