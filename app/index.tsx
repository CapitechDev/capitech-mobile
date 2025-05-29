import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container]}>
        <Text style={styles.title}>Bem-vindo ao CapiTech</Text>

        <Card
          title="Trilhas Apreendizagem"
          content="Confira nossos serviços e soluções tecnológicas"
          backgroundColor="#1EA0D1"
          icon={require('../assets/img_home/trilha.png')}
          href="/content"
        />

        <Card
          title="Notícias"
          content="Fique por dentro das últimas novidades do mundo da tecnologia"
          backgroundColor="#63C770"
          icon={require('../assets/img_home/world-news.png')}
          href="/notice"
        />

        <Card
          title="Contato"
          content="Entre em contato com nossa equipe"
          backgroundColor="#D376EA"
          icon={require('../assets/img_home/chat-de-video.png')}
          href="/contact"
        />

        <Card
          title="Vestibular"
          content="Fique por dentro do vestibular da Fatec"
          backgroundColor="#FB3535"
          icon={require('../assets/img_home/academico.png')}
          href="/vestibular"
        />

        <Card
          title="Sobre"
          content="Conheça mais sobre o projeto"
          backgroundColor="#FF8C00"
          icon={require('../assets/img_home/about.png')}
          href="/about"
        />
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
    gap: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F4172",
    marginBottom: 20,
    marginTop: 10,
  },
});
