import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const checkAuth = async () => {
      // TODO: Replace with real auth logic
      const user = ""; // Simulate no user logged in
      if (user) {
        router.replace("/(tabs)");
      }else {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Checking authentication...</Text>
    </View>
  );
}
