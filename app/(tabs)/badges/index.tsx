import { LayoutStyles } from "@/components/LayoutStyle";
import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { ScrollView } from "@/components/ui/ScrollView";
import { Image, FlatList, Dimensions } from "react-native";
import { TouchableOpacity } from "@/components/ui/TouchableOpacity";
import Smartlook from "react-native-smartlook-analytics";

const { width } = Dimensions.get("window");

const personalBadges = [
  {
    id: "1",
    name: "5 Lecciones",
    date: "fecha_logro",
    image: require("@/assets/images/badges/logro1.png"),
  },
  {
    id: "2",
    name: "Test de conocimiento",
    date: "fecha_logro",
    image: require("@/assets/images/badges/logro2.png"),
  },
  {
    id: "3",
    name: "50 Días de racha",
    date: "fecha_logro",
    image: require("@/assets/images/badges/logro3.png"),
  },
  {
    id: "4",
    name: "10 Lecciones",
    date: "fecha_logro",
    image: require("@/assets/images/badges/logro4.png"),
  },
];

const rewards = [
  {
    id: "1",
    name: "Nivel Avanzado",
    quantity: "Cantidad",
    image: require("@/assets/images/badges/premio1.png"),
  },
  {
    id: "2",
    name: "Traduce 10 palabras",
    quantity: "Cantidad",
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
    quantity: "Cantidad",
    image: require("@/assets/images/badges/premio4.png"),
  },
  {
    id: "5",
    name: "Inicia Sesión 10 días ",
    quantity: "Cantidad",
    image: require("@/assets/images/badges/premio5.png"),
  },
  {
    id: "6",
    name: "Nivel Básico",
    quantity: "Cantidad",
    image: require("@/assets/images/badges/premio6.png"),
  },
];

export default function Badges({ navigation }: any) {
  Smartlook.instance.analytics.trackEvent("badges_screen_viewed");
  Smartlook.instance.analytics.trackNavigationExit("Badges");
  return (
    <View
      style={[
        LayoutStyles.container,
        { paddingHorizontal: 30, paddingVertical: 25 },
      ]}
      className="bg-primary"
    >
      {/* Encabezado con flecha + título */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-secondary text-3xl mr-3">←</Text>
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text
            style={LayoutStyles.Title__text}
            className="text-secondary text-2xl"
          >
            Logros
          </Text>
        </View>
      </View>

      {/* Logros personales */}
      <Text className="text-secondary text-xl font-bold mb-2">
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
            style={{
              alignContent: "center",
              width: 150,
              height: 200,
              borderRadius: 5,
              padding: 17,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#898989",
            }}
          >
            {/*<Image
            source={badge.image}
            style={{
                width: '100%',
                height: 120,
                borderRadius: 8,
                marginBottom: 8,
                resizeMode: 'cover',
            }}
            /> */}
            <View
              style={{
                width: "100%",
                height: 120,
                backgroundColor: "#e5e5e5",
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
            <View
              style={{
                width: "100%",
                height: 40,
                borderRadius: 8,
                marginBottom: 8,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 8,
                  justifyContent: "center",
                  marginTop: 6,
                }}
              >
                <Text
                  className="text-secondary text-center text-15 font-bold"
                  numberOfLines={2}
                >
                  {badge.name}
                </Text>
              </View>
              <Text className=" text-center text-secondary text-13">
                {badge.date}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Premios */}
      <Text className="text-secondary text-xl font-bold mt-6 mb-2">
        Premios
      </Text>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: 120,
              height: 200,
              borderRadius: 12,
              padding: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/*<Image
            source={item.image}
            style={{
                width: '100%',
                height: 120,
                borderRadius: 8,
                marginBottom: 8,
                resizeMode: 'contain',
            }}
            />
            */}
            <View
              style={{
                width: 104,
                height: 120,
                backgroundColor: "#e5e5e5",
                borderRadius: 5,
                marginBottom: 6,
              }}
            />

            <View
              style={{
                width: "100%",
                height: 40,
                borderRadius: 8,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 8,
                  justifyContent: "center",
                  marginTop: 6,
                }}
              >
                <Text className="text-secondary text-center font-bold text-15">
                  {item.name}
                </Text>
              </View>
              <Text className="text-center text-secondary text-12">
                {item.quantity}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
