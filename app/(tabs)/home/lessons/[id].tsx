import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useColorScheme,
  ImageBackground,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ModuleLessonsScreen() {
  const router = useRouter();
  const { id, title, subtitle } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  const [lessonsData, setLessonsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const db = getFirestore();
        // Accede a la subcolección 'lessons' dentro del capítulo con id específico
        const lessonsRef = collection(db, "chapters", String(id), "lessons");
        const querySnapshot = await getDocs(lessonsRef);
        const fetchedLessons = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        console.log("Fetched lessons:", fetchedLessons);
        setLessonsData(fetchedLessons);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    if (id) fetchLessons();
  }, [id]);

  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("@/assets/images/background/bg-lessons.png")}
        className="h-[250] pt-10 px-[30] gap-[30]"
        resizeMode="cover"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={35} color="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-3xl font-bold text-white max-w-[240]">
            {title || "Lecciones"}
          </Text>
          <Text className="text-[15px] text-white mt-1 max-w-[240]">
            {subtitle || "Selecciona una lección"}
          </Text>
        </View>
      </ImageBackground>
      <ScrollView
        className="pt-10 pb-5 bg-third -mt-7 rounded-t-[30] dark:bg-[#1A1C20]"
        // contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, marginTop: -20 }}
      >
        {lessonsData.map((lesson, idx) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(tabs)/home/theory",
                params: {
                  chapterId: String(id),
                  lessonId: lesson.id,
                  title: lesson.title,
                  subtitle: lesson.subtitle,
                },
              });
            }}
            key={lesson.id || idx}
            className="px-4 py-1"
          >
            <View className="flex-row items-center justify-between py-4 px-5 bg-lessons rounded-md ">
              <View className="flex-row items-center gap-5">
                <View className="w-11 h-11 rounded-full bg-[#B0BBFF] dark:bg-gray-700 items-center justify-center">
                  <Text className="text-base text-white font-medium ">{idx + 1}</Text>
                </View>
                <View>
                  <Text className="text-lg font-semibold dark:text-white">{lesson.title}</Text>
                  <Text
                    className="text-[15px] max-w-[230px] truncate text-card-text"
                    numberOfLines={1}
                  >
                    {lesson.description}
                  </Text>
                </View>
              </View>
              <FontAwesome6 name="lock" size={20} color="#757575" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
