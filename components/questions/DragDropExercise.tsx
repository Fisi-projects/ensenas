import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const goldMedal = require("../../assets/images/badges/goldmedal.png");

const initialPairs = [
  { id: "1", image: goldMedal, word: "hot" },
  { id: "2", image: goldMedal, word: "hat" },
  { id: "3", image: goldMedal, word: "pop" },
  { id: "4", image: goldMedal, word: "pap" },
];

export default function DragDropExercise() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  const handleImageSelect = (id: string) => {
    if (matchedPairs[id]) return;
    setSelectedImage(selectedImage === id ? null : id);
    const pair = initialPairs.find((p) => p.id === id);
    if (selectedWord && pair && selectedWord === pair.word) {
      setMatchedPairs({ ...matchedPairs, [id]: selectedWord });
      setSelectedImage(null);
      setSelectedWord(null);
    }
  };

  const handleWordSelect = (word: string) => {
    if (Object.values(matchedPairs).includes(word)) return;
    setSelectedWord(selectedWord === word ? null : word);
    const pair = initialPairs.find((p) => p.word === word);
    if (selectedImage && pair && selectedImage === pair.id) {
      setMatchedPairs({ ...matchedPairs, [selectedImage]: word });
      setSelectedImage(null);
      setSelectedWord(null);
    }
  };

  const checkCompletion = () =>
    Object.keys(matchedPairs).length === initialPairs.length;

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5 text-center">
        Selecciona los pares
      </Text>

      {/* Imágenes */}
      <View className="flex-row flex-wrap justify-center mb-5">
        {initialPairs.map((pair) => (
          <TouchableOpacity
            key={pair.id}
            onPress={() => handleImageSelect(pair.id)}
            className={[
              "m-2 p-2 rounded-lg items-center",
              matchedPairs[pair.id]
                ? "bg-green-100"
                : selectedImage === pair.id
                ? "bg-blue-100 border-2 border-blue-500"
                : "bg-gray-100",
            ].join(" ")}
            disabled={!!matchedPairs[pair.id]}
          >
            <Image
              source={pair.image}
              className="w-20 h-20"
              style={{ resizeMode: "contain" }}
            />
            {matchedPairs[pair.id] && (
              <Text className="mt-1 font-bold text-green-700">
                {matchedPairs[pair.id]}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View className="h-px bg-gray-300 my-5" />

      {/* Palabras */}
      <View className="flex-row flex-wrap justify-center">
        {initialPairs.map((pair) => (
          <TouchableOpacity
            key={pair.word}
            onPress={() => handleWordSelect(pair.word)}
            className={[
              "m-2 px-4 py-3 rounded-lg",
              Object.values(matchedPairs).includes(pair.word)
                ? "bg-green-100"
                : selectedWord === pair.word
                ? "bg-blue-100 border-2 border-blue-500"
                : "bg-blue-50",
            ].join(" ")}
            disabled={Object.values(matchedPairs).includes(pair.word)}
          >
            <Text className="text-lg">{pair.word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón de comprobación */}
      <TouchableOpacity
        className={[
          "mt-8 py-3 rounded-lg items-center",
          checkCompletion() ? "bg-green-600" : "bg-gray-300",
        ].join(" ")}
        disabled={!checkCompletion()}
      >
        <Text className="text-lg font-bold text-gray-700">COMPROBAR</Text>
      </TouchableOpacity>
    </View>
  );
}
