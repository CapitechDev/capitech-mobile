import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { Linking } from "react-native";

export default function Vestibular() {
  const mapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.037889615343!2d-47.449348699999994!3d-23.5311396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58b72bdd65027%3A0xb94c5e9f90d48401!2sFatec%20Votorantim!5e0!3m2!1spt-BR!2sbr!4v1748385844919!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style="border:0;"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen="false">
        </iframe>
      </body>
    </html>
  `;

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

      <View style={styles.mapContainer}>
        <WebView
          source={{ html: mapHTML }}
          style={styles.map}
          scrollEnabled={false}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          startInLoadingState={true}
          onNavigationStateChange={(event) => {
            if (event.navigationType === 'click') {
              return false;
            }
          }}
        />
      </View>

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
  mapContainer: {
    width: "90%",
    height: 300, // Aumentado para melhor visualização
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    flex: 1,
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
