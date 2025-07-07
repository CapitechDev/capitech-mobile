import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
// import * as Sharing from 'expo-sharing'; // Descomente se instalar expo-sharing

export async function exportarSugestoesParaJSON(): Promise<void> {
  try {
    // Buscar dados do AsyncStorage
    const sugestoesString = await AsyncStorage.getItem("sugestoes");

    if (!sugestoesString) {
      console.log("Nenhuma sugestão encontrada para exportar");
      return;
    }

    const sugestoes = JSON.parse(sugestoesString);

    // Criar arquivo JSON
    const jsonString = JSON.stringify(sugestoes, null, 2);

    // Salvar arquivo
    const fileName = `sugestoes_${new Date().toISOString().split("T")[0]}.json`;
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, jsonString);

    // Compartilhar arquivo (descomente se instalar expo-sharing)
    // if (await Sharing.isAvailableAsync()) {
    //   await Sharing.shareAsync(fileUri, {
    //     mimeType: 'application/json',
    //     dialogTitle: 'Exportar Sugestões',
    //   });
    // }

    console.log(`Arquivo exportado: ${fileName}`);
  } catch (error) {
    console.error("Erro ao exportar sugestões:", error);
  }
}

export async function obterRelatorioDados(): Promise<string> {
  try {
    const sugestoesString = await AsyncStorage.getItem("sugestoes");

    if (!sugestoesString) {
      return "Nenhuma sugestão encontrada";
    }

    const sugestoes = JSON.parse(sugestoesString);

    // Calcular estatísticas
    const totalSugestoes = sugestoes.length;
    const palavrasUnicas = new Set(
      sugestoes.map((s: any) => s.palavra.toLowerCase())
    ).size;

    // Contar palavras
    const contadorPalavras: Record<string, number> = {};
    sugestoes.forEach((s: any) => {
      const palavra = s.palavra.toLowerCase();
      contadorPalavras[palavra] = (contadorPalavras[palavra] || 0) + 1;
    });

    // Top 5 palavras
    const top5 = Object.entries(contadorPalavras)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([palavra, count]) => `${palavra}: ${count}x`)
      .join("\n");

    // Primeira e última data
    const datas = sugestoes.map((s: any) => new Date(s.dataHora));
    const primeiraData = new Date(
      Math.min(...datas.map((d: Date) => d.getTime()))
    );
    const ultimaData = new Date(
      Math.max(...datas.map((d: Date) => d.getTime()))
    );

    return `📊 RELATÓRIO DE SUGESTÕES
    
Total de perguntas: ${totalSugestoes}
Temas únicos: ${palavrasUnicas}
Período: ${primeiraData.toLocaleDateString()} a ${ultimaData.toLocaleDateString()}

🔝 Top 5 temas mais perguntados:
${top5}

💡 Para análise avançada, exporte os dados e use o script Python.`;
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    return "Erro ao gerar relatório";
  }
}
