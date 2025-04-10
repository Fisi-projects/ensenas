import { StyleSheet } from "react-native";

export const LayoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3d3d3d",
        width: "100%",
        height: "100%",
        padding: 20,
    },
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    Title__text:{
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "bold",
    },
    Title__text__medium:{
        color: "#808080",
        fontSize: 20,
        fontWeight: "bold",
    },
    Title__text__small:{
        color: "#808080",
        fontSize: 16,
        fontWeight: "bold",
    },
})