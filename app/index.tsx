import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../services/api";
import { getTrails } from "../api/capiApi";
import { Trail } from "../types/Trails";

export default function HomeScreen() {
  const [trails, setTrails] = React.useState<Trail[]>([]);

  const fetchTrails = async () => {
    try {
      const trailsData = await getTrails();

      console.log({ trailsData });

      if (trailsData.success) {
        setTrails(trailsData.data);
      } else {
        console.error("Failed to fetch trails:", trailsData.message);
      }
    } catch (error: any) {
      console.log("Error fetching trails:", error.message);
    }
  };

  useEffect(() => {
    fetchTrails();
  }, []);

  useEffect(() => {
    console.log("Trails fetched:", trails);
  }, [trails]);

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <View style={styles.trailsGrid}>
            {trails.map((trail) => (
              <View key={trail._id} style={styles.trailCard}>
                {/* Substitua HomeTrailImage por um componente de imagem real, se necessário */}
                {/* <HomeTrailImage trailName={trail.name} /> */}
                <View style={styles.trailImagePlaceholder}>
                  <Text style={styles.trailImageText}>{trail.name[0]}</Text>
                </View>
                <View style={styles.trailTextContainer}>
                  <Text style={styles.trailName}>{trail.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: "/trail",
                        params: {
                          trail: JSON.stringify(trail),
                        },
                      });
                    }}
                    // href={`/trilhas/${trail._id}`}
                    // style={styles.trailSubtitleLink}
                  >
                    <Text style={styles.trailSubtitle}>{trail.subtitle}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flexGrow: 1,
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
  trailsGrid: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  trailCard: {
    backgroundColor: "#2F4172",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    alignItems: "center",
    flex: 1,
    minWidth: 100,
  },
  trailImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  trailImageText: {
    fontSize: 32,
    color: "#2F4172",
    fontWeight: "bold",
  },
  trailTextContainer: {
    alignItems: "center",
  },
  trailName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },
  trailSubtitleLink: {
    textDecorationLine: "underline",
  },
  trailSubtitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
