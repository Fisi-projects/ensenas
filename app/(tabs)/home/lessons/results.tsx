"use client";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

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
  const handleClose = () => {
    onContinue();
  };

  const handleContinue = () => {
    onContinue();
  };

  const handleRetry = () => {
    onRetry();
  };

  const getEncouragementMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return "¡Excelente trabajo!";
    if (percentage >= 60) return "¡Buen trabajo, sigue así!";
    if (percentage >= 40) return "Vas por buen camino, ¡sigue practicando!";
    return "¡Aún tienes mucho por mejorar!";
  };

  // Close Icon Component (simple X)
  const CloseIcon = () => (
    <View className="w-6 h-6 items-center justify-center">
      <View className="w-4 h-0.5 bg-gray-600 absolute rotate-45" />
      <View className="w-4 h-0.5 bg-gray-600 absolute -rotate-45" />
    </View>
  );

  // Refresh Icon Component
  const RefreshIcon = () => (
    <View className="w-5 h-5 items-center justify-center mr-2">
      <View className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      <View className="absolute top-0 right-0.5 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-white border-b-white" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f3f4f6"
        translucent={false}
      />

      {/* Header Section */}
      <View className="px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleClose}
            className="p-2 -ml-2 rounded-full active:bg-gray-100"
            activeOpacity={0.7}
          >
            <CloseIcon />
          </TouchableOpacity>
          <View
            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `90%` }}
          />
        </View>
        {/* Progress Bar */}
        <View className="px-2">
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden"></View>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6 py-8">
        {/* Spacer for better vertical centering */}
        <View className="flex-1" />

        {/* Results Button */}
        <View className="items-center mb-8">
          <TouchableOpacity
            className="bg-gray-800 px-12 py-3 rounded-lg shadow-md active:bg-gray-700"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-lg">Resultados</Text>
          </TouchableOpacity>
        </View>

        {/* Results Content */}
        <View className="items-center mb-12 bg-white p-5 rounded-lg">
          <Text className="text-gray-700 text-base mb-3">Tus resultados:</Text>

          <Text className="text-xl font-bold text-gray-800 mb-6">
            Puntuación: {score}/{totalQuestions}
          </Text>

          <Text className="text-gray-600 text-center text-base leading-6 px-4">
            {getEncouragementMessage()}
          </Text>
        </View>

        {/* Spacer for better vertical centering */}
        <View className="flex-1" />

        {/* Action Buttons */}
        <View className="gap-4">
          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-pink-500 py-4 px-6 rounded-xl shadow-lg active:bg-pink-600"
            activeOpacity={0.8}
            style={{
              shadowColor: "#ec4899",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Continuar
            </Text>
          </TouchableOpacity>

          {/* Retry Button */}
          <TouchableOpacity
            onPress={handleRetry}
            className="bg-blue-500 py-4 px-6 rounded-xl shadow-lg active:bg-blue-600 flex-row items-center justify-center"
            activeOpacity={0.8}
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <RefreshIcon />
            <Text className="text-white font-semibold text-lg">
              Volver a intentar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing for safe area */}
        <View className="h-4" />
      </View>
    </SafeAreaView>
  );
}
