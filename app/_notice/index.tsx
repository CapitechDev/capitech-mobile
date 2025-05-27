import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";

export default function Notice() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Noticias</Text>
      </View>

      <View style={styles.containerform}>
        <Text style={styles.subTitle}>
          As últimas novidades do Capitech e do mundo
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://docs.expo.dev/")}
          activeOpacity={0.8}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nova versão do expo</Text>
            <Text style={styles.cardContent}>
              Confira nossos serviços e soluções tecnológicas
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "stretch",
  },
  containerform: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "stretch",
  },
  header: {
    height: 40,
    backgroundColor: "#d3c795",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textareaContainer: {
    flex: 1,
    marginBottom: 50,
  },
  textarea: {
    flex: 1,
  },
  button: {
    backgroundColor: "#0099cc",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F4172",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: "#555",
  },
});
