import { Stack, useFocusEffect } from "expo-router";
import '../global.css';
import { Theme } from "@/components/ScreenLayout";
  

export default function RootLayout() {
  return (
    <>
      <Theme>
        <Stack screenOptions={{headerShown: false}} />
      </Theme>
    </>

  );
}
