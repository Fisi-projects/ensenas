import { LayoutStyles } from '@/components/LayoutStyle';
import {  StyleSheet, Platform, View } from 'react-native';
import { Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={LayoutStyles.container}>
      <Text style={LayoutStyles.Title__text}>Lecciones</Text>
    </View>
  );
}

const styles=  StyleSheet.create({
  HomeScreen__Container:{
    flex: 1,
    backgroundColor: '#3d3d3d',
    width: '100%',
    height: '100%',
    padding: 20,
  }
})