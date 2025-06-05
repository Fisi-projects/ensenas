import { StyleSheet } from "react-native"

export const SettingsStyles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "500", // font-medium
    marginBottom: 12, // mb-3
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  rowItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  rowIconText: {
    flexDirection: "row",
    alignItems: "center",
  },
})