import { Link } from "expo-router";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function Home() {
  const contentItems = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Inicial</Text>

      <FlatList
        data={contentItems}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Link href={`/content/${item}`} style={styles.link}>
            Ir para Conteúdo {item}
          </Link>
        )}
        style={styles.list}
      />

      <Link href="/content" style={styles.mainLink}>
        Ver página de conteúdo geral
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  link: {
    fontSize: 16,
    color: "#0000ff",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  mainLink: {
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "#007bff",
    padding: 15,
    marginVertical: 20,
    borderRadius: 5,
  },
});
