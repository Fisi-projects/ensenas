import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        /* tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, */
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#1d1d1d',
          marginTop: 0,
          padding: 0,

         },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color="white" />
          ),
          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />, */
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color="white" />
          ),
          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, */
        }}
      />
      <Tabs.Screen
        name="translator"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="translate" size={24} color="white" />
          ),

          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, */
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color="white" />
          ),
          /* tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, */
        }}
      />
    </Tabs>
  );
}

