import { Link } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo à CapiTech</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Serviços</Text>
          <Text style={styles.cardContent}>
            Confira nossos serviços e soluções tecnológicas
          </Text>
        </View>

        <View style={styles.card}>
          <Link href={"/notice"} style={styles.cardTitle}>
            Notícias
          </Link>
          <Text style={styles.cardContent}>
            Fique por dentro das últimas novidades do mundo da tecnologia
          </Text>
        </View>

        <View style={styles.card}>
          <Link href={"/contact"} style={styles.cardTitle}>
            Contato
          </Link>
          <Text style={styles.cardContent}>
            Entre em contato com nossa equipe
          </Text>
        </View>
        <View style={styles.card}>
          <Link href={"/vestibular"} style={styles.cardTitle}>
            Vestibular
          </Link>
          <Text style={styles.cardContent}>
            Fique por dentro do vestibular da Fatec
          </Text>
        </View>

        <View style={styles.card}>
          <Link href={"/about"} style={styles.cardTitle}>
            Sobre
          </Link>
          <Text style={styles.cardContent}>Conheça mais sobre o projeto</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F4172",
    marginBottom: 20,
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
