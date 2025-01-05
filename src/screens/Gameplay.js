import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dice from '../components/Dice';
import Token from '../components/Token';
import Board from '../components/Board';
import { ludoPath } from '../utils/Paths';
import Boardone from '../components/Boardone';




const GameScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleRoll = (diceNumber) => {
    const nextStep = currentStep + diceNumber;
    if (nextStep < ludoPath.length) {
      setCurrentStep(nextStep);
    } else {
      alert('Invalid move!');
    }
  };

  return (
    <View style={styles.container}>
      <Board />
      <Token currentStep={ludoPath[currentStep]} />
      <Dice onRoll={handleRoll} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default GameScreen;
