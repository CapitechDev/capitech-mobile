import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { Article } from "../../../types/Articles";

export default function NewsDetailPage() {
  const params = useLocalSearchParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (params.article) {
      try {
        setArticle(JSON.parse(params.article as string));
      } catch (error) {
        console.error("Failed to parse article:", error);
      }
    }
  }, [params.article]);

  if (!article) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando artigo...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      {article.author && (
        <Text style={styles.author}>Autor: {article.author}</Text>
      )}
      {article.publishedAt && (
        <Text style={styles.publishedAt}>
          Publicado em: {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
      )}
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}
      <Text style={styles.description}>{article.description}</Text>
      <Text style={styles.content}>{article.content}</Text>
      {article.url && (
        <TouchableOpacity
          onPress={() => Linking.openURL(article.url || "")}
          style={{ marginBottom: 40 }}
        >
          <Text style={styles.linkText}>Ler artigo completo</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  author: { fontSize: 16, color: "#888", marginBottom: 10 },
  publishedAt: { fontSize: 14, color: "#888", marginBottom: 15 },
  image: { width: "100%", height: 200, resizeMode: "cover", marginBottom: 15 },
  description: { fontSize: 18, marginBottom: 15 },
  content: { fontSize: 16, lineHeight: 24 },
  linkText: { color: "blue", textDecorationLine: "underline", marginTop: 20 },
});
