import { SplashScreen, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts as usePlayfairFonts,
  PlayfairDisplay_500Medium_Italic,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";

import {
  useFonts as useManropeFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";

import { useCallback, useEffect, useState } from "react";

export default function RootLayout() {

  const [playfairLoaded] = usePlayfairFonts({
    PlayfairDisplay_500Medium_Italic,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });
  const [manropeLoaded] = useManropeFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const [appReady, setAppReady] = useState(false);

  const fontsReady = playfairLoaded && manropeLoaded;

  useEffect(() => {
    if (fontsReady) {
      setAppReady(true);
    }
  }, [fontsReady]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return <SafeAreaProvider>
    <View className="flex-1 bg-cream">
      <Stack screenOptions={{ headerShown: false, animation: "ios_from_right" }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  </SafeAreaProvider>
}
