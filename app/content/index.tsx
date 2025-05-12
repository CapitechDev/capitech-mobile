import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ContentIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Conteúdo Geral</Text>
      <Text style={styles.description}>
        Esta é a página principal de conteúdo
      </Text>

      <Link href="/" style={styles.link}>
        Voltar para a página inicial
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: "#0000ff",
    marginTop: 20,
  },
});
