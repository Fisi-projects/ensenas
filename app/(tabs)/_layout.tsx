import { Tabs, useSegments } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const segments = useSegments();
  const hideTabBar =
  segments[1] === "home" && (
    segments[2] === "question" ||
    segments[2] === "theory"
  );

  
  const { colorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        /* tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, */
        headerShown: false,
        tabBarStyle: {
          marginTop: 0,
          padding: 0,
          backgroundColor: colorScheme === "dark" ? "#24262f" : "white",
          borderColor: "rgba(137, 137, 137, 0.2)",
          display: hideTabBar ? "none" : "flex",
        },
      }}
    >

      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Entypo
              name="home"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />, */
        }}
      />

      <Tabs.Screen
        name="dictionary"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="book"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, */
        }}
      />
      <Tabs.Screen
        name="translator"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="translate"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),

          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, */
        }}
      />
      <Tabs.Screen
        name="badges"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="military-tech"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, */
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="account-circle"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ),
          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, */
        }}
      />
    </Tabs>
  );
}
