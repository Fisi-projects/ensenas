"use client";
import React, { useState, useEffect } from "react";
import { LayoutStyles } from "@/components/LayoutStyle";
import {
  Switch,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { useAudio } from "../../components/AudioContext";
import { Text } from "react-native";
import { Image } from "expo-image";
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { getStorage } from "@react-native-firebase/storage";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { SettingsStyles } from "@/assets/styles/Settings.styles";
import * as ImagePicker from "expo-image-picker";
import { getAuth, signOut } from "@react-native-firebase/auth";
import Smartlook from "react-native-smartlook-analytics";
import { UserResponse } from "./home";
import axios from "axios";
import Constants from "expo-constants";

export default function Settings() {
  Smartlook.instance.analytics.trackEvent("settings_screen_viewed");
  useEffect(() => {
    Smartlook.instance.analytics.trackNavigationEnter("Settings");
    return () => {
      Smartlook.instance.analytics.trackNavigationExit("Settings");
    };
  }, []);
  const { audioEnabled, setAudioEnabled } = useAudio();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [editingName, setEditingName] = useState(false);
  const [userName, setUserName] = useState("Brayan Llacza Valeta");
  const [newName, setNewName] = useState("");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [userStats, setUserStats] = useState<UserResponse | null>(null);
  const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;

  // User data - esto debería venir de tu sistema de autenticación
  const userData = {
    name: "Brayan Llacza Valeta",
    level: 30,
    experience: 30,
    maxExperience: 200,
    streakDays: 7,
    completedAchievements: 3,
    totalAchievements: 20,
  };

  const handleWelcome = async () => {
    router.replace("/welcome");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = getAuth().currentUser;
      if (!user) {
        console.log("No user logged in.");
        return;
      }

      console.log("Checking if user exists...");

      try {
        const tokenResult = await user.getIdTokenResult();
        const token = tokenResult.token;
        const uid = tokenResult.claims.user_id;

        // 1. Check if the user already exists
        const getUserRes = await axios.get(`${API_BASE_URL}user/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User already exists:", getUserRes.data);
        setUserStats(getUserRes.data);
      } catch (err) {
        console.error("Error during user check/creation:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace("/auth");
      // El listener de onAuthStateChanged pondrá user en null automáticamente
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleNavigation = (screen: string) => {
    console.log(`Navegando a: ${screen}`);
    // Implementar navegación según la pantalla
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Firestore get document query
        const db = getFirestore();
        const q = query(collection(db, "test"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });

        // Storage get resource query
        const storage = getStorage();
        const ref = storage.ref("/libro-minedu/portada-libro-minedu.png");
        const url = await ref.getDownloadURL();
        console.log(url);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editingName) {
      setNewName(userName);
    }
  }, [editingName, userName]);

  const experiencePercentage =
    userStats?.experience ?? 50 / 100 + (userStats?.level ?? 1 - 1) * 10;

  return (
    <ScrollView style={LayoutStyles.container} className="bg-primary">
      {/* Profile Section */}
      <View className="px-3 py-4">
        <View className="flex-row items-center mb-4">
          <View className="relative">
            <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center mr-4">
              {imageUrl ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: 64, height: 64, borderRadius: 32 }}
                />
              ) : (
                <Ionicons name="person" size={32} color="#666" />
              )}
            </View>
            <TouchableOpacity
              className="absolute -bottom-2 right-3 bg-orange-500 rounded-full p-2"
              onPress={() => setShowPhotoModal(true)}
            >
              <Ionicons name="camera" size={12} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-1">
            <View style={SettingsStyles.rowIconText}>
              {editingName ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TextInput
                    value={newName}
                    onChangeText={setNewName}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#ccc",
                      fontSize: 20,
                      color: "#222",
                      minWidth: 120,
                      flex: 1,
                      marginRight: 8,
                    }}
                    autoFocus
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setUserName(newName);
                      setEditingName(false);
                    }}
                    style={{ marginRight: 8 }}
                  >
                    <Ionicons name="checkmark" size={22} color="#4CAF50" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setEditingName(false);
                    }}
                  >
                    <Ionicons name="close" size={22} color="#EF476F" />
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <Text className="text-secondary text-xl font-semibold mr-2">
                    {userStats?.name ?? userName}
                  </Text>
                  <TouchableOpacity onPress={() => setEditingName(true)}>
                    <Ionicons name="pencil" size={16} color="#666" />
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View className="flex-row items-center mt-1">
              <Ionicons name="star" size={14} color="#666" />
              <Text className="text-secondary text-lg ml-1">
                Nv. {userStats?.level ?? 1}
              </Text>
            </View>

            <View className="mt-2">
              <Text className="text-secondary text-xs mb-1">
                {userStats?.level ?? 1} EXP
              </Text>
              <View className="w-full h-3 bg-gray-200 rounded-full">
                <View
                  className="h-3 bg-green-500 rounded-full"
                  style={{
                    width: `${experiencePercentage}%`,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Progress and Achievements Section */}
      <View className="flex gap-5 mb-10">
        <View>
          <Text className="text-secondary  font-medium mb-3">
            Progreso y Logros
          </Text>
          <View className="flex-row">
            <View className="flex-1 bg-white dark:bg-[#24262F] rounded-lg p-4 mr-2 items-center">
              <View className="flex-row items-center mb-2">
                <Ionicons name="flame" size={24} color="#FF6B35" />
                <Text className="text-secondary text-xl font-bold ml-2">
                  {userStats?.streak ?? 0}
                </Text>
              </View>
              <Text className="text-gray-600 text-sm text-center">
                Días de racha
              </Text>
            </View>

            <View className="flex-1 bg-white dark:bg-[#24262F] rounded-lg p-4 ml-2 items-center">
              <View className="flex-row items-center mb-2">
                <Ionicons name="trophy" size={24} color="#FFD700" />
                <Text className="text-secondary text-xl font-bold ml-2">
                  {userData.completedAchievements}/{userData.totalAchievements}
                </Text>
              </View>
              <Text className="text-gray-600 text-sm text-center">
                Logros completados
              </Text>
            </View>
          </View>
        </View>

        {/* App Preferences Section */}
        <View>
          <Text className="text-secondary font-medium mb-3">
            Preferencias de la aplicación
          </Text>

          <View className="bg-white dark:bg-[#24262F] rounded-lg">
            <TouchableOpacity style={SettingsStyles.rowItems}>
              <View style={SettingsStyles.rowIconText}>
                <Ionicons name="moon" size={20} color="#666" />
                <Text className="text-secondary ml-3">Modo oscuro</Text>
              </View>
              <Switch
                value={colorScheme === "dark"}
                onValueChange={() => {
                  Smartlook.instance.analytics.trackEvent("toggle_dark_mode");
                  toggleColorScheme();
                }}
                trackColor={{ false: "#E5E5E5", true: "#007AFF" }}
                thumbColor={colorScheme === "dark" ? "#fff" : "#fff"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={SettingsStyles.rowItems}>
              <View style={SettingsStyles.rowIconText}>
                <Ionicons name="megaphone-sharp" size={24} color="#666" />
                <Text className="text-secondary ml-3">Tallback</Text>
              </View>
              <Switch
                value={audioEnabled}
                onValueChange={(value) => {
                  Smartlook.instance.analytics.trackEvent("toggle_tallback");
                  setAudioEnabled(value);
                }}
                trackColor={{ false: "#E5E5E5", true: "#007AFF" }}
                thumbColor={audioEnabled ? "#fff" : "#fff"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text className="text-secondary  font-medium mb-3">
            Contenido y actividades
          </Text>

          <View className="bg-white dark:bg-[#24262F] rounded-lg">
            <TouchableOpacity
              style={SettingsStyles.rowItems}
              onPress={() => handleNavigation("achievements")}
            >
              <View style={SettingsStyles.rowIconText}>
                <Ionicons name="trophy" size={20} color="#666" />
                <Text className="text-secondary  ml-3">Mis logros</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text className="text-secondary  font-medium mb-3">
            Soporte y ayuda
          </Text>
          <View className="bg-white dark:bg-[#24262F] rounded-lg">
            <TouchableOpacity
              style={SettingsStyles.rowItems}
              onPress={() => handleNavigation("configuration")}
            >
              <View style={SettingsStyles.rowIconText}>
                <Ionicons name="settings" size={20} color="#666" />
                <Text className="text-secondary  ml-3">Configuración</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={SettingsStyles.rowItems}
              onPress={() => handleNavigation("faq")}
            >
              <View style={SettingsStyles.rowIconText}>
                <Ionicons name="help-circle" size={20} color="#666" />
                <Text className="text-secondary  ml-3">
                  Preguntas frecuentes
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={SettingsStyles.rowItems}
              onPress={() => handleNavigation("feedback")}
            >
              <View style={SettingsStyles.rowIconText}>
                <Ionicons name="chatbubbles" size={20} color="#666" />
                <Text className="text-secondary  ml-3">
                  Comentarios y sugerencias
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity
            className="bg-purple rounded-lg p-4 flex-row items-center justify-center"
            onPress={handleLogout}
          >
            <Ionicons name="log-out" size={20} color="white" />
            <Text className="text-white  font-medium ml-2">Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showPhotoModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPhotoModal(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor:
              colorScheme === "dark" ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.2)",
          }}
          onPress={() => setShowPhotoModal(false)}
        >
          <View
            style={{
              position: "absolute",
              top: "40%",
              left: "10%",
              width: "80%",
              backgroundColor: colorScheme === "dark" ? "#23242A" : "#fff",
              borderRadius: 16,
              padding: 24,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 12, right: 12 }}
              onPress={() => setShowPhotoModal(false)}
            >
              <Ionicons
                name="close"
                size={22}
                color={colorScheme === "dark" ? "#bbb" : "#888"}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colorScheme === "dark" ? "#fff" : "#222",
                marginBottom: 20,
              }}
            >
              Foto de perfil
            </Text>
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 12,
                alignItems: "center",
                borderRadius: 8,
                marginBottom: 8,
                backgroundColor: colorScheme === "dark" ? "#35363C" : "#F5F6FA",
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#6C7CFA" : "#6C7CFA",
                  fontSize: 16,
                }}
              >
                Abrir cámara
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 12,
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: colorScheme === "dark" ? "#35363C" : "#F5F6FA",
              }}
              onPress={async () => {
                setShowPhotoModal(false);
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 1,
                });
                if (
                  !result.canceled &&
                  result.assets &&
                  result.assets.length > 0
                ) {
                  setImageUrl(result.assets[0].uri);
                }
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#6C7CFA" : "#6C7CFA",
                  fontSize: 16,
                }}
              >
                Abrir galería
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}
