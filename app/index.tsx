import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import "../i18n/i18n"

export default function Index() {
  const router = useRouter();
  const [user, setUser] = useState<null | object | undefined>(undefined); // undefined means loading

  useEffect(() => {
    const checkAuth = async () => {
      // Simulate async auth logic
      const fetchedUser = null;
      setUser(fetchedUser);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (user === undefined) return;

    if (user) {
      router.replace("/(tabs)");
    } else {
      router.replace("/login");
    }
  }, [user]);

  return (
    <>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Checking authentication...</Text>
    </View>
    </>
  );
}
