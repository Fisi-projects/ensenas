import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, useColorScheme } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const lessons = [
 {
   title: 'Saludos Basicos',
   subtitle: 'saludos simples y utiles dia a dia',
 },
 {
   title: 'Estados de animo',
   subtitle: 'emociones',
 },
 {
   title: 'Presentacion Personal',
   subtitle: 'Cuentanos algo acerca de ti',
 },
 {
   title: 'Pronombres',
   subtitle: 'Otras formas de llamar a una persona',
 },
 {
   title: 'Procedencia',
   subtitle: 'Lugares de donde venimos',
 },
];

export default function ModuleLessonsScreen() {
 const router = useRouter();
 const { title, subtitle } = useLocalSearchParams();
 const colorScheme = useColorScheme();

 // 
 const isDark = colorScheme === 'dark';
 const headerBg = { backgroundColor: '#6C7CFA' };
 const pageBg = { backgroundColor: isDark ? '#181A20' : '#F5F6FA' };
 const cardBg = { backgroundColor: isDark ? '#23242A' : '#fff' };
 const cardShadow = isDark
   ? { shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8, elevation: 2 }
   : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 };
 const mainText = { color: isDark ? '#fff' : '#222' };
 const secondaryText = { color: isDark ? '#bbb' : '#888' };
 const playBtnBg = { backgroundColor: '#E6EFFA' };
 const playIcon = { color: 'gray' };
 const iconBg = { backgroundColor: isDark ? '#444' : '#F0F0F0' };

 return (
   <SafeAreaView style={[{ flex: 1 }, pageBg]}>
     <View style={[headerBg, { padding: 24, paddingTop: 48 }]}>
       <TouchableOpacity style={{ position: 'absolute', left: 24, top: 20, zIndex: 2 }} onPress={() => router.back()}>
         <Text style={{ fontSize: 28, color: '#fff' }}>{'←'}</Text>
       </TouchableOpacity>
       <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 30, textAlign: 'center' }}>{title || 'Lecciones'}</Text>
       <Text style={{ color: '#fff', fontSize: 16, marginTop: 8, textAlign: 'center', marginBottom: 20 }}>{subtitle || ''}</Text>
     </View>
     <ScrollView style={{ flex: 1, marginTop: 16 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
       {lessons.map((lesson, idx) => (
         <View
           key={idx}
           style={[
             cardBg,
             cardShadow,
             { borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, marginBottom: 16 },
           ]}
         >
           <View style={[{ width: 40, height: 40, borderRadius: 8, marginRight: 16, justifyContent: 'center', alignItems: 'center' }, iconBg]} />
           <View style={{ flex: 1, justifyContent: 'center' }}>
             <Text style={[{ fontWeight: 'bold', fontSize: 16 }, mainText]}>{lesson.title}</Text>
             <Text style={[{ fontSize: 13 }, secondaryText]}>{lesson.subtitle}</Text>
           </View>
           <View style={{ justifyContent: 'center', alignItems: 'center', height: 40 }}>
             <TouchableOpacity style={[playBtnBg, { borderRadius: 50, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }]}> 
               <Text style={[{ fontSize: 22 }, playIcon]}>▶</Text>
             </TouchableOpacity>
           </View>
         </View>
       ))}
     </ScrollView>
   </SafeAreaView>
 );
} 