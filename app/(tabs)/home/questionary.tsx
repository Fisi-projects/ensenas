import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@/components/ui/Text";
import { TouchableOpacity } from "@/components/ui/TouchableOpacity";
import { Image } from "@/components/ui/Image";
import { FirestoreService } from "@/services/firestore";

export default function SignMeaningScreen() {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const service = FirestoreService.getInstance();
        const data = await service.fetchPreguntasByContenido(
          "module_1",
          "la_persona_sorda_interactivo",
        );
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          {/* <ArrowLeftIcon size={24} color="black" /> */}
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-2">
          ¿Qué significa la seña?
        </Text>
      </View>

      {/* Display Questions */}
      {questions.map((question, index) => (
        <View key={question.id} className="bg-gray-100 rounded-lg p-3 mb-4">
          <Text className="font-semibold mb-2">
            Pregunta {index + 1}: {question.pregunta}
          </Text>
          {question.opciones &&
            question.opciones.map((opcion: string, idx: number) => (
              <Text key={idx} className="text-gray-700">
                {idx + 1}. {opcion}
              </Text>
            ))}
        </View>
      ))}

      {/* Images */}
      <View className="flex-row justify-center mb-4">
        {/* <Image
          source={require('./assets/sign1.png')} // replace with actual image
          className="w-40 h-40 mr-2"
          contentFit="contain"
        />
        <Image
          source={require('./assets/sign2.png')} // replace with actual image
          className="w-40 h-40"
          contentFit="contain"
        />
      */}
      </View>

      {/* Audio Button */}
      <TouchableOpacity className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
        {/* <SpeakerWaveIcon size={24} color="black" /> */}
        <Text className="ml-2 font-medium text-gray-700">
          Presiona para escuchar
        </Text>
      </TouchableOpacity>

      {/* Explanation */}
      <Text className="mb-4 text-gray-800">
        La seña compuesta significa un saludo de Buenas Noches
      </Text>

      {/* Placeholder English text */}
      <Text className="text-gray-600 mb-6">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum
      </Text>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-pink-500 rounded-lg py-3 items-center"
      >
        <Text className="text-white font-semibold">Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
