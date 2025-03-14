import { Text, StyleSheet, Platform } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    color: "white",
    fontSize: 26,
    textAlign: "center",
    borderWidth: Platform.OS === "android" ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: "white",
    padding: 16,
    maxWidth: "80%",
    width: 300,
    elevation: 2, // shadow for Android
    // iOS Shadow
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25, // How transparent the shadow is
    shadowRadius: 4, // How blurred the shadow is
  },
});
