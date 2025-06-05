import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Theme } from "@/components/ScreenLayout";
import { useColorScheme } from "nativewind";

interface LoginScreenProps {
  mode?: "login" | "register";
}

export default function LoginScreenComponent({
  mode = "login",
}: LoginScreenProps) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const [isInProgress, setIsInProgress] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterNavigation = () => {
    router.push("/auth/register");
  };

  const handleLogin = async () => {
    if (!email || !password || (mode === "register" && !confirmPassword)) {
      console.log("Por favor completa todos los campos.");
      return;
    }

    if (mode === "register" && password !== confirmPassword) {
      console.log("Las contraseñas no coinciden.");
      return;
    }

    setIsInProgress(true);
    const auth = getAuth();

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado con éxito.");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado con éxito.");
      }
      router.replace("/welcome");
    } catch (error) {
      console.error(error);
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <View style={styles.container} className="bg-primary">
      <View style={{ alignSelf: "flex-start", marginTop: 10 }}>
        <Text
          style={{ fontSize: 28, fontWeight: "bold" }}
          className="text-secondary"
        >
          {mode === "login" ? "Inicio de sesión" : "Creación de cuenta"}
        </Text>
        <Text style={{ fontSize: 20 }} className="text-fourth">
          Bienvenido a Signa
        </Text>
      </View>
      <Image
        source={require("../../assets/images/ensenas-logo.png")}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <View style={styles.field}>
        <Text className="text-secondary">Correo electrónico</Text>
        <TextInput
          placeholderTextColor={colorScheme === "dark" ? "#898989" : "#425466"}
          style={styles.input}
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.field}>
        <Text className="text-secondary">Contraseña</Text>
        <TextInput
          placeholderTextColor={colorScheme === "dark" ? "#898989" : "#425466"}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {mode === "register" && (
        <View style={styles.field}>
          <Text className="text-secondary">Confirmar Contraseña</Text>
          <TextInput
            placeholderTextColor={
              colorScheme === "dark" ? "#898989" : "#425466"
            }
            secureTextEntry={true}
            style={styles.input}
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, isInProgress && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={isInProgress}
      >
        <Text style={{ color: "white" }}>
          {isInProgress ? "Cargando..." : "Iniciar Sesión"}
        </Text>
      </TouchableOpacity>

      {mode === "login" && (
        <>
          <Text className="text-secondary">¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={handleRegisterNavigation}>
            <Text
              style={{ color: main_color, textDecorationLine: "underline" }}
            >
              Regístrate
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const main_color = "#6b7df2"; // Main color for the app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  button: {
    backgroundColor: main_color,
    padding: 18,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 8,
  },

  field: {
    width: "100%",
    gap: 10,
  },
});
