import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from '../../assets/styles/HomeScreen.styles';

interface LearningModule {
  id: string;
  title: string;
  subtitle: string;
  badges: string[];
  isBookmarked: boolean;
}

const learningModules: LearningModule[] = [
  {
    id: '1',
    title: 'Números y operaciones',
    subtitle: 'Aritmética básica y otros conceptos',
    badges: ['Badge', 'Badge'],
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Alfabeto completo',
    subtitle: 'Letras y vocales y otros conceptos',
    badges: ['Badge', 'Badge'],
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'Saludos y Presentaciones',
    subtitle: 'Descripción breve',
    badges: ['Badge', 'Badge'],
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Familias y Relaciones',
    subtitle: 'Parentezcos y lazos',
    badges: ['Badge', 'Badge'],
    isBookmarked: false,
  },
];

export default function HomeScreen() {
  const handleModulePress = (moduleId: string) => {
    console.log('Módulo seleccionado:', moduleId);
  };

  const handleBookmarkPress = (moduleId: string) => {
    console.log('Bookmark toggled for:', moduleId);
  };

  const renderLearningModule = (module: LearningModule) => (
    <TouchableOpacity
      key={module.id}
      style={styles.moduleCard}
      onPress={() => handleModulePress(module.id)}
    >
      <View style={styles.illustrationSection}>
        <Image
          source={require('../../assets/images/book.png')} // reemplaza con tus imágenes
          style={styles.illustrationImage}
        />
      </View>

      <View style={styles.contentSection} className='bg-third'>
        <View style={styles.moduleInfo}>
          <View style={styles.badgesContainer}>
            {module.badges.map((badge, index) => (
              <View
                key={index}
                style={[
                  styles.badge,
                  index === 0 ? styles.badgeLight : styles.badgeDark
                ]}
              >
                <Text style={index === 0 ? styles.badgeLightText : styles.badgeDarkText}>
                  {badge}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.moduleTitle} className='text-secondary'>{module.title}</Text>
          <Text style={styles.moduleSubtitle} className='text-fourth'>{module.subtitle}</Text>
        </View>

        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => handleBookmarkPress(module.id)}
        >
          <View style={styles.bookmarkIcon}>
            <Text style={styles.bookmarkText}>📖</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} className='bg-primary'>
      <View style={styles.header} className='bg-third'>
        <View style={styles.levelContainer}>
          <Text style={styles.levelIcon}>💎</Text>
          <Text style={styles.levelText} className='text-secondary'>Nv. 30</Text>
        </View>
        <View style={styles.streakContainer}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>7</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle} className='text-secondary'>APRENDIZAJE</Text>
        <View style={styles.modulesContainer}>
          {learningModules.map(renderLearningModule)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
