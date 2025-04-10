import { LayoutStyles } from "@/components/LayoutStyle";
import { Text, View } from "react-native";

export default function Dictionary() {
    return (
        <View style={LayoutStyles.container}>
           <Text style={LayoutStyles.Title__text}> Diccionario</Text> 
        </View>
    )
}