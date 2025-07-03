import React, { useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../../../assets/styles/HomeScreen.styles";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";
import { getAuth } from "@react-native-firebase/auth";
import Constants from "expo-constants";

interface LearningModule {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  badges: string[];
  isBookmarked: boolean;
}
interface Chapter {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badges: string[];
  isBookmarked: boolean;
}

export default function HomeScreen() {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const router = useRouter();
  const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, "chapters"));
        const querySnapshot = await getDocs(q);
        const fetchedChapters: Chapter[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          //console.log('Fetched chapter:', doc.id, data);
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            imageUrl: data.imageUrl || "",
            badges: data.badges || ["badge", "badge"],
            isBookmarked: data.isBookmarked ?? false,
          };
        });
        setChapters(fetchedChapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => {
    const createUserIfNotExists = async () => {
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
        const getUserRes = await axios.get(
          `${API_BASE_URL}user/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (getUserRes.data) {
          console.log("User already exists:", getUserRes.data);
          return; // ✅ User exists, do not create
        }

        // 2. Create the user
        console.log("User does not exist, creating...");
        const createUserRes = await axios.post(
          `${API_BASE_URL}user`,
          {}, // if your POST body is empty
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("User created:", createUserRes.data);
      } catch (err) {
        console.error("Error during user check/creation:", err);
      }
    };

    createUserIfNotExists();
  }, []);

  const handleModulePress = (moduleId: string) => {
    const module = chapters.find((m) => m.id === moduleId);
    if (module) {
      router.push({
        pathname: "/home/lessons/[id]",
        params: {
          id: module.id,
          title: module.title,
          subtitle: module.description,
        },
      });
    }
  };

  const handleBookmarkPress = (moduleId: string) => {
    console.log("Bookmark toggled for:", moduleId);
  };

  const renderLearningModule = (module: LearningModule) => (
    <TouchableOpacity
      key={module.id}
      style={styles.moduleCard}
      onPress={() => handleModulePress(module.id)}
    >
      <View style={styles.illustrationSection}>
        <Image
          source={
            module.imageUrl
              ? { uri: module.imageUrl }
              : require("../../../assets/images/book.png")
          }
          style={styles.illustrationImage}
        />
      </View>

      <View style={styles.contentSection} className="bg-third">
        <View style={styles.moduleInfo}>
          <View style={styles.badgesContainer}>
            {module.badges.map((badge, index) => (
              <View
                key={index}
                style={[
                  styles.badge,
                  index === 0 ? styles.badgeLight : styles.badgeDark,
                ]}
              >
                <Text
                  style={
                    index === 0 ? styles.badgeLightText : styles.badgeDarkText
                  }
                >
                  {badge}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.moduleTitle} className="text-secondary">
            {module.title}
          </Text>
          <Text style={styles.moduleSubtitle} className="text-fourth">
            {module.description}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => handleModulePress(module.id)}
        //onPress={() => handleBookmarkPress(module.id)}
        >
          <View style={styles.bookmarkIcon}>
            <Text style={styles.bookmarkText}>▶</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} className="bg-primary">
      <View style={styles.header} className="bg-third">
        <View style={styles.levelContainer}>
          <Text style={styles.levelIcon}>💎</Text>
          <Text style={styles.levelText} className="text-secondary">
            Nv. 1
          </Text>
        </View>
        <View style={styles.streakContainer}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>0</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle} className="text-secondary">
          APRENDIZAJE
        </Text>
        <View style={styles.modulesContainer}>
          {chapters.map(renderLearningModule)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
