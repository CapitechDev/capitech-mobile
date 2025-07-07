import AsyncStorage from "@react-native-async-storage/async-storage";
import Id from "./Id";

export interface SugestaoData {
  id: string;
  palavra: string;
  dataHora: string;
  mensagemOriginal: string;
  categoria: string;
  trilhaSugerida?: string;
  confianca?: number;
}

// Mapeamento de palavras para trilhas/categorias
export const CATEGORIAS_TRILHAS = {
  html: [
    "html",
    "estrutura",
    "pagina",
    "site",
    "web",
    "markup",
    "tag",
    "elemento",
  ],
  css: [
    "css",
    "estilo",
    "design",
    "layout",
    "visual",
    "cores",
    "seletor",
    "propriedade",
  ],
  javascript: [
    "javascript",
    "js",
    "programacao",
    "logica",
    "funcao",
    "variavel",
    "loop",
    "condicional",
  ],
  sql: [
    "sql",
    "banco",
    "dados",
    "tabela",
    "consulta",
    "database",
    "query",
    "select",
  ],
  python: [
    "python",
    "automacao",
    "ciencia",
    "dados",
    "machine",
    "learning",
    "algoritmo",
    "ia",
  ],
  react: [
    "react",
    "componente",
    "frontend",
    "interface",
    "ui",
    "jsx",
    "hook",
    "estado",
  ],
  nodejs: ["node", "backend", "servidor", "api", "express", "npm", "pacote"],
  carreira: [
    "carreira",
    "profissao",
    "trabalho",
    "entrevista",
    "curriculo",
    "emprego",
  ],
  produtividade: [
    "produtividade",
    "tempo",
    "organizacao",
    "foco",
    "eficiencia",
    "planejamento",
  ],
  estudo: [
    "estudo",
    "aprendizado",
    "curso",
    "faculdade",
    "prova",
    "conhecimento",
  ],
  geral: [], // categoria padrão
};

export default async function obterSugestao(
  mensagem: string
): Promise<string | null> {
  const webhookUrl = "https://capitech2.app.n8n.cloud/webhook/sugestao";

  try {
    const resposta = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mensagem: mensagem,
      }),
    });

    let resultado = await resposta.json();

    // 1. Tenta pegar resposta direta
    if (
      resultado &&
      typeof resultado.resposta === "string" &&
      resultado.resposta.trim() !== ""
    ) {
      const palavra = resultado.resposta.trim();
      await salvarSugestaoNoBanco(palavra, mensagem);
      return palavra;
    }

    // 2. Tenta pegar output direto
    if (
      resultado &&
      typeof resultado.output === "string" &&
      resultado.output.trim() !== ""
    ) {
      const palavra = resultado.output.trim();
      await salvarSugestaoNoBanco(palavra, mensagem);
      return palavra;
    }

    // 3. Tenta buscar resposta em string JSON aninhada
    const keys = Object.keys(resultado);
    if (keys.length === 1 && typeof keys[0] === "string") {
      try {
        const inner = JSON.parse(keys[0]);
        if (
          inner &&
          typeof inner.resposta === "string" &&
          inner.resposta.trim() !== ""
        ) {
          const palavra = inner.resposta.trim();
          await salvarSugestaoNoBanco(palavra, mensagem);
          return palavra;
        }
        if (
          inner &&
          typeof inner.output === "string" &&
          inner.output.trim() !== ""
        ) {
          const palavra = inner.output.trim();
          await salvarSugestaoNoBanco(palavra, mensagem);
          return palavra;
        }
      } catch {}
    }

    // 4. Busca recursiva por output
    function findOutput(obj: any): string | null {
      if (!obj || typeof obj !== "object") return null;
      if (typeof obj.output === "string" && obj.output.trim() !== "")
        return obj.output;
      for (const key of Object.keys(obj)) {
        const found = findOutput(obj[key]);
        if (found) return found;
      }
      return null;
    }

    const found = findOutput(resultado);
    if (found) {
      const palavra = found.trim();
      await salvarSugestaoNoBanco(palavra, mensagem);
      return palavra;
    }

    return null;
  } catch (error) {
    console.error("Erro ao obter sugestão:", error);
    return null;
  }
}

// Função para categorizar uma palavra-chave
export function categorizarPalavraChave(palavra: string): string {
  const palavraLower = palavra.toLowerCase();

  for (const [categoria, palavrasChave] of Object.entries(CATEGORIAS_TRILHAS)) {
    if (categoria === "geral") continue;

    const pertenceCategoria = palavrasChave.some(
      (pc) => palavraLower.includes(pc) || pc.includes(palavraLower)
    );

    if (pertenceCategoria) {
      return categoria;
    }
  }

  return "geral";
}

// Função para sugerir trilha baseada na categoria
export function sugerirTrilha(categoria: string): string {
  const trilhas: Record<string, string> = {
    html: "Fundamentos de HTML",
    css: "Estilização com CSS",
    javascript: "Programação JavaScript",
    sql: "Banco de Dados SQL",
    python: "Python para Ciência de Dados",
    react: "Desenvolvimento React",
    nodejs: "Backend com Node.js",
    carreira: "Desenvolvimento de Carreira",
    produtividade: "Produtividade e Gestão",
    estudo: "Técnicas de Estudo",
    geral: "Desenvolvimento Geral",
  };

  return trilhas[categoria] || trilhas["geral"];
}

async function salvarSugestaoNoBanco(
  palavra: string,
  mensagemOriginal: string
) {
  try {
    const categoria = categorizarPalavraChave(palavra);
    const trilhaSugerida = sugerirTrilha(categoria);

    const sugestao: SugestaoData = {
      id: Id.gerar(),
      palavra: palavra,
      dataHora: new Date().toISOString(),
      mensagemOriginal: mensagemOriginal,
      categoria: categoria,
      trilhaSugerida: trilhaSugerida,
      confianca: Math.random() * 0.3 + 0.7, // Simula confiança entre 0.7 e 1.0
    };

    // Recupera sugestões existentes
    const sugestoesExistentes = await AsyncStorage.getItem("sugestoes");
    let sugestoes: SugestaoData[] = [];

    if (sugestoesExistentes) {
      sugestoes = JSON.parse(sugestoesExistentes);
    }

    // Adiciona nova sugestão
    sugestoes.push(sugestao);

    // Salva de volta no AsyncStorage
    await AsyncStorage.setItem("sugestoes", JSON.stringify(sugestoes));

    console.log("Sugestão salva:", sugestao);
  } catch (error) {
    console.error("Erro ao salvar sugestão:", error);
  }
}

// Função para recuperar todas as sugestões
export async function obterTodasSugestoes(): Promise<SugestaoData[]> {
  try {
    const sugestoesExistentes = await AsyncStorage.getItem("sugestoes");
    if (sugestoesExistentes) {
      return JSON.parse(sugestoesExistentes);
    }
    return [];
  } catch (error) {
    console.error("Erro ao obter sugestões:", error);
    return [];
  }
}

// Função para obter estatísticas das palavras mais usadas
export async function obterEstatisticasPalavras(): Promise<
  Record<string, number>
> {
  try {
    const sugestoes = await obterTodasSugestoes();
    const contagem: Record<string, number> = {};

    sugestoes.forEach((sugestao) => {
      const palavra = sugestao.palavra.toLowerCase();
      contagem[palavra] = (contagem[palavra] || 0) + 1;
    });

    return contagem;
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error);
    return {};
  }
}

// Função para limpar todas as sugestões (útil para testes)
export async function limparSugestoes(): Promise<void> {
  try {
    await AsyncStorage.removeItem("sugestoes");
    console.log("Sugestões limpas");
  } catch (error) {
    console.error("Erro ao limpar sugestões:", error);
  }
}
