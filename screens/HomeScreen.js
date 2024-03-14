import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { generalStyles } from "../styles/generalStyles";
import { homeStyles } from "../styles/homeStyles";
import {
  useFonts,
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { dices } from "../data/Dices";

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [isName, setIsName] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(null);
  let [fontsLoaded] = useFonts({
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });
  // Date is updated every second and saved to storage on screen load
  useEffect(() => {
    const updateDate = () => {
      let currentDate = new Date().toLocaleString();
      setDate(currentDate);
    };

    const interval = setInterval(updateDate, 1000);

    let date = new Date().toLocaleString();
    (async () => {
      try {
        await AsyncStorage.setItem("date", date);
      } catch (error) {
        console.log(error);
      }
    })();
    setLoading(false);
    return () => clearInterval(interval);
  }, [date]);

  // Name is saved to storage
  const buttonHandler = async () => {
    try {
      await AsyncStorage.setItem("name", name);
      setIsName(true);
    } catch (error) {
      console.log("Error saving name");
    }
  };

  if (loading || !fontsLoaded) {
    return (
      <View
        style={[generalStyles.container, { justifyContent: "space-between" }]}
      >
        <Header text={"Welcome!"} />
        <ActivityIndicator animating={true} color="white" size={"large"} />
        <Footer text={"Author: Severi Jokelainen"} />
      </View>
    );
  }
  // Return name input form if name is not set
  if (!isName) {
    return (
      <View style={generalStyles.scaffold}>
        <Header text={"Welcome! The time is " + date} />
        <View style={homeStyles.container}>
          <Text style={generalStyles.text}>Please enter player name:</Text>
          <TextInput
            style={homeStyles.input}
            maxLength={20}
            mode="outlined"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Button
            children="OK"
            mode="contained"
            buttonColor="#4f1699"
            onPress={buttonHandler}
          />
        </View>
        <Footer text={"Author: Severi Jokelainen"} />
      </View>
    );
  }
  // Return game instructions if name is set
  return (
    <View style={generalStyles.scaffold}>
      <Header text={"Rules of the game"} />
      <View style={homeStyles.container}>
        <Icon name="info-circle" size={60} color={"#4f1699"} />
        <Text style={generalStyles.text}>
          THE GAME: Upper section of the classic Yahtzee dice game. You have{" "}
          {dices.NBR_OF_DICES} dices and for the every dice you have{" "}
          {dices.NBR_OF_THROWS}
          throws. After each throw you can keep dices in order to get same dice
          spot counts as many as possible. In the end of the turn you must
          select your points from {dices.MIN_SPOT} to {dices.MAX_SPOT}. Game
          ends when all points have been selected. The order for selecting those
          is free. POINTS: After each turn game calculates the sum for the dices
          you selected. Only the dices having the same spot count are
          calculated. Inside the game you can not select same points from
          {dices.MIN_SPOT} to {dices.MAX_SPOT} again.{" "}
        </Text>
        <Text style={generalStyles.text}>
          GOAL: To get points as much as possible. {dices.BONUS_POINTS_LIMIT}{" "}
          points is the limit of getting bonus which gives you{" "}
          {dices.BONUS_POINTS} points more.
        </Text>
        <Text style={generalStyles.stylizedText}>Good luck {name}</Text>
        <Button
          children="Start game"
          mode="contained"
          onPress={() => navigation.navigate("Game")}
        />
      </View>
      <Footer text={"Author: Severi Jokelainen"} />
    </View>
  );
}
