import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    background-color:'rgba(0, 0, 0, 0.5)';
    padding: 32px;
`;

export const ModalBody = styled.View`
    /* flex: 1; */
    background-color: #FFF;
    border-radius: 8px;
    padding: 16px;
`;

export const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;

export const ModalContent = styled.View`
`;

export const ModalCloseButton = styled.TouchableOpacity`
    padding: 8px;
`;
