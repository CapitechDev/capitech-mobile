import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  salvarDadosFicticios,
  exportarDadosParaAnalise,
  obterEstatisticasCompletas,
} from "../functions/geradorDados";
import { limparSugestoes } from "../functions/sugestao";

export default function PainelAnaliseSimples() {
  const [estatisticas, setEstatisticas] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      const dados = await obterEstatisticasCompletas();
      setEstatisticas(dados);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const gerarDadosFicticios = async () => {
    try {
      Alert.alert(
        "Gerar Dados Fictícios",
        "Isso irá gerar 500 registros de exemplo para análise. Continuar?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Confirmar",
            onPress: async () => {
              try {
                await salvarDadosFicticios(500);
                Alert.alert("Sucesso", "Dados fictícios gerados com sucesso!");
                carregarEstatisticas();
              } catch (error) {
                Alert.alert("Erro", "Falha ao gerar dados fictícios");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao gerar dados fictícios:", error);
    }
  };

  const exportarDados = async () => {
    try {
      const dados = await exportarDadosParaAnalise();
      if (dados.length > 0) {
        const dadosJSON = JSON.stringify(dados, null, 2);

        // Copia dados para área de transferência
        await Clipboard.setStringAsync(dadosJSON);

        // Também mostra no console como backup
        console.log("=== DADOS COPIADOS PARA ÁREA DE TRANSFERÊNCIA ===");
        console.log(dadosJSON);

        Alert.alert(
          "Dados Copiados! �",
          `${dados.length} registros copiados para a área de transferência.\n✅ Cole os dados em qualquer editor de texto`,
          [
            {
              text: "Ver Console",
              onPress: () => {
                console.log("\n=== DADOS PARA ANÁLISE PYTHON ===");
                console.log(dadosJSON);
                console.log("=== SALVE COMO: dados_sugestoes.json ===\n");
              },
            },
            { text: "OK", style: "default" },
          ]
        );
      } else {
        Alert.alert("Aviso", "Nenhum dado encontrado para exportar");
      }
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      Alert.alert(
        "Erro",
        "Falha ao exportar dados: " + (error as Error).message
      );
    }
  };

  const limparDados = async () => {
    Alert.alert(
      "Limpar Dados",
      "Isso irá remover todos os dados salvos. Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            try {
              await limparSugestoes();
              setEstatisticas(null);
              Alert.alert("Sucesso", "Todos os dados foram removidos");
            } catch (error) {
              Alert.alert("Erro", "Falha ao limpar dados");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="analytics" size={32} color="white" />
        <Text style={styles.headerTitle}>Painel de Análise</Text>
        <Text style={styles.headerSubtitle}>Sistema de Sugestões Capitech</Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={gerarDadosFicticios}
        >
          <Ionicons name="create" size={20} color="white" />
          <Text style={styles.buttonText}>Gerar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={exportarDados}
        >
          <Ionicons name="download" size={20} color="white" />
          <Text style={styles.buttonText}>Exportar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={carregarEstatisticas}
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton} onPress={limparDados}>
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Estatísticas */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando estatísticas...</Text>
        </View>
      ) : estatisticas ? (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>📊 Informações Gerais</Text>
            <Text style={styles.statItem}>
              Total de Registros: {estatisticas.total_registros}
            </Text>
            <Text style={styles.statItem}>
              Confiança Média:{" "}
              {estatisticas.confianca_media?.toFixed(3) || "N/A"}
            </Text>
            <Text style={styles.statItem}>
              Tamanho Médio:{" "}
              {estatisticas.tamanho_medio_pergunta?.toFixed(1) || "N/A"}{" "}
              caracteres
            </Text>
          </View>

          {estatisticas.categorias && (
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>🎯 Categorias</Text>
              {Object.entries(estatisticas.categorias).map(
                ([categoria, count]) => (
                  <Text key={categoria} style={styles.statItem}>
                    {categoria}: {count as number}
                  </Text>
                )
              )}
            </View>
          )}

          {estatisticas.palavras_mais_frequentes && (
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>🔑 Palavras Mais Frequentes</Text>
              {Object.entries(estatisticas.palavras_mais_frequentes)
                .slice(0, 5)
                .map(([palavra, count]) => (
                  <Text key={palavra} style={styles.statItem}>
                    {palavra}: {count as number}
                  </Text>
                ))}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Ionicons name="bar-chart" size={64} color="#ccc" />
          <Text style={styles.noDataText}>Nenhum dado encontrado</Text>
          <Text style={styles.noDataSubtext}>
            Use "Gerar Dados" para começar a análise
          </Text>
        </View>
      )}

      {/* Instruções */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>🔬 Como Usar</Text>
        <Text style={styles.instructionText}>
          1. Clique em "Gerar Dados" para criar 500 registros de exemplo
        </Text>
        <Text style={styles.instructionText}>
          2. Use "Exportar" para salvar os dados em formato JSON
        </Text>
        <Text style={styles.instructionText}>
          3. Use os scripts Python na pasta /python para análise avançada
        </Text>
        <Text style={styles.instructionText}>
          4. Execute: python gerador_dataset_ml.py
        </Text>
        <Text style={styles.instructionText}>
          5. Depois: python analisador_sugestoes.py
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2F4172",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#B0BEC5",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    minWidth: "45%",
    justifyContent: "center",
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    minWidth: "45%",
    justifyContent: "center",
    gap: 8,
  },
  refreshButton: {
    backgroundColor: "#FF9800",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    minWidth: "45%",
    justifyContent: "center",
    gap: 8,
  },
  dangerButton: {
    backgroundColor: "#F44336",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    minWidth: "45%",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  statsContainer: {
    padding: 16,
    gap: 16,
  },
  statCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  statItem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  noDataContainer: {
    padding: 40,
    alignItems: "center",
    gap: 16,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  noDataSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  instructionsContainer: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
});
