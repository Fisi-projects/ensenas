import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/ensenas-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>ensenas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b7df2', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  appName: {
    position: 'absolute',
    bottom: 60,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    fontFamily: 'System',
    textAlign: 'center',
  },
}); 