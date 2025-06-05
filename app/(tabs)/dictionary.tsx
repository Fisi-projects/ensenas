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

const screenWidth = Dimensions.get("window").width;
const horizontalPadding = 20;
const spaceBetween = 20;
const columns = 3;
const totalSpacing = spaceBetween * (columns - 1) + horizontalPadding * 2;
const cardSize = (screenWidth - totalSpacing) / columns;

const categoryData = [
  {
    title: "Categoría 1",
    color: "#ff4f91",
    items: ["Hola", "¿Cómo estás?", "Buen día", "Encantado", "Mucho gusto", "¿Qué tal?"]
  },
  {
    title: "Categoría 2",
    color: "#333",
    items: ["Buenas tardes", "¿Cómo te va?", "Buen día", "¿Todo bien?", "¡Qué alegría!", "¡Hola de nuevo!"]
  },
  {
    title: "Categoría 3",
    color: "#4caf50",
    items: ["Buenas noches", "Dulces sueños", "Hasta mañana", "Descansa", "Que duermas bien"]
  },
  {
    title: "Categoría 4",
    color: "#3f51b5",
    items: ["Gracias", "De nada", "Por favor", "Con gusto", "Mil gracias", "Te lo agradezco"]
  },
  {
    title: "Categoría 5",
    color: "#ff9800",
    items: ["Adiós", "Nos vemos", "Hasta luego", "Chau", "Cuídate", "Hasta pronto"]
  },
];

const GreetingCard = ({ text, onPress, darkMode }) => {
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
      style={[
        styles.card,
        darkMode && styles.cardDark,
        pressed && (darkMode ? styles.cardPressedDark : styles.cardPressed),
      ]}
    >
      <Text
        style={[
          styles.cardText,
          darkMode && styles.cardTextDark,
          pressed && (darkMode ? styles.cardTextPressedDark : styles.cardTextPressed),
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const GreetingSection = ({ title, color, items, isFirst, darkMode }) => {
  const handlePress = (text) => {
    console.log("Presionado:", text);
  };

  return (
    <View style={[styles.section, isFirst && { paddingTop: 16 }]}>
      <View style={styles.textWrapper}>
        <View style={[styles.header, { backgroundColor: color }]}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <Text style={[styles.description, darkMode && styles.descriptionDark]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis justo neque
        </Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <GreetingCard text={item} onPress={() => handlePress(item)} darkMode={darkMode} />
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
  const darkMode = false; //MODO OSCURO, cambiar a true para MODO oscuro

  return (
    <ScrollView
      style={[LayoutStyles.container, darkMode ? styles.containerDark : styles.containerLight]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={[LayoutStyles.Title__text, darkMode ? styles.titleDark : styles.titleLight]}>
        Dictionary
      </Text>
      {categoryData.map((cat, index) => (
        <GreetingSection
          key={index}
          title={cat.title}
          color={cat.color}
          items={cat.items}
          isFirst={index === 0}
          darkMode={darkMode}
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
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  description: {
    textAlign: 'center',
    marginVertical: 8,
    color: '#555',
    fontSize: 14,
  },
  descriptionDark: {
    color: '#ccc',
  },
  cardContainer: {
    paddingHorizontal: horizontalPadding,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: 84,
    height: 84,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
  },
  cardPressed: {
    backgroundColor: '#dbefff',
    borderColor: '#2196f3',
    ...Platform.select({
      ios: {
        shadowColor: '#2196f3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardPressedDark: {
    backgroundColor: '#3a3a3a',
    borderColor: '#64b5f6',
    ...Platform.select({
      ios: {
        shadowColor: '#64b5f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  cardTextDark: {
    color: '#ddd',
  },
  cardTextPressed: {
    color: '#1976d2',
  },
  cardTextPressedDark: {
    color: '#90caf9',
  },
  textWrapper: {
    paddingHorizontal: horizontalPadding,
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  titleLight: {
    color: '#333',
  },
  titleDark: {
    color: '#eee',
  },
});
