import { StyleSheet } from "react-native";

export const scoreStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  header: {
    fontSize: 30,
    paddingBottom: 20,
    color: "#4f1699",
    fontFamily: "Oswald_400Regular",
  },
  scoreboard: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "flex-start",

    alignItems: "center",
  },
  scores: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Oswald_400Regular",
    fontSize: 20,
    padding: 10,
  },
});
