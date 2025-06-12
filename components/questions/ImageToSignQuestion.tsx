import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "@/components/ui/ScrollView";
import { TouchableOpacity } from "@/components/ui/TouchableOpacity";
import { Image } from "@/components/ui/Image";
import { View } from "@/components/ui/View";

import { FirestoreService } from "@/services/firestore";
import { useRouter } from "expo-router";

interface ImageToSignViewProps {
  selectedAnswers: { [key: number]: number };
  setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  showExplanation: boolean;
}

export default function ImageToSignView({
  selectedAnswers,
  setSelectedAnswers,
  showExplanation,
}: ImageToSignViewProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const service = FirestoreService.getInstance();
        const data = await service.fetchPreguntasByContenido(
          "module_1",
          "la_persona_sorda_interactivo",
        );
        console.log("data: ", data);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    console.log(questions);
  }, []);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg">Cargando preguntas...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-4">
        <Text className="text-lg text-center mb-4">
          No se encontraron preguntas
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-pink-500 rounded-lg py-3 px-6"
        >
          <Text className="text-white font-semibold">Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-4">
        {currentQuestion && (
          <>
            {/* Media Content (Images/Videos) */}
            {true ? (
              <View className="bg-gray-50 rounded-2xl p-4 mb-6 items-center">
                <Image
                  source={{
                    uri: "https://japonesenlanube.com/wp-content/uploads/2016/05/hola-en-japones-chico.png",
                  }}
                  style={{
                    width: 160,
                    height: 160,
                    marginBottom: 16,
                    backgroundColor: "#ccc",
                  }}
                  contentFit="contain"
                  onError={(e) => console.log("Image load error", e.error)}
                />
                {/* Character illustration */}
                <View className="items-center">
                  <View className="bg-white rounded-full p-2 mb-2">
                    <Text className="text-2xl">👋</Text>
                  </View>
                  <View className="bg-gray-200 rounded-2xl px-4 py-2">
                    <Text className="text-gray-700">¡Hola!</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View className="h-64 bg-gray-200">
                <Text>Imagen fetcheada desde firebase</Text>
              </View>
            )}

            {/* Audio Instructions */}
            <View className="bg-gray-50 rounded-2xl p-4 mb-6">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">🔊</Text>
                <Text className="text-gray-700 flex-1">
                  Elije una de las señas a continuación correspondiente a la
                  acción.
                </Text>
              </View>
            </View>

            {/* Answer Options */}
            {currentQuestion.opciones && (
              <View className="mb-6">
                <View className="flex-row flex-wrap justify-between">
                  {currentQuestion.opciones.map(
                    (_opcion: string, idx: number) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() =>
                          handleAnswerSelect(currentQuestionIndex, idx)
                        }
                        className={`w-[48%] mb-4 p-4 rounded-2xl border-2 ${
                          selectedAnswers[currentQuestionIndex] === idx
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        {/* Placeholder for sign images */}
                        <View className="bg-gray-100 h-32 rounded-xl mb-3 justify-center items-center">
                          <Text className="text-4xl">👤</Text>
                        </View>
                        <Text className="text-center text-sm text-gray-700">
                          Opción {idx + 1}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              </View>
            )}

            {/* Explanation (shown after answer is selected) */}
            {isAnswerSelected && showExplanation && (
              <View className="bg-green-50 border border-green-200 rounded-2xl p-4 absolute mb-32">
                <Text className="text-green-800 font-medium mb-2">
                  Explicación:
                </Text>
                <Text className="text-green-700">
                  {currentQuestion.explicacion ||
                    "La seña compuesta significa un saludo"}
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
