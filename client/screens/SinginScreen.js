import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// Authentication
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  androidClientId,
  expoWebClientId,
  iosClientId,
  redirectUri,
} from "../config/googleConfig";

WebBrowser.maybeCompleteAuthSession();

const SigninScreen = ({ setUserInfo }) => {
  // Google & Firebase sign-in
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoWebClientId: expoWebClientId,
    iosClientId: iosClientId,
    androidClientId: androidClientId,
    redirectUri: redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleFirebaseSignIn(id_token);
    }
  }, [response]);

  const handleFirebaseSignIn = async (idToken) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      await AsyncStorage.setItem("userInfo", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Firebase sign-in error: ", error.message);
    }
  };

  // Email & Password sign-in
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [passwordIsSecure, setPasswordIsSecure] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const navigation = useNavigation();

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [emailError, setEmailError] = useState("Incorrect email.");
  const [passwordError, setPasswordError] = useState("Incorrect Password");

  // general email validation function(requires **@**.** format)
  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };
  // password validation function for 8+ characters, letters, numbers, and symbols
  const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  // real-time validation for email
  useEffect(() => {
    const isEmailValid = emailValidation(enteredEmail);
    setEmailError("Invalid email format.");
    setEmailIsValid(isEmailValid);
  }, [enteredEmail]);

  // real-time validation for password
  useEffect(() => {
    const isPasswordValid = passwordValidation(enteredPassword);
    setPasswordError("Invalid passsword fromat.");
    setPasswordIsValid(isPasswordValid);
  }, [enteredPassword]);

  // Email & Password sign-in handler function
  const signInHandler = async () => {
    setIsSubmitted(true);

    if (emailIsValid && passwordIsValid) {
      // use log-in API

      const response = await login(enteredEmail, enteredPassword);
      console.log("Response: " + response);
      if (response?.status == 200) {
        // navigation.navigate("Category");
      } else if (response?.status == 400) {
        setEmailError(
          response.response ? response.response.data.message : response.message
        );
        setEmailIsValid(false);
      } else {
        setPasswordError(response?.data?.message);
        setPasswordIsValid(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* input fields area */}
      <KeyboardAvoidingView
        style={{ flex: 0.6 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        enabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Guess Numbers</Text>
            </View>
            {/* email field */}
            <View style={styles.formContainer}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  Email <Text style={styles.astarisk}>*</Text>
                </Text>
              </View>
              <View
                style={[
                  !emailIsValid && isSubmitted
                    ? styles.fieldAlert
                    : styles.emailField,
                  isEmailFocused && {
                    borderWidth: 2,
                    borderColor: "#797878",
                  },
                ]}
              >
                <TextInput
                  placeholder="Enter your email adddress"
                  placeholderTextColor="grey"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={enteredEmail}
                  onChangeText={(text) => setEnteredEmail(text)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </View>
              {!emailIsValid && isSubmitted && (
                <View style={styles.alertContainer}>
                  <Ionicons name="alert-circle-outline" color="red" size={20} />
                  <Text style={styles.alertText}>{emailError}</Text>
                </View>
              )}
            </View>

            {/* password field */}
            <View style={styles.formContainer}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  Password <Text style={styles.astarisk}>*</Text>
                </Text>
              </View>
              <View
                style={[
                  !passwordIsValid && isSubmitted
                    ? styles.fieldAlert
                    : styles.passwordField,
                  isPasswordFocused && {
                    borderWidth: 2,
                    borderColor: "#797878",
                  },
                ]}
              >
                <TextInput
                  placeholder="Enter a password"
                  placeholderTextColor="gray"
                  keyboardType="default"
                  autoCapitalize="none"
                  secureTextEntry={passwordIsSecure}
                  value={enteredPassword}
                  onChangeText={(text) => setEnteredPassword(text)}
                  maxLength={35}
                  style={{
                    width: "90%",
                  }}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
                <Ionicons
                  name={passwordIsSecure ? "eye-off-outline" : "eye-outline"}
                  color="black"
                  size={20}
                  onPress={() => setPasswordIsSecure(!passwordIsSecure)}
                />
              </View>
              {!passwordIsValid && isSubmitted && (
                <View style={styles.alertContainer}>
                  <Ionicons name="alert-circle-outline" color="red" size={20} />
                  <Text style={styles.alertText}>{passwordError}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* buttons and link */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.signinButton}
          // need to check if user's info matches to our database
          // onPress={signInHandler}
        >
          <Text style={styles.signinButtonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleButton}
          // onPress={() => promptAsync()}
          onPress={() => promptAsync()}
        >
          <Image source={require("../assets/images/google-signin-icon.png")} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgetPasswordButton}
          // onPress={() => navigation.navigate("ResetPW_request")}
        >
          <Text style={styles.forgetPasswordButtonText}>Forget Password?</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signupLinkButton}
            // onPress={() => navigation.navigate("Registration")}
          >
            <Text style={styles.signupLinkText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>here</Text>
        </View>
      </View>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdfd",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddingTop: 140,
  },
  titleContainer: {
    marginBottom: 80,
  },
  titleText: {
    fontSize: 50,
    color: "#5a4949",
  },
  formContainer: {
    width: 340,
    height: 80,
    rowGap: 4,
    marginBottom: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#5a4949",
  },
  astarisk: {
    color: "red",
  },
  emailField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#b9b92e",
    borderRadius: 4,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  fieldAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 4,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  passwordField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#b9b92e",
    borderRadius: 4,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  alertContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 2,
  },
  alertText: {
    color: "red",
  },
  buttonsContainer: {
    flex: 0.5,
    alignItems: "center",
    rowGap: 10,
  },
  signinButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dfdf1c",
    borderColor: "yellow",
    borderRadius: 6,
    padding: 10,
    width: 340,
    marginBottom: 10,
  },
  signinButtonText: {
    fontSize: 18,
    color: "#5a4949",
    fontWeight: "bold",
  },
  googleButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 6,
    padding: 10,
    width: 340,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#5a4949",
    fontWeight: "bold",
  },
  forgetPasswordButton: {
    marginVertical: 10,
  },
  forgetPasswordButtonText: {
    fontSize: 16,
    color: "blue",
  },
  signupTextContainer: {
    flexDirection: "row",
    columnGap: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    color: "black",
    color: "#5a4949",
  },
  signupLinkButton: {},
  signupLinkText: {
    color: "blue",
    fontSize: 16,
  },
});
