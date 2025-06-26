import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { styles } from "../assets/styles/WelcomeScreen.styles";
import { router } from "expo-router";

export default function WelcomeScreen() {
  const [selectedOption, setSelectedOption] = useState<
    "beginner" | "experienced" | null
  >(null);

  const handleOptionSelect = (option: "beginner" | "experienced") => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      console.log("Opción seleccionada:", selectedOption);
      if (selectedOption === "experienced") {
        router.replace("/experience-test");
      } else {
      router.replace("/(tabs)/home");
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary" style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "beginner" && styles.selectedCard,
              ]}
              className="bg-third"
              onPress={() => handleOptionSelect("beginner")}
            >
              <View style={styles.iconContainer}>
                <View style={styles.plantIcon}>
                  <Text style={styles.iconText}>🌱</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text className="text-secondary" style={styles.optionTitle}>Desde el inicio</Text>
                <Text style={styles.optionSubtitle}>
                  Aprenda paso a paso desde lo básico. ¡Vamos a tu ritmo!
                </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "experienced" && styles.selectedCard,
              ]}
              className="bg-third"
              onPress={() => handleOptionSelect("experienced")}
            >
              <View style={styles.iconContainer}>
                <View style={styles.targetIcon}>
                  <Text style={styles.iconText}>🎯</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text className="text-secondary" style={styles.optionTitle}>Tengo experiencia</Text>
                <Text style={styles.optionSubtitle}>
                  Haz un examen corto y continúa desde tu nivel real.
                </Text>
              </View>
            </TouchableOpacity>


          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedOption && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!selectedOption}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
