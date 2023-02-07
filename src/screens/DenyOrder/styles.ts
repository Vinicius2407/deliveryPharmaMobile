import styled from "styled-components/native";
import { styles } from "../../globals/styles.global";

export const InputDenyDescription = styled.TextInput`
    border: 1px solid ${styles.colors.border};
    padding: 16px;
    color: ${styles.colors.heading};
    border-radius: 6px;
    min-height: 200px;
`;