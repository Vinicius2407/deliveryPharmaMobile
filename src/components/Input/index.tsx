import { useState } from "react";
import { Alert, TextInputProps } from "react-native";
import * as Icon from "phosphor-react-native";

import {
  Container,
  IconContainer,
  InputContainer,
  Label,
  TextInput,
} from "./styles";
import { styles } from "../../globals/styles.global";

interface InputProps extends TextInputProps {
  inputRef?: any;
  label?: string;
  icon?: keyof typeof Icon;
  minLength?: number;
  type?: "text" | "password";
}

export function Input({
  inputRef,
  label,
  icon,
  minLength,
  type = "text",
  ...props
}: InputProps) {
  const CustomIcon = icon ? (Icon[icon] as any) : null;
  const isPassword = type === "password";

  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  function handleToggleSecureTextEntry() {
    setSecureTextEntry(!secureTextEntry);
  }

  const handleInputMinLength = () => Alert.alert('Caracteres', `Este campo requer no mínimo ${minLength} caracteres`)

  return (
    <Container>
      {label && <Label>{label}</Label>}

      <InputContainer>
        {icon && (
          <IconContainer disabled style={{ marginRight: 6 }}>
            <CustomIcon color={styles.colors.heading} size={25} />
          </IconContainer>
        )}

        <TextInput
          {...props}
          ref={inputRef}
          selectionState={undefined}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />

        {isPassword && (
          <IconContainer
            style={{ alignItems: "flex-end", marginRight: !!minLength ? 8 : 0 }}
            activeOpacity={0.6}
            onPress={handleToggleSecureTextEntry}
          >
            {secureTextEntry ? (
              <Icon.EyeSlash color={styles.colors.heading} size={25} />
            ) : (
              <Icon.Eye color={styles.colors.heading} size={25} />
            )}
          </IconContainer>
        )}

        {!!minLength && minLength != 0 && (
          <IconContainer onPress={handleInputMinLength}>
            <Icon.Info color={styles.colors.heading} size={25} />
          </IconContainer>
        )}
      </InputContainer>
    </Container>
  );
}
