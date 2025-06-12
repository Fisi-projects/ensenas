import React, { useEffect, useState } from "react";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { ScrollView } from "@/components/ui/ScrollView";
import { TouchableOpacity } from "@/components/ui/TouchableOpacity";
import { Image } from "@/components/ui/Image";
import { FirestoreService } from "@/services/firestore";
import { useRouter } from "expo-router";

export default function QuestionnaireScreens() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showExplanation, setShowExplanation] = useState(false);

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

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      // Questionnaire completed
      router.back();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowExplanation(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress =
    questions.length > 0 ? (currentQuestionIndex + 1) / questions.length : 0;
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
      {/* Header with close button and progress */}
      <View className="px-4 pt-12 pb-4 bg-white shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Text className="text-2xl">✕</Text>
          </TouchableOpacity>
          <Text className="text-sm text-gray-600">
            {currentQuestionIndex + 1} de {questions.length}
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="bg-gray-200 h-2 rounded-full">
          <View
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {currentQuestion && (
          <>
            {/* Question */}
            <View className="bg-gray-800 rounded-2xl p-4 mb-6">
              <Text className="text-white text-lg font-medium">
                {currentQuestion.pregunta}
              </Text>
            </View>

            {/* Media Content (Images/Videos) */}
            {currentQuestion.mediaUrl && (
              <View className="bg-gray-50 rounded-2xl p-4 mb-6 items-center">
                <Image
                  source={{ uri: currentQuestion.mediaUrl }}
                  className="w-64 h-64 mb-4"
                  contentFit="contain"
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
              <View className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                <Text className="text-green-800 font-medium mb-2">
                  Explicación:
                </Text>
                <Text className="text-green-700">
                  {currentQuestion.explicacion ||
                    "La seña compuesta significa un saludo de Buenas Noches"}
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="px-4 py-6 bg-white border-t border-gray-100">
        <View className="flex-row justify-between items-center">
          {/* Previous Button */}
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-full ${
              currentQuestionIndex === 0 ? "bg-gray-100" : "bg-gray-200"
            }`}
          >
            <Text
              className={`font-medium ${
                currentQuestionIndex === 0 ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Anterior
            </Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={() => {
              if (isAnswerSelected && !showExplanation) {
                setShowExplanation(true);
              } else {
                handleContinue();
              }
            }}
            disabled={!isAnswerSelected}
            className={`px-8 py-3 rounded-full ${
              isAnswerSelected ? "bg-pink-500" : "bg-gray-200"
            }`}
            style={{ minWidth: 120 }}
          >
            <Text
              className={`text-center font-semibold ${
                isAnswerSelected ? "text-white" : "text-gray-400"
              }`}
            >
              {!showExplanation && isAnswerSelected
                ? "Ver respuesta"
                : currentQuestionIndex === questions.length - 1
                  ? "Finalizar"
                  : "Continuar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
