import LoginScreenComponent from "@/components/login/LoginScreenComponent";
import { useLocalSearchParams } from "expo-router";

export default function LoginIndexScreen() {
  const { mode } = useLocalSearchParams<{ mode: string }>();
  const screenMode = mode === "register" ? "register" : "login";

  return <LoginScreenComponent mode={screenMode} />;
}
