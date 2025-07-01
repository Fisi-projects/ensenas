import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Smartlook from "react-native-smartlook-analytics";
/* interface TheoryContent {
  id: string;
  title: string;
  description: string;
  resources?: {
    imageUrl?: string;
  };
} */

const baseUrl = "https://ensenas-nosql.onrender.com/modules/";

interface TheoryContent {
  title: string;
  description: string;
  imageUrl?: string;
}

export default function TheoryScreen() {
  Smartlook.instance.analytics.trackEvent("theory_screen_viewed");
  useEffect(() => {
    Smartlook.instance.analytics.trackNavigationEnter("Teoria");
    return () => {
      Smartlook.instance.analytics.trackNavigationExit("Teoria");
    };
  }, []);
  const router = useRouter();
  const { chapterId, lessonId, title, subtitle } = useLocalSearchParams<{
    chapterId: string;
    lessonId: string;
    title?: string;
    subtitle?: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<TheoryContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const pageBg = { backgroundColor: isDark ? "#181A20" : "#F5F6FA" };
  const cardBg = { backgroundColor: isDark ? "#23242A" : "#fff" };
  const mainText = { color: isDark ? "#fff" : "#222" };
  const secondaryText = { color: isDark ? "#bbb" : "#555" };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}${chapterId}/lessons/${lessonId}/theoric`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        // Transforma el objeto en array
        const arr = data ? (Object.values(data) as TheoryContent[]) : [];
        setContents(arr);
        console.log(arr);
      } catch (error) {
        console.error("Error loading theory content:", error);
        setContents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chapterId, lessonId]);

  const handleNext = () => {
    if (currentIndex < contents.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("chapterId: ", chapterId);
      console.log("lessonId: ", lessonId);
      router.push({
        pathname: "/(tabs)/home/question",
        params: { chapterId, lessonId },
      });
    }
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, pageBg]}>
      {/* #6C7CFA */}

      <View className="h-[220] pt-10 px-[30] gap-[30] bg-[#6B7DF2]">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2">
          <Ionicons name="close" size={35} color="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-3xl font-bold text-white max-w-[240]">
            {title || "Lecciones"}
          </Text>
        </View>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#6C7CFA" />
        </View>
      ) : contents.length > 0 ? (
        <ScrollView
          className="pt-10 pb-5 px-8 bg-third -mt-7 rounded-t-[30] dark:bg-[#1A1C20]"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 justify-between">
            <View className="">
              <Text className="text-xl dark:text-card font-bold mb-4">
                {contents[currentIndex].title}
              </Text>
              {contents[currentIndex].imageUrl && (
                <Image
                  source={{ uri: contents[currentIndex].imageUrl }}
                  className="h-[200] mb-4 w-full"
                  resizeMode="contain"
                />
              )}
              <Text style={[{ fontSize: 15, lineHeight: 22 }, secondaryText]}>
                {contents[currentIndex].description}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor:
                  currentIndex < contents.length - 1 ? "#6C7CFA" : "#EF476F",
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                {currentIndex < contents.length - 1
                  ? "Siguiente" //arreglar espacio
                  : "Inicia preguntas"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={mainText}>No se encontró contenido teórico.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
