import { LayoutStyles } from "@/components/LayoutStyle";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { useEffect } from "react";

export default function HomeScreen() {
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const q = query(collection(db, "test"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    };

    fetchData();
  }, []);

  return (
    <View style={LayoutStyles.container}>
      <Text style={LayoutStyles.Title__text}>Lecciones</Text>
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
