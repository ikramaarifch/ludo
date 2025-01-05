import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

const Board = () => {
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
      <View style={styles.boardContainer}>
        <Svg height="100%" width="80%" viewBox="0 0 400 300">
          {/* Background */}
          <Rect width="300" height="300" fill="#fff" />

          {/* Green Home */}
          <Rect x="0" y="0" width="100" height="100" fill="#66cc66" />
          <Circle cx="50" cy="50" r="30" fill="#ffffff" />
          <Circle cx="50" cy="50" r="15" fill="#66cc66" />

          {/* Yellow Home */}
          <Rect x="200" y="0" width="100" height="100" fill="#ffff66" />
          <Circle cx="250" cy="50" r="30" fill="#ffffff" />
          <Circle cx="250" cy="50" r="15" fill="#ffff66" />

          {/* Red Home */}
          <Rect x="0" y="200" width="100" height="100" fill="#ff6666" />
          <Circle cx="50" cy="250" r="30" fill="#ffffff" />
          <Circle cx="50" cy="250" r="15" fill="#ff6666" />

          {/* Blue Home */}
          <Rect x="200" y="200" width="100" height="100" fill="#6666ff" />
          <Circle cx="250" cy="250" r="30" fill="#ffffff" />
          <Circle cx="250" cy="250" r="15" fill="#6666ff" />

          {/* Pathways */}
          {/* Horizontal and Vertical Path */}
          <Rect x="100" y="0" width="50" height="300" fill="#f8f8f8" stroke="#000" />
          <Rect x="0" y="100" width="300" height="50" fill="#f8f8f8" stroke="#000" />

          {/* Center */}
          <Path
            d="M150 100 L200 150 L150 200 L100 150 Z"
            fill="red"
          />
          
       
          
        </Svg>
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
    padding: 16,
    width:'100%'
  },
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
  boardContainer: {
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1, // Keeps it square
    width:50,
    borderRadius: 16,
    overflow: 'hidden',
    
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
});

export default Board;
