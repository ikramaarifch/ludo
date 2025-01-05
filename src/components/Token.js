import React, { useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Token = ({ currentStep }) => {
  const [position] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

  React.useEffect(() => {
    const { x, y } = currentStep;
    Animated.timing(position, {
      toValue: { x, y },
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  return (
    <Animated.View
      style={[
        styles.token,
        { transform: [{ translateX: position.x }, { translateY: position.y }] },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  token: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
  },
});

export default Token;
