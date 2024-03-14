import React, { useState, useEffect } from "react";

import { Text, View, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;

export default function PekkaExample() {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("");
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable key={"row" + i} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50}
          color={getDiceColor(i)}
        ></MaterialCommunityIcons>
      </Pressable>
    );
  }

  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus("Game has not started");
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
    }
  }, [nbrOfThrowsLeft]);

  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "orange";
    } else {
      return selectedDices[i] ? "black" : "steelblue";
    }
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  };

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = "dice-" + randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
  };

  
  const checkWinner = () => {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
      setStatus("You won");
    } else if (
      board.every((val, i, arr) => val === arr[0]) &&
      nbrOfThrowsLeft === 0
    ) {
      setStatus("You won, game over");
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    } else if (nbrOfThrowsLeft === 0) {
      setStatus("Game over");
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    } else {
      setStatus("Keep on throwing");
    }
  };

  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button} onPress={() => throwDices()}>
        <Text style={styles.buttonText}>Throw dices</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: "skyblue",
    flexDirection: "row",
  },
  footer: {
    marginTop: 20,
    backgroundColor: "skyblue",
    flexDirection: "row",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    fontSize: 23,
    textAlign: "center",
    margin: 10,
  },
  author: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    margin: 10,
  },
  gameboard: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gameinfo: {
    backgroundColor: "#fff",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    marginTop: 10,
  },
  row: {
    marginTop: 20,
    padding: 10,
  },
  flex: {
    flexDirection: "row",
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#2B2B52",
    fontSize: 20,
  },
});
