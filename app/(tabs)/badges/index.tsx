import { LayoutStyles } from "@/components/LayoutStyle";
import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { ScrollView } from "@/components/ui/ScrollView";
import { Image, FlatList, Dimensions, ImageBackground } from "react-native";
import { TouchableOpacity } from "@/components/ui/TouchableOpacity";
import Smartlook from "react-native-smartlook-analytics";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const personalBadges = [
  {
    id: "1",
    name: "5 Lecciones",
    date: "No obtenido",
    image: require("@/assets/images/badges/logro1.png"),
  },
  {
    id: "2",
    name: "Test de conocimiento",
    date: "No obtenido",
    image: require("@/assets/images/badges/logro2.png"),
  },
  {
    id: "3",
    name: "50 Días de racha",
    date: "No obtenido",
    image: require("@/assets/images/badges/logro3.png"),
  },
  {
    id: "4",
    name: "10 Lecciones",
    date: "No obtenido",
    image: require("@/assets/images/badges/logro4.png"),
  },
];

const rewards = [
  {
    id: "1",
    name: "Nivel Avanzado",
    quantity: "No obtenido",
    image: require("@/assets/images/badges/premio1.png"),
  },
  {
    id: "2",
    name: "Traduce 10 palabras",
    quantity: "0/10",
    image: require("@/assets/images/badges/premio2.png"),
  },
  {
    id: "3",
    name: "Completa 5 Lecciones",
    quantity: "Cantidad",
    image: require("@/assets/images/badges/premio3.png"),
  },
  {
    id: "4",
    name: "Busca 5 Palabras",
    quantity: "1/5",
    image: require("@/assets/images/badges/premio4.png"),
  },
  {
    id: "5",
    name: "Inicia Sesión 10 días ",
    quantity: "0/10",
    image: require("@/assets/images/badges/premio5.png"),
  },
  {
    id: "6",
    name: "Nivel Básico",
    quantity: "No obtenido",
    image: require("@/assets/images/badges/premio6.png"),
  },
];

export default function Badges({ navigation }: any) {
  Smartlook.instance.analytics.trackEvent("badges_screen_viewed");
  useEffect(() => {
    Smartlook.instance.analytics.trackNavigationEnter("Logros");
    return () => {
      Smartlook.instance.analytics.trackNavigationExit("Logros");
    };
  }, []);
  const router = useRouter();

  return (
    <ScrollView className="bg-white dark:bg-[#1A1C20]">
      {/* Encabezado con flecha + título */}
      <ImageBackground
        source={require("@/assets/images/background/bg_trophy.jpg")}
        className="h-[150] px-6"
        resizeMode="cover"
      >
        <View className="my-auto">
          <Text className="text-3xl font-bold text-white">Diccionario</Text>
          <Text className="text-base text-white mt-1">
            Temas teóricos por lección
          </Text>
        </View>
      </ImageBackground>

      {/* Logros personales */}
      <View className="px-[30] pt-3">
        <Text className="text-secondary text-xl font-bold my-5">
          Logros personales
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {personalBadges.map((badge) => (
            <View
              key={badge.id}
              className="flex w-[130] h-[200] rounded-md justify-center p-4 bg-lessons border border-gray-200 dark:border-0"
            >
              <View className="flex-1 justify-center">
                <Image
                  source={badge.image}
                  resizeMode="contain"
                  className="w-3/4 h-3/4 mx-auto"
                />
              </View>
              <View>
                <View>
                  <Text
                    className="text-secondary text-center text-[17px] font-bold"
                    numberOfLines={2}
                  >
                    {badge.name}
                  </Text>
                </View>
                <Text className=" text-center text-secondary text-sm">
                  {badge.date}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Premios */}
        <Text className="text-secondary text-xl font-bold my-5">Premios</Text>
        {rewards.map((item) => (
          <View
            key={item.id}
            className="flex-row w-full gap-5 items-center rounded-md bg-lessons p-5 mb-3 border border-gray-200 dark:border-0"
          >
            <View>
              <Image
                source={item.image}
                resizeMode="contain"
                className="h-[60] w-20"
              />
            </View>
            <View>
              <Text
                className="text-secondary font-bold text-[15px]"
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <Text className="text-secondary text-[12px]">
                {item.quantity}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
