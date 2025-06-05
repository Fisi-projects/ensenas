import { LayoutStyles } from "@/components/LayoutStyle";
import { Button, Switch, View } from "react-native";
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
import { useColorScheme } from "nativewind";
import { Theme } from '@/components/ScreenLayout';




export default function Settings() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
    const router = useRouter();
    const {colorScheme, toggleColorScheme} = useColorScheme();
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

    <View style={LayoutStyles.container} className="bg-primary">
      <Text style={LayoutStyles.Title__text} className="text-secondary">Settings</Text>
      <View>
        <Text className="text-secondary">Preferencias de la aplicacion</Text>
        <View>
          <Text className="text-secondary">Modo oscuro</Text>
          <Switch value={colorScheme == 'dark'} onChange={toggleColorScheme}/>
        </View>
      </View>
    </View>

  );
}
