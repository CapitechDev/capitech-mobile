import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { newsApi } from "../../../services/newsApi";
import { Article, NewsArticle } from "../../../types/Articles";

export default function Notice() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getNews = async (pageNumber: number) => {
    const response = await newsApi.get<NewsArticle>("/everything", {
      params: {
        q: "programação AND desenvolvimento de software",
        language: "pt",
        sortBy: "publishedAt",
        pageSize: 10,
        page: pageNumber,
        apiKey: process.env.EXPO_PUBLIC_NEWS_API_KEY,
      },
    });

    return response.data;
  };

  useEffect(() => {
    console.log({page})

    const fetchNews = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const data = await getNews(page);
        setArticles((prev) => [...prev, ...data.articles]);
        setHasMore(data.articles.length > 0);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const handleGetMoreNews = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEventThrottle={400}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Notícias</Text>
      </View>

      <View style={styles.containerform}>
        <Text style={styles.subTitle}>
          As últimas novidades do Capitech e do mundo
        </Text>

        {articles.map((article, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.push({
                pathname: "/notice/details",
                params: {
                  article: JSON.stringify(article),
                },
              })
            }}
            activeOpacity={0.8}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{article.title}</Text>
              <Text style={styles.cardContent}>{article.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {loading && (
          <ActivityIndicator
            size="large"
            color="#2F4172"
            style={{ marginVertical: 20 }}
          />
        )}

        {!hasMore && (
          <Text
            style={{ textAlign: "center", color: "#999", marginBottom: 20 }}
          >
            Você chegou ao fim das notícias.
          </Text>
        )}

        {!loading && hasMore && (
          <View style={styles.buttonView}>
            <TouchableOpacity
            style={[styles.button, styles.blueButton]}
            onPress={handleGetMoreNews}
          >
            <Text style={styles.buttonText}>Carregar mais itens</Text>
          </TouchableOpacity>
          </View>
        )}
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
  buttonView: { width: "100%", alignItems: "center", marginBottom: 20 },
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
