"use client";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function QuizResultsScreen({
  score = 0,
  totalQuestions = 0,
  onRetry = () => {},
  onContinue = () => {},
}: {
  score?: number;
  totalQuestions?: number;
  onRetry?: () => void;
  onContinue?: () => void;
}) {
  const colorScheme = useColorScheme(); // Correct destructuring
  const percentage = totalQuestions === 0 ? 0 : (score / totalQuestions) * 100;

  const getEncouragementMessage = () => {
    if (percentage >= 80) return "¡Excelente trabajo!";
    if (percentage >= 60) return "¡Buen trabajo, sigue así!";
    if (percentage >= 40) return "Vas por buen camino, ¡sigue practicando!";
    return "¡Aún tienes mucho por mejorar!";
  };

  const getEncouragementIcon = () => {
    if (percentage >= 80) return "grin-stars";
    if (percentage >= 60) return "grin-beam";
    if (percentage >= 40) return "meh";
    return "frown";
  };

  const getExp = () => score * 10;
  const getPrecision = () => `${Math.round(percentage)}%`;

  const handleContinue = () => {
    onContinue();
  };

  const handleRetry = () => {
    onRetry();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-general px-6 py-8">
        <View className="grow justify-center">
          {/* Título */}
          <View className="items-center">
            <Text className="text-title font-bold text-4xl mb-4">
              Resultados
            </Text>
            {/* Puntuación */}
            <Text className="text-title text-xl font-semibold mb-8">
              Puntuación: {score}/{totalQuestions}
            </Text>
            {/* Espacio vertical */}
            <View className="mb-8" style={{ height: 30 }} />
          </View>

          <View className="flex-row items-center bg-secondary-card rounded-lg px-4 py-4 mb-4 w-full">
            <FontAwesome5
              name={getEncouragementIcon()}
              size={24}
              className="mr-3"
              color={colorScheme.colorScheme === "dark" ? "#fff" : "#8570FF"}
            />
            <Text className="text-title text-lg font-medium">
              {getEncouragementMessage()}
            </Text>
          </View>
          {/* Exp obtenida */}
          <View className="flex-row justify-between items-center bg-secondary-card rounded-lg px-4 py-4 mb-4 w-full">
            <View className="flex-row items-center">
              <FontAwesome5
                name="star"
                size={22}
                className="mr-3"
                color={colorScheme.colorScheme === "dark" ? "#fff" : "#8570FF"}
              />
              <Text className="text-title text-lg font-medium">
                Exp obtenida
              </Text>
            </View>
            <Text className="text-title text-lg font-medium">{getExp()}</Text>
          </View>
          {/* Precisión */}
          <View className="flex-row justify-between bg-secondary-card rounded-lg px-4 py-4 mb-8 w-full">
            <View className="flex-row">
              <FontAwesome5
                name="bullseye"
                size={22}
                className="mr-3"
                color={colorScheme.colorScheme === "dark" ? "#fff" : "#8570FF"}
              />
              <Text className="text-title text-lg font-medium">Precisión</Text>
            </View>
            <Text className="text-title text-lg font-medium">
              {getPrecision()}
            </Text>
          </View>
        </View>

        {/* Botones */}
        <View className="gap-4">
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-purple py-4 px-6 rounded-xl "
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Continuar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRetry}
            className=" py-4 px-6 rounded-xl w-full border border-purple"
            activeOpacity={0.8}
          >
            <Text className="text-title mx-auto font-semibold text-lg">
              Volver a intentar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
