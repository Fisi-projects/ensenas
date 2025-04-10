import { LayoutStyles } from "@/components/LayoutStyle";
import { Text, View } from "react-native";

export default function Settings (){
    return (
        <View style={LayoutStyles.container}>
            <Text style={LayoutStyles.Title__text} > Settings</Text>
        </View>
    )
}