import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const about = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Sobre o Projeto</Text>
        <Image
          source={require("../../../assets/project-image.png")}
          style={styles.image}
        />
        <Text style={styles.description}>
          Este projeto é uma aplicação desenvolvida para facilitar a comunicação
          e o contato com os usuários. Através de uma interface amigável,
          buscamos proporcionar uma experiência única e eficiente.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Descrição do Projeto</Text>
        <Text style={styles.description}>
          O Capitech Mobile é uma plataforma que visa conectar usuários a
          serviços de forma rápida e prática. Com funcionalidades que atendem às
          necessidades do dia a dia, nosso objetivo é simplificar a vida dos
          nossos usuários.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Informações sobre o Curso</Text>
        <Text style={styles.description}>
          O curso oferecido abrange diversas áreas do desenvolvimento de
          software, incluindo programação, design de interfaces e gerenciamento
          de projetos. Os alunos terão a oportunidade de trabalhar em projetos
          reais e adquirir experiência prática.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default about;
