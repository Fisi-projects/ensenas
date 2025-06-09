import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "@react-native-firebase/auth";
import React from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { TouchableOpacity } from "../ui/TouchableOpacity";
import { Image } from "../ui/Image";
import { Text } from "../ui/Text";
import { useRouter } from "expo-router";

export default function GoogleSignInButton() {
  const router = useRouter();

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;
      console.log("Google sign-in token:", idToken);

      if (!idToken) throw new Error("No ID token found");

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const auth = getAuth();

      await signInWithCredential(auth, googleCredential);
      console.log("Google sign-in success, current user:", auth.currentUser);
      router.replace("/welcome");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        onGoogleButtonPress().then(() => console.log("Signed in with Google!"))
      }
      className="flex-row items-center justify-center bg-white border border-gray-300 rounded-2xl w-full h-16 px-4 py-2 shadow-md"
      activeOpacity={0.8}
    >
      <Image
        source={require("../../assets/images/google-logo.png")}
        className="w-10 h-10 mr-2"
        contentFit="fill"
      />
      <Text className="text-gray-600 font-semibold">Sign in with Google</Text>
    </TouchableOpacity>
  );
}
