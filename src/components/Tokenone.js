import React from "react";
import { View, StyleSheet } from "react-native";

const Tokenone = () => {
  return <View style={styles.token} />;
};

const styles = StyleSheet.create({
  token: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 15,
  },
});

export default Tokenone;