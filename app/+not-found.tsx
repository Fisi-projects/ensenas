import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container} className="bg-primary" >
        <Text className='text-secondary'>Pagina No encontrada</Text>
        <Text className='text-secondary'>Not found 404</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
