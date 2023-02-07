import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "./src/hooks/fonts.hook";

import { AuthenticationProvider } from "./src/contexts/AuthenticationContext";
import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";
// import { ImagePicker } from "./src/components/ImagePicker";

export default function App() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  // return <ImagePicker />;

  useEffect(() => {
    async function loadFonts() {
      await useFonts();
      setIsFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!isFontsLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AuthenticationProvider>
        <StatusBar style="dark" backgroundColor="#FFF" translucent={false} />
        <Routes />
      </AuthenticationProvider>
    </NavigationContainer>
  );
}
