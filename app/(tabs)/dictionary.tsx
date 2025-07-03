import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

const baseUrl = "https://ensenas-nosql.onrender.com/modules/dictionary";

interface Theory {
  title: string;
  description: string;
  imageUrl: string;
}

interface Lesson {
  [theoryKey: string]: Theory; // t001, t002, etc.
}

interface Chapter {
  [lessonKey: string]: Lesson; // lesson001, lesson002, etc.
}

interface DictionaryData {
  [chapterKey: string]: Chapter; // chapter001, chapter002, etc.
}

export default function Dictionary() {
  const [lessonsData, setLessonsData] = useState<
    { chapterKey: string; lessonKey: string; theories: Theory[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl);
        const data: DictionaryData = await res.json();

        // Procesamos los datos para obtener un array plano de lecciones con sus teorías
        const processedData = Object.entries(data).flatMap(
          ([chapterKey, chapter]) =>
            Object.entries(chapter).map(([lessonKey, lesson]) => ({
              chapterKey,
              lessonKey,
              theories: Object.values(lesson),
            }))
        );
        setLessonsData(processedData);
      } catch (e) {
        console.error("Error fetching data:", e);
        setLessonsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6C7CFA" />
      </View>
    );
  }

  // Función para extraer el número de la lección (ej: "lesson001" → 1)
  const getLessonNumber = (lessonKey: string): number => {
    return parseInt(lessonKey.replace("lesson", ""), 10);
  };

  return (
    <ScrollView className="flex-1 bg-primary">
      <ImageBackground
        source={require("@/assets/images/background/bg_dictionary.png")}
        className="h-[250] px-6"
        resizeMode="cover"
      >
        <View className="my-auto">
          <Text className="text-3xl font-bold text-white">Diccionario</Text>
          <Text className="text-base text-white mt-1">
            Temas teóricos por lección
          </Text>
        </View>
      </ImageBackground>

      <View className="-mt-7 bg-general px-6 py-8 rounded-t-[30]">
        {lessonsData.map(({ chapterKey, lessonKey, theories }, idx) => (
          <View key={`${chapterKey}-${lessonKey}`} className="mb-6">
            <Text className="text-lg dark:text-white font-semibold mb-1">
              Lección {idx + 1}
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {theories.map((theory, tIdx) => (
                <TouchableOpacity
                  key={`${chapterKey}-${lessonKey}-${tIdx}`}
                  className="w-[48%] bg-lessons rounded-xl py-4 px-2 mb-3 items-center border-2 border-b-4 border-gray-300"
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/home/dictionary-details",
                      params: {
                        word: theory.title || "Sin título",
                        description: theory.description || "Sin descripción disponible.",
                        imageUrl: theory.imageUrl || "",
                      },
                    })
                  }
                >
                  <Text className="text-base text-gray-800 dark:text-white text-center my-auto">
                    {theory.title || "Sin título"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
