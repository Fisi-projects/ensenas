import { LayoutStyles } from "@/components/LayoutStyle";
import { Button, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { Image } from "expo-image";
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { getStorage } from "@react-native-firebase/storage";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
    const router = useRouter();

    // temporary function to handle navigation to the welcome screen
    const handleWelcome = async () => {
      router.replace("/welcome");
    };
  useEffect(() => {
    const fetchData = async () => {
      // Firestore get document query
      const db = getFirestore();
      const q = query(collection(db, "test"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

      // Storage get resource query
      const storage = getStorage();
      const ref = storage.ref("/libro-minedu/portada-libro-minedu.png");
      const url = await ref.getDownloadURL();
      console.log(url);
      setImageUrl(url);
    };
    fetchData();
  }, []);

  return (
    <View style={LayoutStyles.container}>
      <Text style={LayoutStyles.Title__text}>Lecciones</Text>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          contentFit="cover"
          style={{ width: 200, height: 200 }}
        />
      )}
      {/* temporary button to access welcome screen */}
      <Button title="Welcome" onPress={handleWelcome}/>
    </View>
  );
}

const styles = StyleSheet.create({
  HomeScreen__Container: {
    flex: 1,
    backgroundColor: "#3d3d3d",
    width: "100%",
    height: "100%",
    padding: 20,
  },
});
