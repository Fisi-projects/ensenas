import { LayoutStyles } from '@/components/LayoutStyle';
import { StyleSheet, Text, View } from 'react-native';



export default function TabTwoScreen() {
  return (
    <View style = {LayoutStyles.container} className='bg-primary'>
      <Text style={LayoutStyles.Title__text} className='text-secondary'>Traductor</Text>
    </View>
  );
}
