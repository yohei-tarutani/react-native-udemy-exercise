import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./constants/Colors";
import { useState } from "react";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import SigninScreen from "./screens/SinginScreen";

export default function App() {
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
  let screen = <SigninScreen />;
  // if (aaa)  {
  //   screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  // }
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

  return (
    <>
      <StatusBar style="dark" />
      {screen}
      {/* <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
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
      </LinearGradient> */}
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
