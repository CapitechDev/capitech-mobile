import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useSugestoes from "../hooks/useSugestoes";

interface EstatisticasSugestoesProps {
  onFechar?: () => void;
}

export default function EstatisticasSugestoes({
  onFechar,
}: EstatisticasSugestoesProps) {
  const {
    sugestoes,
    loading,
    obterPalavrasMaisUsadas,
    totalSugestoes,
    totalPalavrasUnicas,
    limparTodasSugestoes,
  } = useSugestoes();

  const palavrasMaisUsadas = obterPalavrasMaisUsadas(10);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando estatísticas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estatísticas das Sugestões</Text>
        {onFechar && (
          <TouchableOpacity onPress={onFechar} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalSugestoes}</Text>
          <Text style={styles.statLabel}>Total de Perguntas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalPalavrasUnicas}</Text>
          <Text style={styles.statLabel}>Temas Únicos</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Temas Mais Perguntados</Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {palavrasMaisUsadas.length > 0 ? (
          palavrasMaisUsadas.map((item, index) => (
            <View key={item.palavra} style={styles.wordItem}>
              <View style={styles.wordRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.wordInfo}>
                <Text style={styles.wordText}>{item.palavra}</Text>
                <Text style={styles.wordCount}>
                  {item.quantidade} pergunta(s)
                </Text>
              </View>
              <View style={styles.wordBar}>
                <View
                  style={[
                    styles.wordBarFill,
                    {
                      width: `${
                        (item.quantidade / palavrasMaisUsadas[0].quantidade) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Nenhuma sugestão ainda</Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={limparTodasSugestoes}
        >
          <Text style={styles.clearButtonText}>Limpar Dados</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>
        💡 Esses dados podem ser usados para criar trilhas de conteúdo
        personalizadas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    minWidth: 100,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  wordItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  wordRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankNumber: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  wordInfo: {
    flex: 1,
  },
  wordText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
  },
  wordCount: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  wordBar: {
    width: 60,
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    overflow: "hidden",
  },
  wordBarFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 3,
  },
  noDataText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 40,
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    fontStyle: "italic",
  },
});
