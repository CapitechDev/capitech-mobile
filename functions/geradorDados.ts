import AsyncStorage from "@react-native-async-storage/async-storage";
import { SugestaoData } from "./sugestao";
import Id from "./Id";

// Função para gerar dados fictícios para treinar o modelo
export async function gerarDadosFicticios(quantidade: number = 500) {
  const exemplos = [
    // HTML
    {
      pergunta: "Como criar uma página web?",
      palavra: "html",
      categoria: "html",
    },
    { pergunta: "O que são tags HTML?", palavra: "html", categoria: "html" },
    {
      pergunta: "Como fazer uma estrutura básica?",
      palavra: "estrutura",
      categoria: "html",
    },
    {
      pergunta: "Como criar um formulário?",
      palavra: "formulario",
      categoria: "html",
    },
    { pergunta: "O que é markup?", palavra: "markup", categoria: "html" },

    // CSS
    {
      pergunta: "Como estilizar minha página?",
      palavra: "estilo",
      categoria: "css",
    },
    {
      pergunta: "Como mudar cores no site?",
      palavra: "cores",
      categoria: "css",
    },
    { pergunta: "O que é CSS Grid?", palavra: "layout", categoria: "css" },
    {
      pergunta: "Como fazer um design responsivo?",
      palavra: "design",
      categoria: "css",
    },
    {
      pergunta: "Como usar seletores CSS?",
      palavra: "seletor",
      categoria: "css",
    },

    // JavaScript
    {
      pergunta: "Como criar uma função?",
      palavra: "funcao",
      categoria: "javascript",
    },
    {
      pergunta: "O que são variáveis?",
      palavra: "variavel",
      categoria: "javascript",
    },
    {
      pergunta: "Como fazer um loop?",
      palavra: "loop",
      categoria: "javascript",
    },
    {
      pergunta: "Como programar em JS?",
      palavra: "programacao",
      categoria: "javascript",
    },
    {
      pergunta: "O que é lógica de programação?",
      palavra: "logica",
      categoria: "javascript",
    },

    // SQL
    {
      pergunta: "Como criar uma consulta?",
      palavra: "consulta",
      categoria: "sql",
    },
    {
      pergunta: "O que é um banco de dados?",
      palavra: "banco",
      categoria: "sql",
    },
    { pergunta: "Como fazer um SELECT?", palavra: "select", categoria: "sql" },
    { pergunta: "Como criar uma tabela?", palavra: "tabela", categoria: "sql" },
    { pergunta: "O que é SQL?", palavra: "sql", categoria: "sql" },

    // Python
    {
      pergunta: "Como usar machine learning?",
      palavra: "learning",
      categoria: "python",
    },
    {
      pergunta: "O que é ciência de dados?",
      palavra: "ciencia",
      categoria: "python",
    },
    {
      pergunta: "Como criar um algoritmo?",
      palavra: "algoritmo",
      categoria: "python",
    },
    {
      pergunta: "Como automatizar tarefas?",
      palavra: "automacao",
      categoria: "python",
    },
    { pergunta: "O que é IA?", palavra: "ia", categoria: "python" },

    // React
    {
      pergunta: "Como criar um componente?",
      palavra: "componente",
      categoria: "react",
    },
    { pergunta: "O que é JSX?", palavra: "jsx", categoria: "react" },
    { pergunta: "Como usar hooks?", palavra: "hook", categoria: "react" },
    { pergunta: "O que é estado?", palavra: "estado", categoria: "react" },
    {
      pergunta: "Como fazer uma interface?",
      palavra: "interface",
      categoria: "react",
    },

    // Node.js
    {
      pergunta: "Como criar um servidor?",
      palavra: "servidor",
      categoria: "nodejs",
    },
    { pergunta: "O que é uma API?", palavra: "api", categoria: "nodejs" },
    { pergunta: "Como usar Express?", palavra: "express", categoria: "nodejs" },
    { pergunta: "O que é backend?", palavra: "backend", categoria: "nodejs" },
    {
      pergunta: "Como instalar pacotes?",
      palavra: "pacote",
      categoria: "nodejs",
    },

    // Carreira
    {
      pergunta: "Como conseguir um emprego?",
      palavra: "emprego",
      categoria: "carreira",
    },
    {
      pergunta: "Como fazer um currículo?",
      palavra: "curriculo",
      categoria: "carreira",
    },
    {
      pergunta: "Como me preparar para entrevista?",
      palavra: "entrevista",
      categoria: "carreira",
    },
    {
      pergunta: "Qual carreira seguir?",
      palavra: "carreira",
      categoria: "carreira",
    },
    {
      pergunta: "Como crescer profissionalmente?",
      palavra: "profissao",
      categoria: "carreira",
    },

    // Produtividade
    {
      pergunta: "Como melhorar minha produtividade?",
      palavra: "produtividade",
      categoria: "produtividade",
    },
    {
      pergunta: "Como gerenciar meu tempo?",
      palavra: "tempo",
      categoria: "produtividade",
    },
    {
      pergunta: "Como me organizar melhor?",
      palavra: "organizacao",
      categoria: "produtividade",
    },
    {
      pergunta: "Como manter o foco?",
      palavra: "foco",
      categoria: "produtividade",
    },
    {
      pergunta: "Como ser mais eficiente?",
      palavra: "eficiencia",
      categoria: "produtividade",
    },

    // Estudo
    {
      pergunta: "Como estudar melhor?",
      palavra: "estudo",
      categoria: "estudo",
    },
    {
      pergunta: "Como aprender mais rápido?",
      palavra: "aprendizado",
      categoria: "estudo",
    },
    { pergunta: "Qual curso fazer?", palavra: "curso", categoria: "estudo" },
    {
      pergunta: "Como me preparar para prova?",
      palavra: "prova",
      categoria: "estudo",
    },
    {
      pergunta: "Como adquirir conhecimento?",
      palavra: "conhecimento",
      categoria: "estudo",
    },
  ];

  const dadosGerados: SugestaoData[] = [];

  for (let i = 0; i < quantidade; i++) {
    const exemplo = exemplos[Math.floor(Math.random() * exemplos.length)];

    // Adiciona variações aleatórias
    const variacoes = [
      exemplo.pergunta,
      exemplo.pergunta.replace("Como ", "Como posso "),
      exemplo.pergunta.replace("O que é", "O que seria"),
      exemplo.pergunta + " na programação?",
      exemplo.pergunta + " para iniciantes?",
    ];

    const perguntaVariada =
      variacoes[Math.floor(Math.random() * variacoes.length)];

    const dado: SugestaoData = {
      id: Id.gerar(),
      palavra: exemplo.palavra,
      dataHora: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(), // Últimos 30 dias
      mensagemOriginal: perguntaVariada,
      categoria: exemplo.categoria,
      trilhaSugerida: obterTrilhaPorCategoria(exemplo.categoria),
      confianca: Math.random() * 0.3 + 0.7, // Entre 0.7 e 1.0
    };

    dadosGerados.push(dado);
  }

  return dadosGerados;
}

function obterTrilhaPorCategoria(categoria: string): string {
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

// Função para salvar dados fictícios no AsyncStorage
export async function salvarDadosFicticios(quantidade: number = 500) {
  try {
    const dadosGerados = await gerarDadosFicticios(quantidade);

    // Recupera dados existentes
    const sugestoesExistentes = await AsyncStorage.getItem("sugestoes");
    let sugestoes: SugestaoData[] = [];

    if (sugestoesExistentes) {
      sugestoes = JSON.parse(sugestoesExistentes);
    }

    // Adiciona novos dados
    sugestoes.push(...dadosGerados);

    // Salva no AsyncStorage
    await AsyncStorage.setItem("sugestoes", JSON.stringify(sugestoes));

    console.log(`${quantidade} dados fictícios gerados e salvos!`);
    return dadosGerados;
  } catch (error) {
    console.error("Erro ao salvar dados fictícios:", error);
    return [];
  }
}

// Função para exportar dados para análise
export async function exportarDadosParaAnalise(): Promise<any[]> {
  try {
    const sugestoesExistentes = await AsyncStorage.getItem("sugestoes");
    if (!sugestoesExistentes) {
      return [];
    }

    const sugestoes: SugestaoData[] = JSON.parse(sugestoesExistentes);

    // Prepara dados para análise de machine learning
    const dadosParaAnalise = sugestoes.map((sugestao) => ({
      id: sugestao.id,
      pergunta: sugestao.mensagemOriginal,
      palavra_chave: sugestao.palavra,
      categoria: sugestao.categoria,
      trilha_sugerida: sugestao.trilhaSugerida,
      confianca: sugestao.confianca,
      data_hora: sugestao.dataHora,
      mes: new Date(sugestao.dataHora).getMonth() + 1,
      dia_semana: new Date(sugestao.dataHora).getDay(),
      hora: new Date(sugestao.dataHora).getHours(),
      tamanho_pergunta: sugestao.mensagemOriginal.length,
      num_palavras: sugestao.mensagemOriginal.split(" ").length,
    }));

    return dadosParaAnalise;
  } catch (error) {
    console.error("Erro ao exportar dados:", error);
    return [];
  }
}

// Função para obter estatísticas para análise
export async function obterEstatisticasCompletas() {
  try {
    const dados = await exportarDadosParaAnalise();

    // Contagem por categoria
    const categorias = dados.reduce((acc, item) => {
      acc[item.categoria] = (acc[item.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Contagem por trilha
    const trilhas = dados.reduce((acc, item) => {
      acc[item.trilha_sugerida] = (acc[item.trilha_sugerida] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Palavras mais frequentes
    const palavras = dados.reduce((acc, item) => {
      acc[item.palavra_chave] = (acc[item.palavra_chave] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Estatísticas por tempo
    const porMes = dados.reduce((acc, item) => {
      acc[item.mes] = (acc[item.mes] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const porDiaSemana = dados.reduce((acc, item) => {
      acc[item.dia_semana] = (acc[item.dia_semana] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      total_registros: dados.length,
      categorias,
      trilhas,
      palavras_mais_frequentes: Object.entries(palavras)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 10)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      distribuicao_temporal: {
        por_mes: porMes,
        por_dia_semana: porDiaSemana,
      },
      confianca_media:
        dados.reduce((acc, item) => acc + item.confianca, 0) / dados.length,
      tamanho_medio_pergunta:
        dados.reduce((acc, item) => acc + item.tamanho_pergunta, 0) /
        dados.length,
    };
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error);
    return null;
  }
}
