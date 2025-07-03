import React, { useEffect, useState } from "react";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { TouchableOpacity } from "@/components/ui/TouchableOpacity";
import { Image } from "@/components/ui/Image";
import { useRouter, useLocalSearchParams } from "expo-router";
import DragDropExercise from "@/components/questions/DragDropExercise";
import QuizResultsScreen from "./lessons/results";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Smartlook from "react-native-smartlook-analytics";
import { SafeAreaView } from "react-native";
import * as Speech from 'expo-speech';
import { useAudio } from "../../../components/AudioContext"; 
const baseUrl = "https://ensenas-nosql.onrender.com/modules/";

export default function QuestionnaireScreens() {
  Smartlook.instance.analytics.trackEvent("question_screen");
  useEffect(() => {
    Smartlook.instance.analytics.trackNavigationEnter("Ejercicios");
    return () => {
      Smartlook.instance.analytics.trackNavigationExit("Ejercicios");
    };
  }, []);
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
      `Fetching questions for chapterId: ${chapterId}, lessonId: ${lessonId}`
    );
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${baseUrl}${chapterId}/lessons/${lessonId}/practical`
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
const { audioEnabled } = useAudio();
useEffect(() => {
  if (!audioEnabled) return;
  if (currentQuestion?.title) {
    Speech.speak(currentQuestion.title, {
      onDone: () => {
        if (currentQuestion?.description) {
          Speech.speak(currentQuestion.description);
        }
      }
    });
  }
  // Cleanup: detener audio al desmontar o cambiar pregunta
  return () => {
    Speech.stop();
  };
}, [audioEnabled, currentQuestionIndex, currentQuestion?.title, currentQuestion?.description]);
// ...existing code...

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
    <SafeAreaView className="flex-1 px-6 pb-8 bg-general">
      {/* Corregir color con version oscura */}
      <View className="py-1 h-20 flex-row items-center gap-2 pt-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={35} color="gray" />
        </TouchableOpacity>

        {/* Progress Bar */}
        <View className="bg-gray-200 h-4 rounded-full grow">
          <View
            className="bg-purple h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
        <Text className="text-sm text-fourth">
          {currentQuestionIndex + 1} de {questions.length}
        </Text>
      </View>

      <View className="flex-1">
        {currentQuestion && (
          <>
            {currentQuestion.type == 1 && (
              <>
                <View className="rounded-2xl py-4 mb-4">
                  <Text className="text-xl font-medium text-secondary">
                    {currentQuestion.title}
                  </Text>
                </View>

                {currentQuestion.imageUrl && (
                  <View className="items-center mb-4 overflow-hidden w-full max-w-[350] h-[250]">
                    <Image
                      source={{ uri: currentQuestion.imageUrl }}
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 1.5,
                      }}
                      contentFit="contain" //cambiar a cover, img estandar
                    />
                  </View>
                )}

                <View className="py-5 flex-row gap-3">
                  <TouchableOpacity className="bg-purple  justify-center rounded-md h-[35] w-[35] items-center"
                    onPress={()=>{
                      const thingToSay = currentQuestion.description;
                      Speech.speak(thingToSay);
                    }}
                  >
                    <MaterialIcons name="volume-up" size={25} color="white" />
                  </TouchableOpacity>
                  <Text className="text-base text-fourth">
                    {currentQuestion.description}
                  </Text>
                </View>

                {/* alternativas */}

                {currentQuestion.alternatives && (
                  <View className="pb-10 grow justify-center">
                    <View className="flex-row flex-wrap gap-y-3 justify-between">
                      {currentQuestion.alternatives
                        .slice() // Create a shallow copy to avoid mutating the original
                        .sort(
                          (a: { id: number }, b: { id: number }) => a.id - b.id
                        )
                        .map((opcion: any, idx: number) => {
                          const isSelected =
                            selectedAnswers[currentQuestionIndex] === idx;
                          const isCorrect = idx === currentQuestion.answer;

                          let borderColor =
                            "border-gray-300 dark:border-gray-300/20";

                          if (
                            isAnswerSelected &&
                            isSelected &&
                            showExplanation
                          ) {
                            if (isCorrect) {
                              borderColor = "border-green-400";
                            } else {
                              borderColor = "border-red-400";
                            }
                          } else if (isSelected) {
                            borderColor = "border-purple/70";
                          }

                          return (
                            <TouchableOpacity
                              key={idx}
                              onPress={() =>
                                handleAnswerSelect(currentQuestionIndex, idx)
                              }
                              className={`basis-[48%] mb-3 p-4 bg-white dark:bg-black/20 rounded-2xl border-2 border-b-8 ${borderColor}`}
                              disabled={showExplanation}
                            >
                            <Text className="text-center text-sm text-secondary">
                              {opcion.label}
                            </Text>
                              
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
            {currentQuestion.type == 2 && <DragDropExercise />}
            {currentQuestion.type == 3 && (
              <>
                <View className="rounded-2xl p-4 mb-4">
                  <Text className="text-xl font-medium text-secondary">
                    {currentQuestion.title}
                  </Text>
                </View>

                <View className="px-5 mb-6 flex-row gap-3">
                  <View className="bg-purple  justify-center rounded-md h-[35] w-[35] items-center">
                    <MaterialIcons name="volume-up" size={25} color="white" />
                  </View>
                  <Text className="text-base text-fourth">
                    {currentQuestion.description}
                  </Text>
                </View>

                {/* alternativas */}

                {currentQuestion.alternatives && (
                  <View className="px-5 mb-5 grow">
                    <View className="flex-row flex-wrap gap-y-3 justify-between grow ">
                      {currentQuestion.alternatives
                        .slice()
                        .sort(
                          (a: { id: number }, b: { id: number }) => a.id - b.id
                        )
                        .map((opcion: any, idx: number) => {
                          const isSelected =
                            selectedAnswers[currentQuestionIndex] === idx;
                          const isCorrect = idx === currentQuestion.answer;

                          let borderColor =
                            "border-gray-300 dark:border-gray-300/20";

                          if (
                            isAnswerSelected &&
                            isSelected &&
                            showExplanation
                          ) {
                            if (isCorrect) {
                              borderColor = "border-green-400";
                            } else {
                              borderColor = "border-red-400";
                            }
                          } else if (isSelected) {
                            borderColor = "border-purple/70";
                          }

                          return (
                            <TouchableOpacity
                              key={idx}
                              onPress={() => handleAnswerSelect(currentQuestionIndex, idx)}
                              className={`w-[45%] h-[45%] max-h-[190] mb-4 p-4 bg-white dark:bg-black/20 rounded-2xl border-2 border-b-8  ${borderColor}`}
                              disabled={showExplanation}
                            >
                              {opcion.imageUrl && (
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
                                  <Image
                                    source={{ uri: opcion.imageUrl }}
                                    style={{ width: "100%", height: 100, resizeMode: "contain" }}
                                    contentFit="contain"
                                  />
                                </View>
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
      <View>
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
    </SafeAreaView>
  );
}
