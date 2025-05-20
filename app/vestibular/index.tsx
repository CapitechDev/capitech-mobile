import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Vestibular() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Vestibular</Text>
      </View>

      <View style={styles.titleBox}>
        <Text style={styles.title}>
          Siga seu sonho e entre na faculdade{" "}
          <Text style={styles.bold}>GRÁTIS!</Text>
        </Text>
        <Text style={styles.subtitle}>
          Aqui damos dicas do vestibular, e ajudamos na prova
        </Text>
      </View>

      <Image
        source={require("../../assets/fatec_img.png")}
        style={styles.mainImage}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.cardText}>
          A Faculdade de Tecnologia (Fatec) chegou na cidade de Votorantim em
          abril deste ano, e é a primeira unidade da instituição no município.
          Ela está localizada na avenida Juscelino Kubitschek de Oliveira, 279,
          na Vila Protestantes.
        </Text>
        <Text style={[styles.cardText, { marginTop: 10 }]}>
          Atualmente, a unidade tem dois cursos, mas futuramente serão
          implantados outros três: Construção Civil – Edifícios, Controle de
          Obras e Redes de Computadores. A inauguração está prevista para
          dezembro deste ano.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.blueButton]}
        onPress={() =>
          Linking.openURL("https://www.cps.sp.gov.br/fatec/vestibular/")
        }
      >
        <Text style={styles.buttonText}>Inscreva-se no Vestibular FATEC</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.redButton]}
        onPress={() =>
          Linking.openURL(
            "https://www.vestibularfatec.com.br/provas-gabaritos/"
          )
        }
      >
        <Text style={styles.buttonText}>Acompanhe as provas e gabaritos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingBottom: 40,
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#FDB913",
    paddingVertical: 16,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  titleBox: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 6,
  },
  bold: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
  mainImage: {
    width: "90%",
    height: 220,
    marginVertical: 10,
    borderRadius: 12,
  },
  card: {
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    width: "90%",
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
  },
  button: {
    width: "90%",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 12,
    alignItems: "center",
  },
  blueButton: {
    backgroundColor: "#2563EB",
  },
  redButton: {
    backgroundColor: "#DC2626",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
