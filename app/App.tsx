import { StyleSheet, Text, View } from "react-native";

export type RockStackParamList = {
  Home: undefined;
  Content: undefined;
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Olá</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // container2: {
  //   flex: 1,
  //   backgroundColor: "#304076",
  //   alignItems: "flex-start",
  //   maxHeight: 120,
  // },
});
