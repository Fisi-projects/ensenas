import { LayoutStyles } from "@/components/LayoutStyle";
import { Text, View } from "react-native";

export default function Dictionary() {
    return (
        <View style={LayoutStyles.container} className="bg-primary">
           <Text style={LayoutStyles.Title__text} className="text-secondary"> Diccionario</Text> 
        </View>
    )
}