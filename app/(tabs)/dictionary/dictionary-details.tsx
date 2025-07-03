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

  // NO decodifiques la URL, solo asegúrate de que sea string
  const imageUrlString = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;

  const isValidImageUrl =
    typeof imageUrlString === "string" &&
    imageUrlString.startsWith("http") &&
    imageUrlString.length > 10;

  useEffect(() => {
    setImageError(false);
    setLoadingImage(true);
    console.log("Image URL:", imageUrlString);
  }, [imageUrlString]);

  return (
    <View className="flex-1 bg-general  px-6 py-8">
      <View className="h-[120] gap-[30]">
        <TouchableOpacity
          onPress={() => router.back()}
          className="-ml-2"
        >
          <Ionicons name="close" size={35} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="justify-top items-center grow">
        {isValidImageUrl && !imageError ? (
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

        {(!isValidImageUrl || imageError) && (
          <View className="w-32 h-32 bg-gray-200 rounded-lg mb-4 justify-center items-center">
            <Text className="text-gray-500">Imagen no disponible</Text>
          </View>
        )}

        <Text className="text-3xl dark:text-white font-bold my-4">
          {word || "Palabra no disponible"}
        </Text>
        <Text className="text-lg text-title ">
          {description || "Sin descripción disponible."}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-purple  w-full h-12 rounded-lg justify-center items-center mt-8"
      >
        <Text className="text-white text-2xl font-semibold">Volver</Text>
      </TouchableOpacity>
    </View>
  );
}