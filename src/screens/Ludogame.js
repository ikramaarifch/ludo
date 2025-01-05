import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LudoGame = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [positions, setPositions] = useState({
    red: 0,
    green: 0,
    yellow: 0,
    blue: 0,
  });

  // Predefined paths for each token (simplified)
  const paths = {
    red: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], // Add actual coordinates
    green: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    yellow: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    blue: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
  };

  // Handle dice roll
  const rollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newDiceValue);
  };

  // Move token
  const moveToken = (color) => {
    const currentPosition = positions[color];
    const path = paths[color];

    // Check if move is valid
    if (currentPosition + diceValue < path.length) {
      setPositions({
        ...positions,
        [color]: currentPosition + diceValue,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Ludo Board (replace with actual board design) */}
      <View style={styles.board}>
        <Text style={styles.boardText}>Ludo Board</Text>
      </View>

      {/* Dice Roll */}
      <View style={styles.diceSection}>
        <Text style={styles.diceText}>Dice: {diceValue}</Text>
        <TouchableOpacity style={styles.button} onPress={rollDice}>
          <Text style={styles.buttonText}>Roll Dice</Text>
        </TouchableOpacity>
      </View>

      {/* Token Controls */}
      <View style={styles.tokenControls}>
        {['red', 'green', 'yellow', 'blue'].map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.tokenButton, { backgroundColor: color }]}
            onPress={() => moveToken(color)}
          >
            <Text style={styles.buttonText}>{color.toUpperCase()} Token</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B164C',
    padding: 16,
  },
  board: {
    flex: 2,
    backgroundColor: '#BA68C8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  boardText: {
    fontSize: 24,
    color: '#fff',
  },
  diceSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#4B164C',
    fontWeight: 'bold',
  },
  tokenControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tokenButton: {
    padding: 10,
    borderRadius: 8,
  },
});

export default LudoGame;
