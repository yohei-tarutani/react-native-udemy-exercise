import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";

import { auth } from "../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StartGameScreen = ({ onPickNumber, userInfo, setUserInfo }) => {
  // Sign-out function
  const handleSignOut = async () => {
    try {
      Alert.alert("Sign out", "Are you sure to sign out?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            await auth.signOut(); // Firebase sign out
            console.log("User signed out successfully.");

            // Clear userInfo from AsyncStorage
            await AsyncStorage.removeItem("userInfo");
            // Reset userInfo state to redirect to the sign-in screen
            setUserInfo(null);
          },
        },
      ]);
    } catch (error) {
      console.error("Sign-out error: ", error.message);
    }
  };

  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  const resetInputHandler = () => {
    setEnteredNumber("");
  };
  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    onPickNumber(chosenNumber);
  };

  const marginTopDistance = height < 400 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Text style={styles.userNameText}>
            Hi, {userInfo && userInfo.displayName.split(" ")[0]}!
          </Text>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2} // set two digits as maximum numbers
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              // logic
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signoutButton}
          >
            <Text style={styles.signoutText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 400 ? 30 : 100,
    alignItems: "center",
  },
  userNameText: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.accent500,
    paddingBottom: 30,
    paddingTop: 0,
    elevation: 2, // shadow for Android
    // iOS Shadow
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 5, height: 5 }, // Shadow position
    shadowOpacity: 0.5, // How transparent the shadow is
    shadowRadius: 4, // How blurred the shadow is
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginTop: 10,
    marginBottom: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  signoutButton: {
    backgroundColor: Colors.primary600,
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 200,
  },
  signoutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

// buttonInnerContainer: {
//   backgroundColor: Colors.primary500,
//   paddingVertical: 8,
//   paddingHorizontal: 16,
//   elevation: 2, // shadow only for Android
//   // iOS Shadow
//   shadowColor: "black", // Shadow color
//   shadowOffset: { width: 0, height: 2 }, // Shadow position
//   shadowOpacity: 0.25, // How transparent the shadow is
//   shadowRadius: 4, // How blurred the shadow is
// },
// buttonText: {
//   color: "white",
//   textAlign: "center",
//   fontWeight: "bold",
//   fontSize: 18,
// },
