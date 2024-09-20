import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const Card = ({ children }) => {
  return <View style={styles.inputContainer}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: deviceWidth < 400 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // shadow for android
    elevation: 8,
    // shadow for iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
});
