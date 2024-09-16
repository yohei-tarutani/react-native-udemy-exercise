import { View, Text, Pressable, StyleSheet } from "react-native";

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
        android_ripple={{ color: "#a90858" }}
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
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // shadow only for Android
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  // pressed btn styling for iOS
  pressed: {
    opacity: 0.75,
  },
});
