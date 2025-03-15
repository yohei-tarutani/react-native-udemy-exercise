import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./constants/Colors";
import { useEffect, useState } from "react";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import SigninScreen from "./screens/SinginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("userInfo");
      if (userJSON) {
        setUserInfo(JSON.parse(userJSON));
      }
    } catch (error) {
      console.error("Error loading user info: ", error.message);
    }
  };

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };
  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };
  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let screen = (
    <StartGameScreen
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      onPickNumber={pickedNumberHandler}
    />
  );
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }
  // console.log(userInfo);

  return (
    <>
      <StatusBar style={userInfo ? "light" : "dark"} />
      {userInfo ? (
        <LinearGradient
          colors={[Colors.primary800, Colors.accent500]}
          style={styles.rootScreen}
        >
          <ImageBackground
            source={require("./assets/images/background2.jpg")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
            <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
          </ImageBackground>
        </LinearGradient>
      ) : (
        <SigninScreen userInfo={userInfo} setUserInfo={setUserInfo} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
