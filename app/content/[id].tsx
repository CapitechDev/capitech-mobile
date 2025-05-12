import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ContentDetail() {
  // Acessando parâmetros da rota dinâmica
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Conteúdo</Text>
      <Text style={styles.detail}>ID: {id}</Text>

      <Link href="/" style={styles.link}>
        Voltar para a página inicial
      </Link>

      <Link href="/content" style={styles.link}>
        Voltar para a lista de conteúdos
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
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 30,
  },
  link: {
    fontSize: 16,
    color: "#0000ff",
    marginVertical: 10,
  },
});
