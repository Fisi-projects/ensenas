import { LayoutStyles } from "@/components/LayoutStyle";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useState } from "react";
import Smartlook, { Properties } from "react-native-smartlook-analytics";

Smartlook.instance.analytics.trackEvent("diccionario-access");

Smartlook.instance.analytics.trackNavigationEnter("Diccionario");
Smartlook.instance.analytics.trackNavigationExit("Diccionario");

const screenWidth = Dimensions.get("window").width;
const horizontalPadding = 20;
const spaceBetween = 20;
const columns = 3;
const totalSpacing = spaceBetween * (columns - 1) + horizontalPadding * 2;
const cardSize = (screenWidth - totalSpacing) / columns;

const categoryData = [
  {
    title: "Categoría 1",
    items: [
      "Hola",
      "¿Cómo estás?",
      "Buen día",
      "Encantado",
      "Mucho gusto",
      "¿Qué tal?",
    ],
  },
  {
    title: "Categoría 2",
    items: [
      "Buenas tardes",
      "¿Cómo te va?",
      "Buen día",
      "¿Todo bien?",
      "¡Qué alegría!",
      "¡Hola de nuevo!",
    ],
  },
  {
    title: "Categoría 3",
    items: [
      "Buenas noches",
      "Dulces sueños",
      "Hasta mañana",
      "Descansa",
      "Que duermas bien",
    ],
  },
  {
    title: "Categoría 4",
    items: [
      "Gracias",
      "De nada",
      "Por favor",
      "Con gusto",
      "Mil gracias",
      "Te lo agradezco",
    ],
  },
  {
    title: "Categoría 5",
    items: [
      "Adiós",
      "Nos vemos",
      "Hasta luego",
      "Chau",
      "Cuídate",
      "Hasta pronto",
    ],
  },
];

type GreetingCardProps = {
  text: string;
  onPress: () => void;
};

const GreetingCard = ({ text, onPress }: GreetingCardProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => {
        setPressed(false);
        onPress();
      }}
      activeOpacity={0.8}
      style={[styles.card, pressed && styles.cardPressed]}
    >
      <Text style={[styles.cardText, pressed && styles.cardTextPressed]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

type GreetingSectionProps = {
  title: string;
  items: string[];
  isFirst?: boolean;
};

const GreetingSection = ({ title, items, isFirst }: GreetingSectionProps) => {
  const handlePress = (text: string) => {
    console.log("Presionado:", text);
  };

  return (
    <View style={[styles.section, isFirst && { paddingTop: 16 }]}>
      <View style={styles.textWrapper}>
        <View style={[styles.header, { backgroundColor: "#FF4885" }]}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          quis justo neque
        </Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <GreetingCard text={item} onPress={() => handlePress(item)} />
        )}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.cardContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

export default function Dictionary() {
  return (
    <ScrollView
      style={LayoutStyles.container}
      className="bg-primary"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={LayoutStyles.Title__text}>
        Dictionary
      </Text>
      {categoryData.map((cat, index) => (
        <GreetingSection
          key={index}
          title={cat.title}
          items={cat.items}
          isFirst={index === 0}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  description: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 14,
  },
  cardContainer: {
    paddingHorizontal: horizontalPadding,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: 84,
    height: 84,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardPressed: {
    backgroundColor: "#dbefff",
    borderColor: "#2196f3",
    ...Platform.select({
      ios: {
        shadowColor: "#2196f3",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 2,
  },
  cardTextPressed: {
    color: "#1976d2",
  },
  textWrapper: {
    paddingHorizontal: horizontalPadding,
  },
});
