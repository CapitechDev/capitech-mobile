import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { obterEstatisticasCompletas } from "../functions/geradorDados";
import { exportarDadosParaAnalise } from "../functions/geradorDados";
import { salvarDadosFicticios } from "../functions/geradorDados";
import { limparSugestoes } from "../functions/sugestao";

interface EstatisticasData {
  total_registros: number;
  categorias: Record<string, number>;
  trilhas: Record<string, number>;
  palavras_mais_frequentes: Record<string, number>;
  distribuicao_temporal: {
    por_mes: Record<number, number>;
    por_dia_semana: Record<number, number>;
  };
  confianca_media: number;
  tamanho_medio_pergunta: number;
}

export default function PainelAnalise() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [dadosExportados, setDadosExportados] = useState(false);

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
        "Isso irá gerar 500 registros de exemplo. Continuar?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Confirmar",
            onPress: async () => {
              await salvarDadosFicticios(500);
              Alert.alert("Sucesso", "Dados fictícios gerados com sucesso!");
              carregarEstatisticas();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao gerar dados fictícios:", error);
      Alert.alert("Erro", "Falha ao gerar dados fictícios");
    }
  };

  const exportarDados = async () => {
    try {
      const dados = await exportarDadosParaAnalise();
      if (dados.length > 0) {
        // Aqui você pode implementar a lógica para salvar em arquivo
        // Por exemplo, usar react-native-fs ou similar
        console.log("Dados exportados:", dados);
        setDadosExportados(true);
        Alert.alert(
          "Dados Exportados",
          `${dados.length} registros exportados com sucesso!\nPara análise em Python, use os dados no console.`
        );
      } else {
        Alert.alert("Aviso", "Nenhum dado encontrado para exportar");
      }
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      Alert.alert("Erro", "Falha ao exportar dados");
    }
  };

  const limparTodosDados = async () => {
    Alert.alert(
      "Limpar Dados",
      "Isso irá remover todos os dados salvos. Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            await limparSugestoes();
            setEstatisticas(null);
            Alert.alert("Sucesso", "Todos os dados foram removidos");
          },
        },
      ]
    );
  };

  const getDiaSemana = (dia: number) => {
    const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    return dias[dia];
  };

  const getMes = (mes: number) => {
    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    return meses[mes - 1];
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando estatísticas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Painel de Análise</Text>
        <Text style={styles.subtitle}>Sistema de Sugestões Capitech</Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={gerarDadosFicticios}>
          <Text style={styles.buttonText}>Gerar Dados Fictícios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={exportarDados}>
          <Text style={styles.buttonText}>Exportar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={carregarEstatisticas}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={limparTodosDados}
        >
          <Text style={styles.buttonText}>Limpar Dados</Text>
        </TouchableOpacity>
      </View>

      {estatisticas ? (
        <>
          {/* Informações Gerais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Informações Gerais</Text>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total de Registros:</Text>
              <Text style={styles.statValue}>
                {estatisticas.total_registros}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Confiança Média:</Text>
              <Text style={styles.statValue}>
                {estatisticas.confianca_media.toFixed(3)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Tamanho Médio da Pergunta:</Text>
              <Text style={styles.statValue}>
                {estatisticas.tamanho_medio_pergunta.toFixed(1)} caracteres
              </Text>
            </View>
          </View>

          {/* Distribuição por Categoria */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              🎯 Distribuição por Categoria
            </Text>
            {Object.entries(estatisticas.categorias).map(
              ([categoria, count]) => (
                <View key={categoria} style={styles.statItem}>
                  <Text style={styles.statLabel}>{categoria}:</Text>
                  <Text style={styles.statValue}>{count}</Text>
                </View>
              )
            )}
          </View>

          {/* Trilhas Mais Sugeridas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🛤️ Trilhas Mais Sugeridas</Text>
            {Object.entries(estatisticas.trilhas).map(([trilha, count]) => (
              <View key={trilha} style={styles.statItem}>
                <Text style={styles.statLabel}>{trilha}:</Text>
                <Text style={styles.statValue}>{count}</Text>
              </View>
            ))}
          </View>

          {/* Palavras Mais Frequentes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔑 Palavras Mais Frequentes</Text>
            {Object.entries(estatisticas.palavras_mais_frequentes).map(
              ([palavra, count]) => (
                <View key={palavra} style={styles.statItem}>
                  <Text style={styles.statLabel}>{palavra}:</Text>
                  <Text style={styles.statValue}>{count}</Text>
                </View>
              )
            )}
          </View>

          {/* Distribuição Temporal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Distribuição Temporal</Text>

            <Text style={styles.subsectionTitle}>Por Mês:</Text>
            {Object.entries(estatisticas.distribuicao_temporal.por_mes).map(
              ([mes, count]) => (
                <View key={mes} style={styles.statItem}>
                  <Text style={styles.statLabel}>{getMes(parseInt(mes))}:</Text>
                  <Text style={styles.statValue}>{count}</Text>
                </View>
              )
            )}

            <Text style={styles.subsectionTitle}>Por Dia da Semana:</Text>
            {Object.entries(
              estatisticas.distribuicao_temporal.por_dia_semana
            ).map(([dia, count]) => (
              <View key={dia} style={styles.statItem}>
                <Text style={styles.statLabel}>
                  {getDiaSemana(parseInt(dia))}:
                </Text>
                <Text style={styles.statValue}>{count}</Text>
              </View>
            ))}
          </View>

          {/* Instruções para Análise */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔬 Próximos Passos</Text>
            <Text style={styles.instructionText}>
              1. Exporte os dados usando o botão "Exportar Dados"
            </Text>
            <Text style={styles.instructionText}>
              2. Use os scripts Python na pasta /python para análise avançada
            </Text>
            <Text style={styles.instructionText}>
              3. Execute: python gerador_dataset_ml.py
            </Text>
            <Text style={styles.instructionText}>
              4. Depois: python analisador_sugestoes.py
            </Text>
            <Text style={styles.instructionText}>
              5. Analise os gráficos e recomendações geradas
            </Text>
          </View>

          {dadosExportados && (
            <View style={styles.exportInfo}>
              <Text style={styles.exportText}>
                ✅ Dados exportados! Verifique o console para os dados em
                formato JSON.
              </Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>Nenhum dado encontrado</Text>
          <Text style={styles.noDataSubtext}>
            Use o botão "Gerar Dados Fictícios" para começar a análise
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#6200ea",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "#e1bee7",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: "48%",
    alignItems: "center",
  },
  dangerButton: {
    backgroundColor: "#d32f2f",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  section: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#555",
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  exportInfo: {
    backgroundColor: "#e8f5e8",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderColor: "#4caf50",
    borderWidth: 1,
  },
  exportText: {
    color: "#2e7d32",
    textAlign: "center",
    fontWeight: "bold",
  },
  noData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
  },
  noDataSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
});
