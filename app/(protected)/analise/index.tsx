import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PainelAnaliseSimples from "../../../components/PainelAnaliseSimples";

export default function AnaliseScreen() {
  return (
    <ScrollView style={styles.container}>
      <PainelAnaliseSimples />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
