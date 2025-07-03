import { Stack } from "expo-router";
import "../global.css";
import { Theme } from "@/components/ScreenLayout";
import { StatusBar } from "react-native";
import { useColorScheme } from "nativewind";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <StatusBar
        barStyle={
          colorScheme.colorScheme === "dark" ? "light-content" : "dark-content"
        }
        backgroundColor={
          colorScheme.colorScheme === "dark" ? "#18181b" : "#fff"
        }
        translucent={false}
      />
      <Theme>
        <Stack screenOptions={{ headerShown: false }} />
      </Theme>
    </>
  );
}
