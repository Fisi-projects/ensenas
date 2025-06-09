import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="questionary" options={{ title: "Questionary" }} />
      <Stack.Screen name="module-lessons" />
    </Stack>
  );
}
