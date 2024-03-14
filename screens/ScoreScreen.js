import React, { useEffect, useContext, useState, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { generalStyles } from "../styles/generalStyles";
import { scoreStyles } from "../styles/scoreStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { context } from "../components/Context";

export default function ScoreScreen({ navigation }) {
  const { totalSum, setTotalSum } = useContext(context);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const showScores = navigation.addListener("focus", () => {
      getScoreboard();
    });
    return showScores;
  }, [navigation, scores]);

  const getScoreboard = async () => {
    const scoreValues = scores.map((score) => score.score);
    console.log(scoreValues);
    try {
      const userScores = await AsyncStorage.getItem("scores");
      const parsedScores = JSON.parse(userScores);
      console.log(parsedScores.score);

      if (parsedScores.name === null) {
        return;
      } else if (scoreValues.includes(parsedScores.score)) {
        return;
      } else if (parsedScores.name !== null) {
        setScores((scores) => [...scores, parsedScores]);
      }
    } catch (error) {
      console.log("Error getting scoreboard", error);
    }
  };

  const clearScores = () => {
    setScores([]);
  };

  return (
    <View style={generalStyles.scaffold}>
      <Header text={"Scoreboard"} />
      <View style={scoreStyles.scoreboard}>
        <Icon name="th-list" size={40} color={"#4f1699"} />
        <Text style={scoreStyles.header}>Top scores</Text>
        <ScrollView>
          {scores
            // Sort the scores array in descending order based on score
            .sort((a, b) => b.score - a.score)
            // Map over the sorted array to render the scores
            .map((score, index) => (
              <View key={index} style={scoreStyles.scores}>
                <Text style={scoreStyles.text}>{index + 1 + "."}</Text>
                <Text style={scoreStyles.text}>Player: {score.name}</Text>
                <Text style={scoreStyles.text}>{score.date} </Text>
                <Text style={{ ...scoreStyles.text, color: "#4f1699" }}>
                  {score.score}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
      <Button
        children="Clear scores"
        mode="contained"
        buttonColor="#4f1699"
        onPress={clearScores}
      />
      <Footer text={"Thanks for playing!"} />
    </View>
  );
}
