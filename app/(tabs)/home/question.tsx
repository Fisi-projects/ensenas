import React, { useEffect, useState } from "react";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { TouchableOpacity } from "@/components/ui/TouchableOpacity";
import { Image } from "@/components/ui/Image";
import { useRouter, useLocalSearchParams } from "expo-router";
import DragDropExercise from "@/components/questions/DragDropExercise";
import QuizResultsScreen from "./lessons/results";

const baseUrl = "https://ensenas-nosql.onrender.com/modules/";

export default function QuestionnaireScreens() {
  const { chapterId, lessonId } = useLocalSearchParams() as {
    chapterId: string;
    lessonId: string;
  };
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    console.log(
      `Fetching questions for chapterId: ${chapterId}, lessonId: ${lessonId}`,
    );
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${baseUrl}${chapterId}/lessons/${lessonId}/practical`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        console.log("Fetched questions:", data);
        setQuestions(Array.isArray(data) ? data : Object.values(data || {}));
        console.log("Processed questions:", questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (selectedAnswers) {
    }
  }, [showExplanation]);

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
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (
        selectedAnswers[idx] !== undefined &&
        q.answer !== undefined &&
        selectedAnswers[idx] === q.answer
      ) {
        score++;
      }
    });
    return score;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress =
    questions.length > 0 ? (currentQuestionIndex + 1) / questions.length : 0;
  const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-secondary text-lg">Cargando preguntas...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View className="flex-1 bg-primary justify-center items-center px-4">
        <Text className="text-lg text-center mb-4">
          No se encontraron preguntas
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-pink-500 rounded-lg py-3 px-6"
        >
          <Text className="text-secondary font-semibold">Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showResults) {
    return (
      <QuizResultsScreen
        score={calculateScore()}
        totalQuestions={questions.length}
        onRetry={() => {
          setShowResults(false);
          setCurrentQuestionIndex(0);
          setSelectedAnswers({});
          setShowExplanation(false);
        }}
        onContinue={() => router.replace("/home")}
      />
    );
  }

  return (
    <View className="flex-1 bg-primary">
      {/* Header with close button and progress */}
      <View className="px-4 pt-2 pb-2 bg-third border-b border-gray-300 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Text className="text-secondary text-2xl">✕</Text>
          </TouchableOpacity>
          <Text className="text-sm text-fourth">
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

      <View className="flex-1 px-4 py-3 bg-primary">
        {currentQuestion && (
          <>
            {currentQuestion.type == 1 && (
              <>
                <View className="bg-gray rounded-2xl p-4 mb-4">
                  <Text className="text-white text-lg font-medium">
                    {currentQuestion.title}
                  </Text>
                </View>

                {currentQuestion.imageUrl && (
                  <View
                    className="items-center mb-4  rounded-2xl overflow-hidden"
                    style={{
                      width: "auto",
                      maxWidth: 350,
                      height: 180,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      source={{ uri: currentQuestion.imageUrl }}
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 1.5,
                        borderRadius: 16, // Borde redondeado
                      }}
                      contentFit="contain"
                    />
                  </View>
                )}

                <View className="bg-third rounded-2xl p-4 mb-6 border-2 border-gray-500">
                  <View className="flex-row items-center">
                    <Text className="text-2xl mr-3">🔊</Text>
                    <Text className="text-secondary flex-1">
                      {currentQuestion.description}
                    </Text>
                  </View>
                </View>

                {/* alternativas */}

                {currentQuestion.alternatives && (
                  <View className="mb-6">
                    <View className="flex-row flex-wrap justify-between">
                      {currentQuestion.alternatives.map(
                        (opcion: any, idx: number) => (
                          <TouchableOpacity
                            key={idx}
                            onPress={() =>
                              handleAnswerSelect(currentQuestionIndex, idx)
                            }
                            className={`w-[48%] mb-4 p-4 rounded-2xl border-2 ${
                              selectedAnswers[currentQuestionIndex] === idx
                                ? "border-blue-500 bg-blue-400"
                                : "border-gray-500 bg-third"
                            }`}
                          >
                            <Text
                              className={`text-center text-sm ${
                                selectedAnswers[currentQuestionIndex] === idx
                                  ? "text-primary"
                                  : "text-secondary"
                              }`}
                            >
                              {opcion.title}
                            </Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  </View>
                )}
              </>
            )}
            {currentQuestion.type == 2 && <DragDropExercise />}
            {currentQuestion.type == 3 && (
              <>
                <View className="bg-gray-800 rounded-2xl p-4 mb-4">
                  <Text className="text-white text-lg font-medium">
                    {currentQuestion.title}
                  </Text>
                </View>

                {currentQuestion.imageUrl && (
                  <View
                    className="items-center mb-4 rounded-2xl overflow-hidden"
                    style={{
                      width: "auto",
                      maxWidth: 350,
                      height: 180,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      source={{ uri: currentQuestion.imageUrl }}
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#ccc",
                        aspectRatio: 1.5,
                        borderRadius: 16, // Borde redondeado
                      }}
                      contentFit="contain"
                    />
                  </View>
                )}

                <View className="bg-third rounded-2xl p-4 mb-6 border-2 border-gray-500">
                  <View className="flex-row items-center">
                    <Text className="text-2xl mr-3">🔊</Text>
                    <Text className="text-secondary flex-1">
                      {currentQuestion.description}
                    </Text>
                  </View>
                </View>

                {/* alternativas */}

                {currentQuestion.alternatives && (
                  <View className="mb-6">
                    <View className="flex-row flex-wrap justify-between">
                      {currentQuestion.alternatives
                        .slice() // Create a shallow copy to avoid mutating the original
                        .sort(
                          (a: { id: number }, b: { id: number }) => a.id - b.id,
                        )
                        .map((opcion: any, idx: number) => {
                          const isSelected =
                            selectedAnswers[currentQuestionIndex] === idx;
                          const isCorrect = idx === currentQuestion.answer;

                          let borderColor = "border-gray-500";
                          let bgColor = "bg-third";

                          if (
                            isAnswerSelected &&
                            isSelected &&
                            showExplanation
                          ) {
                            if (isCorrect) {
                              borderColor = "border-green-500";
                              bgColor = "bg-green-400";
                            } else {
                              borderColor = "border-red-500";
                              bgColor = "bg-red-400";
                            }
                          } else if (isSelected) {
                            borderColor = "border-blue-500";
                            bgColor = "bg-blue-400";
                          }

                          return (
                            <TouchableOpacity
                              key={idx}
                              onPress={() =>
                                handleAnswerSelect(currentQuestionIndex, idx)
                              }
                              className={`w-[48%] mb-4 p-4 rounded-2xl border-2 ${borderColor} ${bgColor}`}
                              disabled={showExplanation}
                            >
                              {opcion.label || opcion.imageUrl ? (
                                <Image
                                  source={{ uri: opcion.imageUrl }}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    resizeMode: "contain",
                                    alignSelf: "center",
                                    borderRadius: 12,
                                  }}
                                />
                              ) : (
                                <Text
                                  className={`text-center text-sm ${
                                    isSelected
                                      ? "text-primary"
                                      : "text-secondary"
                                  }`}
                                >
                                  {opcion.title}
                                </Text>
                              )}
                            </TouchableOpacity>
                          );
                        })}
                    </View>

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
                  </View>
                )}
              </>
            )}
          </>
        )}
      </View>

      {/* Bottom Navigation */}
      <View className="px-4 py-6 bg-third border-t border-gray-200">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={handleContinue}
            className="px-8 py-3 rounded-full bg-blue-500 mr-2"
            style={{ minWidth: 120 }}
          >
            <Text className="text-center font-semibold text-white">
              Siguiente
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
