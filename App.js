import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions,Image } from 'react-native';

const { width } = Dimensions.get('window');
const cellSize = width / 10; // Adjust the board cell size dynamically
const tokenSize = cellSize * 0.6;

// Define the Ludo path
const ludoPath = [
  { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 },
  { x: 4, y: 4 }, { x: 4, y: 3 }, { x: 4, y: 2 }, { x: 4, y: 1 },
  { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 },
  { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 7, y: 4 },
  { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 },
  { x: 8, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 6 }, { x: 6, y: 7 },
  { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 },
  { x: 4, y: 8 }, { x: 4, y: 7 }, { x: 4, y: 6 }, { x: 3, y: 6 },
  { x: 2, y: 6 }, { x: 1, y: 6 }, { x: 0, y: 6 }, { x: 0, y: 5 },
];

const LudoGame = () => {
  const [tokenPosition, setTokenPosition] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Move token with animation
  const moveToken = (steps) => {
    const newPosition = Math.min(tokenPosition + steps, ludoPath.length - 1);
    Animated.timing(animatedValue, {
      toValue: newPosition,
      duration: steps * 500, // Adjust duration based on steps
      useNativeDriver: false,
    }).start(() => setTokenPosition(newPosition));
  };

  // Handle dice roll
  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    moveToken(value);
  };

  // Interpolated animation for X and Y positions
  const animatedX = animatedValue.interpolate({
    inputRange: ludoPath.map((_, index) => index),
    outputRange: ludoPath.map(pos => pos.x * cellSize),
  });

  const animatedY = animatedValue.interpolate({
    inputRange: ludoPath.map((_, index) => index),
    outputRange: ludoPath.map(pos => pos.y * cellSize),
  });

  return (
    <View style={styles.container}>
      
           {/* Header Section */}
           <View style={styles.header}>
             <Text style={styles.rank}>1st</Text>
             <View style={styles.rankDetails}>
               <Text style={styles.rankTitle}>Rank 1</Text>
               <Text style={styles.rankPoints}>1000 Gold</Text>
             </View>
            <Image
              style={styles.profileImage}
              source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual image URL
            />
            <Text style={styles.profileName}>Nadeem Ali</Text>
          </View>
      {/* Ludo Board */}
      <View style={styles.board}>
        {/* Add colored zones */}
        <View style={[styles.zone, styles.redZone]} />
        <View style={[styles.zone, styles.greenZone]} />
        <View style={[styles.zone, styles.yellowZone]} />
        <View style={[styles.zone, styles.blueZone]} />

        {/* Render Ludo path cells */}
        {ludoPath.map((cell, index) => (
          <View
            key={index}
            style={[
              styles.cell,
              {
                top: cell.y * cellSize,
                left: cell.x * cellSize,
              },
            ]}
          />
        ))}

        {/* Token */}
        <Animated.View
          style={[
            styles.token,
            {
              backgroundColor: 'blue', // Token color
              transform: [
                { translateX: animatedX },
                { translateY: animatedY },
              ],
            },
          ]}
        />
      </View>

      {/* Dice and Controls */}
      <View style={styles.controls}>
        <Text style={styles.diceText}>{diceValue ? `Dice: ${diceValue}` : 'Roll the dice!'}</Text>
        <Button title="Roll Dice" onPress={rollDice} />
      </View>
       {/* Footer Section */}
           <View style={styles.footer}>
             <View style={styles.player}>
              <Image
                style={styles.playerImage}
                source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual image URL
              />
              <Text style={styles.playerName}>Kiran756</Text>
            </View>
            <View style={styles.footerButtons}>
              <Text style={styles.footerButton}>Emoji</Text>
              <Text style={styles.footerButton}>Message</Text>
            </View>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B164C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    width: cellSize * 10,
    height: cellSize * 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    position: 'relative',
    
  },
  cell: {
    width: cellSize,
    height: cellSize,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  token: {
    width: tokenSize,
    height: tokenSize,
    borderRadius: tokenSize / 2,
    position: 'absolute',
  },
  controls: {
    marginTop: 20,
    alignItems: 'center',
  },
  diceText: {
    fontSize: 18,
    marginBottom: 10,
  },
  zone: {
    position: 'absolute',
    width: cellSize * 4,
    height: cellSize * 4,
    opacity: 0.8,
  },
  redZone: {
    backgroundColor: 'red',
    top: 0,
    left: 0,
  },
  greenZone: {
    backgroundColor: 'green',
    top: 0,
    right: 0,
  },
  yellowZone: {
    backgroundColor: 'yellow',
    bottom: 0,
    left: 0,
  },
  blueZone: {
    backgroundColor: 'blue',
    bottom: 0,
    right: 0,
  },
    footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  playerName: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  footerButtons: {
    flexDirection: 'row',
  },
  footerButton: {
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#BA68C8',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#4B164C',
  //   padding: 16,
  //   width:'100%'
  // },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  rank: {
    fontSize: 32,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  rankDetails: {
    flex: 1,
    marginLeft: 10,
  },
  rankTitle: {
    fontSize: 18,
    color: '#FFD700',
  },
  rankPoints: {
    fontSize: 14,
    color: '#fff',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    color: '#fff',
  },
});

export default LudoGame;


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Animated,
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import GameScreen from './src/screens/Gameplay';
// import LudoGame from './src/screens/Ludogame';
// // import { styles } from './src/screens/Mystyles';
// import appDimensions from './src/components/Dimension';
// import Icon from 'react-native-vector-icons/Entypo';
// import Icon1 from 'react-native-vector-icons/AntDesign';
// import Boardone from './src/components/Boardone';

// const Stack = createStackNavigator();

// const App = () => {
//   const [diceValue, setDiceValue] = useState(1);
//   const [tokenPositions, setTokenPositions] = useState({
//     green: 0,
//     red: 0,
//     yellow: 0,
//     blue: 0,
//   });
//   const diceAnimation = new Animated.Value(0);

//   // Roll Dice Function
//   const rollDice = () => {
//     Animated.sequence([
//       Animated.timing(diceAnimation, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//       Animated.timing(diceAnimation, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       const newDiceValue = Math.ceil(Math.random() * 6);
//       setDiceValue(newDiceValue);
//     });
//   };

//   // Move Token Function
//   const moveToken = (color) => {
//     setTokenPositions((prev) => ({
//       ...prev,
//       [color]: prev[color] + diceValue,
//     }));
//   };
//   return (
//     // <NavigationContainer>
//     //   <Stack.Navigator>
//     //     <Stack.Screen name="Game" component={GameScreen} />
//     //   </Stack.Navigator>
//     // </NavigationContainer>
//     <View style={styles.container}>
//           {/* Header Section */}
//           <View style={styles.header}>
//             <Text style={styles.rank}>1st</Text>
//             <View style={styles.rankDetails}>
//               <Text style={styles.rankTitle}>Rank 1</Text>
//               <Text style={styles.rankPoints}>1000 Gold</Text>
//             </View>
//             <Image
//               style={styles.profileImage}
//               source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual image URL
//             />
//             <Text style={styles.profileName}>Nadeem Ali</Text>
//           </View>

//     <View style={styles.wrapper}>
//       <View style={styles.container1}>
//         {/* Container1 */}
//         <View style={styles.playContainer}>
//           <View style={[styles.startArea, styles.green]}>
//             <View style={[styles.subStartArea, styles.white]}>
//               <View style={[styles.subStartArea_View, styles.green]} />
//               <View style={[styles.subStartArea_View, styles.green]} />
//               <View style={[styles.subStartArea_View, styles.green]} />
//               <View style={[styles.subStartArea_View, styles.green]} />
//             </View>
//           </View>
//           <View style={styles.verticalPath}>
//             {/* 1st line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={styles.subVerticalPath}></View>
//             <View style={styles.subVerticalPath}></View>
//             {/* 2nd line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={[styles.subVerticalPath, styles.yellow]}></View>
//             <View
//               style={[styles.subVerticalPath, styles.yellow, styles.centered]}
//             >
//               <Icon name="circle" size={appDimensions.cellWidth} color="#fff" />
//             </View>
//             {/* 3rd line */}
//             <View style={[styles.subVerticalPath, styles.centered]}>
//               <Icon1 name="star" size={appDimensions.cellWidth} color="#f6c700" />
//             </View>
//             <View style={[styles.subVerticalPath, styles.yellow]}></View>
//             <View style={styles.subVerticalPath}></View>
//             {/* 4th line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={[styles.subVerticalPath, styles.yellow]}></View>
//             <View style={styles.subVerticalPath}></View>
//             {/* 5th line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={[styles.subVerticalPath, styles.yellow]}></View>
//             <View style={styles.subVerticalPath}></View>
//             {/* 6th line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={[styles.subVerticalPath, styles.yellow]}></View>
//             <View style={styles.subVerticalPath}></View>
//           </View>
//           <View style={[styles.startArea, styles.yellow]}>
//             <View style={[styles.subStartArea, styles.white]}>
//               <View style={[styles.subStartArea_View, styles.yellow]}></View>
//               <View style={[styles.subStartArea_View, styles.yellow]}></View>
//               <View style={[styles.subStartArea_View, styles.yellow]}></View>
//               <View style={[styles.subStartArea_View, styles.yellow]}></View>
//             </View>
//           </View>
//         </View>
//         {/* Container2 */}
//         <View style={styles.homeContainer}>
//           <View style={styles.horizontalPath}>
//             {/* 1st line */}
//             <View style={styles.subHorizontalPath}></View>
//             <View
//               style={[styles.subHorizontalPath, styles.green, styles.centered]}
//             >
//               <Icon name="circle" size={appDimensions.cellWidth} color="#fff" />
//             </View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             {/* 2nd line */}
//             <View style={styles.subHorizontalPath}></View>
//             <View style={[styles.subHorizontalPath, styles.green]}></View>
//             <View style={[styles.subHorizontalPath, styles.green]}></View>
//             <View style={[styles.subHorizontalPath, styles.green]}></View>
//             <View style={[styles.subHorizontalPath, styles.green]}></View>
//             <View style={[styles.subHorizontalPath, styles.green]}></View>
//             {/* 3rd line */}
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={[styles.subHorizontalPath, styles.centered]}>
//               <Icon1 name="star" size={appDimensions.cellWidth} color="#84c21f" />
//             </View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//           </View>
//           <View style={styles.homePath}>
//             <View style={styles.triangleContainer}>
//               <View style={styles.triangleRight}></View>
//               <View style={styles.triangleUp}></View>
//               <View style={styles.triangleLeft}></View>
//               <View style={styles.triangleDown}></View>
//               <View style={styles.circle}>
//                 <View style={styles.text}>
//                   {/* <Text style={styles.textStyle}>Home</Text> */}
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={styles.horizontalPath}>
//             {/* 1st line */}
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={[styles.subHorizontalPath, styles.centered]}>
//               <Icon1 name="star" size={appDimensions.cellWidth} color="#0092dc" />
//             </View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             {/* 2nd line */}
//             <View style={[styles.subHorizontalPath, styles.blue]}></View>
//             <View style={[styles.subHorizontalPath, styles.blue]}></View>
//             <View style={[styles.subHorizontalPath, styles.blue]}></View>
//             <View style={[styles.subHorizontalPath, styles.blue]}></View>
//             <View style={[styles.subHorizontalPath, styles.blue]}></View>
//             <View style={styles.subHorizontalPath}></View>
//             {/* 3rd line */}
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View style={styles.subHorizontalPath}></View>
//             <View
//               style={[styles.subHorizontalPath, styles.blue, styles.centered]}
//             >
//               <Icon name="circle" size={appDimensions.cellWidth} color="#fff" />
//             </View>
//             <View style={styles.subHorizontalPath}></View>
//           </View>
//         </View>
//         {/* Container3 */}
//         <View style={styles.playContainer}>
//           <View style={[styles.startArea, styles.red]}>
//             <View style={[styles.subStartArea, styles.white]}>
//               <View style={[styles.subStartArea_View, styles.red]}></View>
//               <View style={[styles.subStartArea_View, styles.red]}></View>
//               <View style={[styles.subStartArea_View, styles.red]}></View>
//               <View style={[styles.subStartArea_View, styles.red]}></View>
//             </View>
//           </View>
//           <View style={styles.verticalPath}>
//             {/* 1st line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={[styles.subVerticalPath, styles.red]}></View>
//             <View style={styles.subVerticalPath}></View>
//             {/* 2nd line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={[styles.subVerticalPath, styles.red]}></View>
//             <View style={styles.subVerticalPath}></View>
//             {/* 3rd line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={[styles.subVerticalPath, styles.red]}></View>
//             <View style={styles.subVerticalPath}></View>
//             {/* 4th line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={[styles.subVerticalPath, styles.red]}></View>
//             <View style={[styles.subVerticalPath, styles.centered]}>
//               <Icon1 name="star" size={appDimensions.cellWidth} color="#dc2418" />
//             </View>
//             {/* 5th line */}
//             <View style={[styles.subVerticalPath, styles.red, styles.centered]}>
//               {/* <Icon name="circle" size={appDimensions.cellWidth} color="#fff" /> */}
//             </View>
//             <View style={[styles.subVerticalPath, styles.red]}></View>
//             <View style={styles.subVerticalPath}></View>
//             {/* 6th line */}
//             <View style={styles.subVerticalPath}></View>
//             <View style={styles.subVerticalPath}></View>
//             <View style={styles.subVerticalPath}></View>
//           </View>
//           <View style={[styles.startArea, styles.blue]}>
//             <View style={[styles.subStartArea, styles.white]}>
//               <View style={[styles.subStartArea_View, styles.blue]}></View>
//               <View style={[styles.subStartArea_View, styles.blue]}></View>
//               <View style={[styles.subStartArea_View, styles.blue]}></View>
//               <View style={[styles.subStartArea_View, styles.blue]}></View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>


//       {/* Dice */}
//       <View style={styles.diceContainer}>
//         <TouchableOpacity onPress={rollDice}>
//           <Animated.View
//             style={[
//               styles.dice,
//               {
//                 transform: [
//                   {
//                     rotate: diceAnimation.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: ['0deg', '360deg'],
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           >
//             <Text style={styles.diceText}>{diceValue}</Text>
//           </Animated.View>
//         </TouchableOpacity>
//       </View>

//       {/* Tokens */}
//       <View style={styles.tokensContainer}>
//         {['green', 'red', 'yellow', 'blue'].map((color) => (
//           <TouchableOpacity
//             key={color}
//             onPress={() => moveToken(color)}
//             style={[styles.token, styles[`${color}Token`]]}
//           >
//             <Text style={styles.tokenText}>{tokenPositions[color]}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Footer Section */}
//           <View style={styles.footer}>
//             <View style={styles.player}>
//               <Image
//                 style={styles.playerImage}
//                 source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual image URL
//               />
//               <Text style={styles.playerName}>Kiran756</Text>
//             </View>
//             <View style={styles.footerButtons}>
//               <Text style={styles.footerButton}>Emoji</Text>
//               <Text style={styles.footerButton}>Message</Text>
//             </View>
//           </View>
// </View>
//   );
// };

// export default App;
// const styles = StyleSheet.create({
//   diceContainer: {
    
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dice: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#FFD700',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     elevation: 5,
//   },
//   diceText: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   tokensContainer: {
 
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   token: {
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//   },
//   greenToken: {
//     backgroundColor: '#84c21f',
//   },
//   redToken: {
//     backgroundColor: '#dc2418',
//   },
//   yellowToken: {
//     backgroundColor: '#f6c700',
//   },
//   blueToken: {
//     backgroundColor: '#0092dc',
//   },
//   tokenText: {
//     color: '#fff',
//     fontSize: 16,
//   },
 
//   footer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   player: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   playerImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   playerName: {
//     fontSize: 14,
//     color: '#fff',
//     marginLeft: 10,
//   },
//   footerButtons: {
//     flexDirection: 'row',
//   },
//   footerButton: {
//     fontSize: 14,
//     color: '#fff',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: '#BA68C8',
//     borderRadius: 8,
//     marginHorizontal: 5,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#4B164C',
//     padding: 16,
//     width:'100%'
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   rank: {
//     fontSize: 32,
//     color: '#FFD700',
//     fontWeight: 'bold',
//   },
//   rankDetails: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   rankTitle: {
//     fontSize: 18,
//     color: '#FFD700',
//   },
//   rankPoints: {
//     fontSize: 14,
//     color: '#fff',
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   profileName: {
//     fontSize: 16,
//     color: '#fff',
//   },
 
//   wrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//     margin: 0,
//     padding: 0,
//     // marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
//   },
//   container1: {
//     width: appDimensions.containerWidth,
//     height:appDimensions.containerWidth,
//     margin: 10,
//     backgroundColor:'white'
//   },
//   playContainer: {
//     width: "100%",
//     height: "40%",
//     flexDirection: "row",
//   },
//   homeContainer: {
//     width: "100%",
//     height: "20%",
//     flexDirection: "row",
//   },
//   startArea: {
//     width: "40%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   verticalPath: {
//     width: "20%",
//     height: "100%",
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   horizontalPath: {
//     width: "40%",
//     height: "100%",
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   homePath: {
//     width: "20%",
//     height: "100%",
//   },
//   green: {
//     backgroundColor: "#84c21f",
//   },
//   red: {
//     backgroundColor: "#dc2418",
//   },
//   blue: {
//     backgroundColor: "#0092dc",
//   },
//   yellow: {
//     backgroundColor: "#f6c700",
//   },
//   white: {
//     backgroundColor: "#fff",
//   },
//   subStartArea: {
//     width: "70%",
//     height: "70%",
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   subStartArea_View: {
//     width: "35%",
//     height: "35%",
//     margin: "7.5%",
//     shadowColor: "rgba(0, 0, 0, 0.16)",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowRadius: 6,
//     shadowOpacity: 1,
//     elevation: 3,
//     backgroundColor: "white",
//     transition: "all 0.3s",
//     transform: [{ scaleX: 1.05 }],
//   },
//   subVerticalPath: {
//     width: "33.33%",
//     height: "16.667%",
//     borderWidth: 1,
//     borderColor: "#000",
//   },
//   subHorizontalPath: {
//     height: "33.33%",
//     width: "16.66%",
//     borderWidth: 1,
//     borderColor: "#000",
//   },
//   centered: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   triangleContainer: {
//     width: "100%",
//     height: "100%",
//     position: "relative",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   triangleRight: {
//     width: 0,
//     height: 0,
//     backgroundColor: "transparent",
//     borderStyle: "solid",
//     borderLeftWidth:appDimensions.bwidth,
//     borderTopWidth:appDimensions.bwidth,
//     borderBottomWidth: appDimensions.bwidth,
//     borderLeftColor: "#84c21f",
//     borderTopColor: "transparent",
//     borderBottomColor: "transparent",
//     position: "absolute",
//     left: 0,
//   },
//   triangleUp: {
//     width: 0,
//     height: 0,
//     backgroundColor: "transparent",
//     borderStyle: "solid",
//     borderLeftWidth: appDimensions.bwidth,
//     borderRightWidth:appDimensions.bwidth,
//     borderBottomWidth: appDimensions.bwidth,
//     borderLeftColor: "transparent",
//     borderRightColor: "transparent",
//     borderBottomColor: "#dc2418",
//     position: "absolute",
//     bottom: 0,
//   },
//   triangleLeft: {
//     width: 0,
//     height: 0,
//     backgroundColor: "transparent",
//     borderStyle: "solid",
//     borderTopWidth: appDimensions.bwidth,
//     borderRightWidth:appDimensions.bwidth,
//     borderBottomWidth: appDimensions.bwidth,
//     borderTopColor: "transparent",
//     borderRightColor: "#0092dc",
//     borderBottomColor: "transparent",
//     position: "absolute",
//     right: 0,
//   },
//   triangleDown: {
//     width: 0,
//     height: 0,
//     backgroundColor: "transparent",
//     borderStyle: "solid",
//     borderTopWidth: appDimensions.bwidth,
//     borderRightWidth: appDimensions.bwidth,
//     borderLeftWidth:appDimensions.bwidth,
//     borderTopColor: "#f6c700",
//     borderRightColor: "transparent",
//     borderLeftColor: "transparent",
//     position: "absolute",  
//     top: 0,
//   },
//   circle: {
//     // height: "60%",
//     // width: "60%",
//     position: "absolute",
//     backgroundColor: "#fff",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "#000",
//   },
//   textStyle: {
//     fontSize:appDimensions.minScreenDimension * 0.03,
//     fontWeight: "bold",
//   },
// });
