import { View, Text, Button, StyleSheet, TouchableOpacity, Touchable, TextInput } from "react-native";
import { useRouter } from "expo-router";


export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    // TODO: Replace with real authentication logic
    // On success:
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'flex-start'}}>
        <Text>Inicio de sesion</Text>
      </View>
      <Text style={{alignSelf: 'flex-start'}}>Bienvenido a signa </Text>
      <Text style={{color:main_color, fontWeight:'bold', fontSize:18}}>Ingresa tu direccion email</Text>
      <View style={styles.field}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
        />
      </View>


      <View style={styles.field}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
        />
      </View>
      
      <TouchableOpacity  style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "white" }}>Iniciar Sesion</Text>
      </TouchableOpacity>
    </View>
  );
}

const main_color = "#6b7df2"; // Main color for the app

const styles = StyleSheet.create({
  
  container:{
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
  }
})