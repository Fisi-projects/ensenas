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

/* interface TheoryContent {
  id: string;
  title: string;
  description: string;
  resources?: {
    imageUrl?: string;
  };
} */

const baseUrl = "https://ensenas-nosql.onrender.com/modules/";

interface TheoryContent{
  title:string;
  description: string;
  imageUrl?: string;
}

export default function TheoryScreen() {
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
      const arr = data
      ? (Object.values(data) as TheoryContent[])
    : [];
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
      console.log('chapterId: ', chapterId);
      console.log('lessonId: ', lessonId);
      router.push({
        pathname: "/(tabs)/home/question",
        params: { chapterId, lessonId},
      });
    }
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, pageBg]}>
    {/* #6C7CFA */}

      <View className="bg-[#6C7CFA] px-6 pt-8 pb-4 flex-row items-center justify-center relative">
        <TouchableOpacity
          style={{ position: "absolute", left: 24, top: 20, zIndex: 2 }}
          onPress={() => router.back()}
        >
          <Text style={{ fontSize: 28, color: "#fff" }}>{"←"}</Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold", textAlign: "center", marginTop: 30 }}>
          {title || "Contenido Teórico"}
        </Text>
        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center", marginTop: 8 }}>
          {subtitle || ""}
        </Text>
      </View>



      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#6C7CFA" />
        </View>
      ) : contents.length > 0 ? (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <View
            style={[
              cardBg,
              {
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOpacity: isDark ? 0.3 : 0.06,
                shadowRadius: 8,
                elevation: 2,
              },
            ]}
          >

            <Text style={[{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }, mainText]}>
              {contents[currentIndex].title}
            </Text>
            {contents[currentIndex].imageUrl && (
              <Image
                source={{ uri: contents[currentIndex].imageUrl }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                  marginBottom: 12,
                  backgroundColor: "#ccc",
                }}
                resizeMode="cover"
              />
            )}
            <Text style={[{ fontSize: 15, lineHeight: 22 }, secondaryText]}>
              {contents[currentIndex].description}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: currentIndex < contents.length - 1 ? "#6C7CFA" : "#EF476F",
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              {currentIndex < contents.length - 1 ? "Siguiente" : "Inicia preguntas"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={mainText}>No se encontró contenido teórico.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
