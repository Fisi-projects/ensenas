import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import '../global.css';

export default function RootLayout() {
  /* const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  }); */

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor={"#6d6d6d"} animated={true} hidden={false} />
    </>
  );
}
