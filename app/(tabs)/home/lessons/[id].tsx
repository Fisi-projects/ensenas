import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { collection, query, where, getDocs, getFirestore } from '@react-native-firebase/firestore';

export default function ModuleLessonsScreen() {

  const router = useRouter();
  const { id , title, subtitle} = useLocalSearchParams();
  const colorScheme = useColorScheme();
  
const [lessonsData, setLessonsData] = useState<any[]>([]);

useEffect(() => {
  const fetchLessons = async () => {
    try {
      const db = getFirestore();
      // Accede a la subcolección 'lessons' dentro del capítulo con id específico
      const lessonsRef = collection(db, 'chapters', String(id), 'lessons');
      const querySnapshot = await getDocs(lessonsRef);
      const fetchedLessons = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });
      console.log('Fetched lessons:', fetchedLessons);
      setLessonsData(fetchedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };
  if (id) fetchLessons();
}, [id]);

  const isDark = colorScheme === "dark";
  const headerBg = { backgroundColor: "#6C7CFA" };
  const pageBg = { backgroundColor: isDark ? "#181A20" : "#F5F6FA" };
  const cardBg = { backgroundColor: isDark ? "#23242A" : "#fff" };
  const cardShadow = isDark
    ? { shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 8, elevation: 2 }
    : {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      };
  const mainText = { color: isDark ? "#fff" : "#222" };
  const secondaryText = { color: isDark ? "#bbb" : "#888" };
  const playBtnBg = { backgroundColor: "#E6EFFA" };
  const playIcon = { color: "gray" };
  const iconBg = { backgroundColor: isDark ? "#444" : "#F0F0F0" };

  return (
    <SafeAreaView style={[{ flex: 1 }, pageBg]}>
      <View style={[headerBg, { padding: 24, paddingTop: 48 }]}>
        <TouchableOpacity
          style={{ position: "absolute", left: 24, top: 20, zIndex: 2 }}
          onPress={() => router.back()}
        >
          <Text style={{ fontSize: 28, color: "#fff" }}>{"←"}</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 30,
            textAlign: "center",
          }}
        >
          {title || "Lecciones"}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginTop: 8,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {subtitle || "Selecciona una lección"}
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1, marginTop: 16 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        {lessonsData.map((lesson, idx) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(tabs)/home/lessons/questions/[id]",
                params: {
                  id: lesson.id,
                  title: lesson.title,
                  subtitle: lesson.description,
                },
              });
            }}
            key={lesson.id || idx}
            style={[
              cardBg,
              cardShadow,
              {
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          marginBottom: 16,
              },
            ]}
          >
            <View
              style={[
          {
            width: 40,
            height: 40,
            borderRadius: 8,
            marginRight: 16,
            justifyContent: "center",
            alignItems: "center",
          },
          iconBg,
              ]}
            />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={[{ fontWeight: "bold", fontSize: 16 }, mainText]}>
          {lesson.title}
              </Text>
              <Text style={[{ fontSize: 13 }, secondaryText]}>
          {lesson.description}
              </Text>
            </View>
            <View
              style={{
          justifyContent: "center",
          alignItems: "center",
          height: 40,
              }}
            >
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
