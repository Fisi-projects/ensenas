import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  TextInput,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [isInProgress, setIsInProgress] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    // TODO: Replace with real authentication logic
    // On success:
    router.replace("/welcome");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start", marginTop: 10 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Inicio de sesión</Text>
      <Text style={{ fontSize: 20 }}>Bienvenido a Signa</Text>
      </View>
      <Image
        source={require("../assets/images/ensenas-logo.png")}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <View style={styles.field}>
        <Text>Correo electrónico</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu correo electrónico" />
      </View>
      <View style={styles.field}>
        <Text>Contraseña</Text>
        <TextInput secureTextEntry={true} style={styles.input} placeholder="Ingresa tu contraseña" />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "white" }}>Iniciar Sesion</Text>
      </TouchableOpacity>
        <Text>
        ¿No tienes cuenta?{" "}
        <Text
          style={{ color: main_color, textDecorationLine: "underline" }}
        >
          Registrate
        </Text>
      </Text>
    </View>
  );
}

const main_color = "#6b7df2"; // Main color for the app

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
