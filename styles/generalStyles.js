import { StyleSheet } from "react-native";



export const generalStyles = StyleSheet.create({
  buttons: {
    fontFamily: "Oswald_400Regular",
  },
  footer: {
    backgroundColor: "#4f1699",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  header: {
    backgroundColor: "#4f1699",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  navi: {
    color: "#4f1699",
    backgroundColor: "#4f1699",
  },
  scaffold: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d8d4dd",
  },
  text: {
    textAlign: "center",
    padding: 10,
    fontFamily: "Oswald_400Regular",
    fontSize: 18,
  },
  stylizedText: {
    fontSize: 20,
    color: "#4f1699",
    padding: 10,
  },
  footerText: {
    color: "white",
    fontFamily: "Oswald_500Medium",
    letterSpacing: 1.5,
  },
});
