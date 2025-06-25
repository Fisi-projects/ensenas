import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import "../i18n/i18n";
import Constants from "expo-constants";
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import WelcomeScreen from "./welcome-screen"; 
import Smartlook, { Properties } from 'react-native-smartlook-analytics';

Smartlook.instance.preferences.setProjectKey(
  '015731bf9433071f40eeaa0e99d8239c06deb795'
);
Smartlook.instance.start();

GoogleSignin.configure({
  webClientId: Constants.expoConfig?.extra?.webClientId,
});

export default function Index() {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2750);
    return () => clearTimeout(timer);
  }, []);


  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!initializing && !showWelcome) {
      router.replace(user ? "/(tabs)/home" : "/auth");
    }
  }, [user, initializing, router, showWelcome]);

  if (showWelcome) {
    return <WelcomeScreen />;
  }


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Checking authentication...</Text>
    </View>
  );
}
