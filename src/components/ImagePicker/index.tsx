import { useState } from "react";
import { View, Text, Button } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { api, setHeadersAuthorization } from "../../services/api.service";

export function ImagePicker() {
  const [image, setImage] = useState("");

  async function handleSelectImage() {
    const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const selected = await ExpoImagePicker.launchImageLibraryAsync({
        quality: 1,
        allowsEditing: true,
      });

      if (!selected.cancelled) {
        setImage(selected.uri);
      }
    }
  }

  async function handleSendImage() {
    const formData = new FormData();

    formData.append("imagens_receitas", {
      uri: image,
      name: image.split("/").pop(),
      type: "image/jpeg",
    } as any);

    /**
     * Se for enviar mais de uma imagem, pode armazenar
     * um array de string e aí fazer um "for" aqui:
     *
     * for (image of images) {
     *  formData.append("imagens_receitas", {
     *    uri: image,
     *    name: image.split("/").pop(),
     *    type: "image/jpeg",
     *  } as any);
     * }
     */

    formData.append("status", "SOLICITADA");
    formData.append("cliente", "1");
    formData.append("endereco", "1");
    formData.append("itens[0].produto.id", "2");
    formData.append("itens[0].quantidade", "5");

    try {
      setHeadersAuthorization("matheus:123");
      const response = await api.post("/venda/add_with_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      alert("Venda com imagem criada com sucesso!");
    } catch (error) {
      alert("Erro ao enviar imagem!");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f1f3f5",
        padding: 16,
      }}
    >
      <Text
        style={{
          color: "#222222",
          fontSize: 18,
          fontWeight: "500",
        }}
      >
        Selecione uma imagem para enviar
      </Text>

      <View style={{ height: 1, backgroundColor: "#d6d6d6", marginVertical: 16 }} />

      <View>
        <Button title="Selecionar imagem" onPress={handleSelectImage} />
      </View>
      <View style={{ marginTop: 16 }}>
        <Button title="Enviar image" onPress={handleSendImage} />
      </View>
    </View>
  );
}
