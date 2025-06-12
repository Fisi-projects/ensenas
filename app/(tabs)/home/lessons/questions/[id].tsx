import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "@/components/ui/ScrollView";
import { TouchableOpacity } from "@/components/ui/TouchableOpacity";
import { Image } from "@/components/ui/Image";
import { FirestoreService } from "@/services/firestore";
import { useRouter } from "expo-router";

export default function QuestionsLayout() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);  
    const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
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
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-lg text-secondary">Cargando preguntas...</Text>
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
    <View className="flex-1 w-full h-full bg-primary flex-col" >
      {/* Header with close button and progress */}


    <View className="px-4 pt-12 pb-4 items-start bg-third shadow-sm border-b border-gray-600">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Text className="text-2xl text-fourth">✕</Text>
          </TouchableOpacity>
          <Text className="text-sm text-secondary">
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



        {/* content */}












      {/* Bottom Navigation */}
    <View className="items-en px-4 py-6 border-t bg-third border-gray-600 absolute bottom-0 left-0 right-0" style={{ zIndex: 10 }}>
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
