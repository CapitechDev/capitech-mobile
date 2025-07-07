import { useState, useEffect } from "react";
import {
  obterTodasSugestoes,
  obterEstatisticasPalavras,
  limparSugestoes,
  SugestaoData,
} from "../functions/sugestao";

export default function useSugestoes() {
  const [sugestoes, setSugestoes] = useState<SugestaoData[]>([]);
  const [estatisticas, setEstatisticas] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  // Carrega as sugestões do AsyncStorage
  const carregarSugestoes = async () => {
    setLoading(true);
    try {
      const sugestoesCarregadas = await obterTodasSugestoes();
      setSugestoes(sugestoesCarregadas);
    } catch (error) {
      console.error("Erro ao carregar sugestões:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega as estatísticas das palavras
  const carregarEstatisticas = async () => {
    try {
      const stats = await obterEstatisticasPalavras();
      setEstatisticas(stats);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  // Limpa todas as sugestões
  const limparTodasSugestoes = async () => {
    try {
      await limparSugestoes();
      setSugestoes([]);
      setEstatisticas({});
    } catch (error) {
      console.error("Erro ao limpar sugestões:", error);
    }
  };

  // Obtém as palavras mais usadas ordenadas
  const obterPalavrasMaisUsadas = (limite: number = 10) => {
    return Object.entries(estatisticas)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limite)
      .map(([palavra, quantidade]) => ({ palavra, quantidade }));
  };

  // Carrega dados iniciais
  useEffect(() => {
    carregarSugestoes();
    carregarEstatisticas();
  }, []);

  // Atualiza estatísticas quando sugestões mudam
  useEffect(() => {
    if (sugestoes.length > 0) {
      carregarEstatisticas();
    }
  }, [sugestoes]);

  return {
    sugestoes,
    estatisticas,
    loading,
    carregarSugestoes,
    carregarEstatisticas,
    limparTodasSugestoes,
    obterPalavrasMaisUsadas,
    totalSugestoes: sugestoes.length,
    totalPalavrasUnicas: Object.keys(estatisticas).length,
  };
}
