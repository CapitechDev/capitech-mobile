import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Line removed as it is unused.
import { getTrails } from "../api/capiApi";
import { Trail } from "../types/Trails";
import { TrailImage } from "../components/TrailImage";
//import { Feather } from "@expo/vector-icons";

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao CapiTech</Text>

          <View style={[styles.card, { backgroundColor: "#1EA0D1" }]}>
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Trilhas Apreendizagem</Text>
                <Text style={styles.cardContent}>
                  Confira nossos serviços e soluções tecnológicas
                </Text>
              </View>
              <Image style={styles.icon}
                source={require('../assets/img_home/trilha.png')}
                resizeMode="cover"
              />
            </View>
          </View>
        
          <View style={[styles.card, { backgroundColor: "#63C770" }]}>
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Link href={"/notice"} style={styles.cardTitle}>Notícias</Link>
                <Text style={styles.cardContent}>
                  Fique por dentro das últimas novidades do mundo da tecnologia
                </Text>
              </View>
              <Image style={styles.icon}
                source={require('../assets/img_home/world-news.png')}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: "#D376EA" }]}>
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Link href={"/contact"} style={styles.cardTitle}>Contato</Link>
                <Text style={styles.cardContent}>
                  Entre em contato com nossa equipe
                </Text>
              </View>
              <Image style={styles.icon}
                source={require('../assets/img_home/chat-de-video.png')}
                resizeMode="cover"
              />
            </View>
          </View>
        
          <View style={[styles.card, { backgroundColor: "#FB3535" }]}>
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Link href={"/vestibular"} style={styles.cardTitle}>Vestibular</Link>
                <Text style={styles.cardContent}>
                  Fique por dentro do vestibular da Fatec
                </Text>
              </View>
              <Image style={styles.icon}
                source={require('../assets/img_home/academico.png')}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: "#FF8C00" }]}>
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Link href={"/about"} style={styles.cardTitle}>Sobre</Link>
                <Text style={styles.cardContent}>
                  Conheça mais sobre o projeto
                </Text>
              </View>
              <Image style={styles.icon}
                source={require('../assets/img_home/about.png')}
                resizeMode="cover"
              />
            </View>
          
            <View style={styles.trailsGrid}>
              {trails.map((trail) => (
                <TouchableOpacity key={trail._id} style={styles.trailCard} onPress={() => {
                  router.push({
                    pathname: "/trail",
                    params: {
                      trail: JSON.stringify(trail),
                    },
                  });
                }}>
                  <TrailImage trailName={trail.name}/>
                  <View style={styles.trailTextContainer}>
                    <Text style={styles.trailName}>{trail.name}</Text>
                    <Text style={styles.trailSubtitle}>{trail.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
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
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#4b5563",
    color: "#fff",
    borderRadius: 12,
    padding: 18,
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
    marginTop: 20,
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
  icon: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 1,
  },
});
