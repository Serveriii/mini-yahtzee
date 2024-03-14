import React, { useState, useContext } from "react";
import { context } from "./components/Context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "./screens/HomeScreen";
import GameScreen2 from "./screens/GameScreen2";
import ScoreScreen from "./screens/ScoreScreen";
import { dices } from "./data/Dices";

const Stack = createBottomTabNavigator();

export default function App() {
  const [pointState, setPointState] = useState(
    new Array(dices.MAX_SPOT).fill(false)
  );
  const [throwsLeft, setThrowsLeft] = useState(dices.NBR_OF_THROWS);
  const [totalSum, setTotalSum] = useState(0);
  let board = [];
  const providerValue = {
    pointState,
    setPointState,
    throwsLeft,
    setThrowsLeft,
    board,
    totalSum,
    setTotalSum,
  };

  return (
    <PaperProvider>
      <context.Provider value={providerValue}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#4f1699",
              tabBarInactiveTintColor: "gray",
              tabBarIconStyle: { size: 30 },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ size, color }) => {
                  return <Icon name="home" size={size} color={color} />;
                },
              }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen2}
              options={{
                tabBarIcon: ({ size, color }) => {
                  return <Icon name="dice" size={size} color={color} />;
                },
              }}
            />
            <Stack.Screen
              name="Score"
              component={ScoreScreen}
              options={{
                tabBarIcon: ({ size, color }) => {
                  return <Icon name="th-list" size={size} color={color} />;
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </context.Provider>
    </PaperProvider>
  );
}
