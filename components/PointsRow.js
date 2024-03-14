import React, { useEffect, useState, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { context } from "./Context";
import { styles } from "../styles/gameStyles";
import { generalStyles } from "../styles/generalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dices } from "../data/Dices";

export default function PointsRow(props) {
  const [counts, setCounts] = useState({});
  const [bonus, setBonus] = useState(dices.BONUS_POINTS_LIMIT);
  const { totalSum, setTotalSum } = useContext(context);
  const { pointState, setPointState } = useContext(context);
  const { throwsLeft, setThrowsLeft } = useContext(context);

  useEffect(() => {
    let numbers = props.board.map((item) => Number(item.match(/\d+/)[0]));

    let allNumbers = Array.from({ length: 6 }, (_, i) => i + 1);

    const countsObject = allNumbers.reduce((acc, num) => {
      acc[num] = numbers.filter((n) => n === num).length;
      return acc;
    }, {});

    for (let i = 1; i <= 6; i++) {
      if (countsObject[i]) {
        let sum = countsObject[i] * i;
        countsObject[i] = sum;
      }
    }
    setCounts(countsObject);
  }, [props]);

  useEffect(() => {
    if (pointState.every((val) => val === false)) {
      setBonus(dices.BONUS_POINTS_LIMIT);
    }
  }, [pointState]);

  let counters = Object.entries(counts).map(([number, count]) => (
    <Text key={number}>{`     ${count}   `}</Text>
  ));

  const selectPoints = (i, counts) => {
    if (pointState[i] === true) {
      alert("You have already selected this point.");
    }
    if (Object.values(counts)[i] === 0) {
      alert(
        "You have to land this dice at least once before you can select this point."
      );
    } else if (pointState[i] === false) {
      let newPointState = [...pointState];
      newPointState[i] = true;
      let sum = Object.values(counts)[i];
      let newTotalSum = totalSum + sum;
      setBonus(bonus - sum);
      if (bonus - sum <= 0) {
        newTotalSum = newTotalSum + dices.BONUS_POINTS;
        setBonus(dices.BONUS_POINTS_LIMIT);
      }
      setTotalSum(newTotalSum);
      setPointState(newPointState);

      props.throwDice();
      setThrowsLeft(dices.NBR_OF_THROWS - 1);
    }
  };

  const pointColor = (i, color) => {
    if (pointState[i] === true) {
      return "purple";
    }
    if (Object.values(counts)[i] === 0) {
      return color;
    } else {
      return "green";
    }
  };

  const points = [];
  for (let i = 0; i < dices.MAX_SPOT; i++) {
    points.push(
      <Pressable key={"row" + i} onPress={() => selectPoints(i, counts)}>
        <MaterialCommunityIcons
          name={"numeric-" + (i + 1) + "-box"}
          key={"row" + i}
          size={40}
          color={pointColor(i)}
          state={pointState[i]}
        ></MaterialCommunityIcons>
      </Pressable>
    );
  }

  if (pointState.every((val) => val === true)) {
    return (
      <View style={styles.container}>
        <Text>Game over</Text>
        <Text>Total points: {totalSum}</Text>
        <View style={styles.row}>{counters}</View>
        <View style={styles.row}>{points}</View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={generalStyles.text}>Total points: {totalSum}</Text>
        <Text style={generalStyles.text}>
          You are {bonus} points away from a bonus!
        </Text>
        <View style={styles.row}>{counters}</View>
        <View style={styles.row}>{points}</View>
      </View>
    );
  }
}
