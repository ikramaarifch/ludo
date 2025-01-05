import React, { useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Text } from "react-native";

import { ludoPath } from "../utils/Paths";
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import Tokenone from "./Tokenone";

const Boardone = () => {
    const [tokenPosition, setTokenPosition] = useState(0);
    const position = new Animated.ValueXY(ludoPath[0]);
  
    const moveToken = () => {
      const nextPosition = tokenPosition + 1;
      if (nextPosition < ludoPath.length) {
        Animated.timing(position, {
          toValue: ludoPath[nextPosition],
          duration: 300,
          useNativeDriver: false,
        }).start();
        setTokenPosition(nextPosition);
      }
    };
  
    return (
      <View style={styles.boardContainer}>
        <View style={styles.grid}>
          {Array.from({ length: 15 }).map((_, row) => (
            <View style={styles.row} key={row}>
              {Array.from({ length: 15 }).map((_, col) => (
                <View
                  key={col}
                  style={[
                    styles.cell,
                    row === 6 && col >= 0 && col < 6
                      ? styles.greenHome
                      : row === 6 && col >= 9
                      ? styles.yellowHome
                      : col === 6 && row >= 9
                      ? styles.redHome
                      : col === 6 && row >= 0 && row < 6
                      ? styles.blueHome
                      : {},
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
        <Animated.View style={[styles.token, position.getLayout()]}>
          <Tokenone />
        </Animated.View>
        <TouchableOpacity style={styles.button} onPress={moveToken}>
          <Text style={styles.buttonText}>Move Token</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    boardContainer: {
      width: 300,
      height: 300,
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#000",
      position: "relative",
    },
    grid: {
      flex: 1,
      flexDirection: "column",
    },
    row: {
      flex: 1,
      flexDirection: "row",
    },
    cell: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: "#000",
    },
    greenHome: {
      backgroundColor: "#4CAF50",
    },
    yellowHome: {
      backgroundColor: "#FFEB3B",
    },
    redHome: {
      backgroundColor: "#F44336",
    },
    blueHome: {
      backgroundColor: "#2196F3",
    },
    token: {
      position: "absolute",
      width: 20,
      height: 20,
      backgroundColor: "red",
      borderRadius: 10,
    },
    button: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#51234E",
      borderRadius: 5,
    },
    buttonText: {
      color: "#FFF",
      textAlign: "center",
    },
  });
  
  export default Boardone;