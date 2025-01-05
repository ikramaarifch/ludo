import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

const Diceone = () => {
  const [diceValue, setDiceValue] = useState(1);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rollDice = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newDiceValue);
    });
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View>
      <TouchableOpacity onPress={rollDice}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Text style={{ fontSize: 50 }}>{diceValue}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Diceone;
