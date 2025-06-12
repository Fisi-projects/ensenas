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
import { FirestoreService } from "@/services/firestore"; // ajusta el path si es necesario

interface TheoryContent {
  id: string;
  title: string;
  description: string;
  resources?: {
    imageUrl?: string;
  };
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
        const service = FirestoreService.getInstance();
        const teoricPath = `chapters/${chapterId}/lessons/${lessonId}/teorical`;
        const snapshot = await service.fetchNestedCollection(teoricPath);
        setContents(snapshot);
        console.log("chapterId:", chapterId, "lessonId:", lessonId);
        console.log("snapshot: ", snapshot);
      } catch (error) {
        console.error("Error loading theory content:", error);
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
      router.push("/(tabs)/home/question"); // ajusta la ruta si es distinta
    }
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, pageBg]}>
      <View style={{ padding: 24, paddingTop: 48, backgroundColor: "#6C7CFA" }}>
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
            {contents[currentIndex].resources?.imageUrl && (
              <Image
                source={{ uri: contents[currentIndex].resources.imageUrl }}
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
              backgroundColor: "#6C7CFA",
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
