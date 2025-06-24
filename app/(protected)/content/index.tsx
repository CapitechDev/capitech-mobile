import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getTrails } from "../../../api/capiApi";
import { TrailImage } from "../../../components/TrailImage";
import { Trail } from "../../../types/Trails";

export default function ContentIndex() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTrails = async () => {
    try {
      setLoading(true);
      const trailsData = await getTrails();

      console.log({ trailsData });

      if (trailsData.success) {
        setTrails(trailsData.data);
      } else {
        console.error("Failed to fetch trails:", trailsData.message);
      }
    } catch (error: any) {
      console.log("Error fetching trails:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrails();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Trilhas de Aprendizagem</Text>
        <View style={styles.trailsGrid}>
          {loading ? (
            <View>
              <Text style={[styles.description, { marginBottom: 15 }]}>
                Carregando trilhas...
              </Text>
              <ActivityIndicator size="small" color="#2F4172" />
            </View>
          ) : (
            trails.map((trail) => (
              <TouchableOpacity
                key={trail._id}
                style={styles.trailCard}
                onPress={() => {
                  router.push({
                    pathname: "/trail",
                    params: {
                      trail: JSON.stringify(trail),
                    },
                  });
                }}
              >
                <TrailImage trailName={trail.name} />
                <View style={styles.trailTextContainer}>
                  <Text style={styles.trailName}>{trail.name}</Text>
                  <Text style={styles.trailSubtitle}>{trail.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
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
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
});
