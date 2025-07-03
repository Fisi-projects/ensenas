import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DictionaryDetail() {
  const { word, description, imageUrl } = useLocalSearchParams();
  const [imageError, setImageError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const imageUrlString = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;

  console.log("Image URL:", imageUrl); // Verifica la URL en consola
  console.log("Word:", word); // Verifica la palabra en consola

  return (
    <View className="flex-1 bg-general  px-6 py-8">
      <View className="h-[120] pt-5 gap-[30]">
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/dictionary")}
          className="-ml-2"
        >
          <Ionicons name="close" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <View className="justify-top items-center grow">
        {imageUrl && !imageError ? (
          <View className="mb-4">
            <Image
              source={{ uri: imageUrlString }}
              className="w-[150] h-[150] rounded-lg mb-4"
              resizeMode="contain"
              onLoadStart={() => setLoadingImage(true)}
              onLoadEnd={() => setLoadingImage(false)}
              onError={() => {
                setImageError(true);
                setLoadingImage(false);
              }}
            />
            {loadingImage && (
              <View className="absolute inset-0 justify-center items-center">
                <ActivityIndicator size="small" color="#6C7CFA" />
              </View>
            )}
          </View>
        ) : null}

        {imageError && (
          <View className="w-32 h-32 bg-gray-200 rounded-lg mb-4 justify-center items-center">
            <Text className="text-gray-500">Imagen no disponible</Text>
          </View>
        )}

        <Text className="text-3xl dark:text-white font-bold my-4">
          {word || "Palabra no disponible"}
        </Text>
        <Text className="text-lg text-card ">
          {description || "Sin descripción disponible."}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)/dictionary")}
        className="bg-purple  w-full h-12 rounded-lg justify-center items-center mt-8"
      >
        <Text className="dark:text-white text-2xl font-semibold">Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
