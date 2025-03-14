import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const PrimaryButton = ({ children, onPress }) => {
  const pressHandler = () => {
    onPress();
  };
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={pressHandler}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  // pressed btn styling(ripple effect) for Android
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // shadow only for Android
    // iOS Shadow
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25, // How transparent the shadow is
    shadowRadius: 4, // How blurred the shadow is
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  // pressed btn styling for iOS
  pressed: {
    opacity: 0.75,
  },
});
