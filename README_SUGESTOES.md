# Sistema de Sugestões e Análise de Temas

Este sistema coleta automaticamente as palavras-chave dos temas perguntados no chat e permite análise para criação de trilhas de conteúdo.

## 🚀 Como Funciona

### 1. Coleta Automática

- Toda vez que um usuário envia uma mensagem para o chat, ela é enviada para dois webhooks:
  - **Webhook Principal**: `https://capitech2.app.n8n.cloud/webhook/capibot` (resposta do chat)
  - **Webhook de Sugestão**: `https://capitech2.app.n8n.cloud/webhook/sugestao` (extração da palavra-chave)

### 2. Armazenamento

- As palavras-chave são salvas automaticamente no AsyncStorage do dispositivo
- Cada registro contém: ID, palavra-chave, data/hora, mensagem original

### 3. Análise

- Interface para visualizar estatísticas em tempo real
- Script Python para análise avançada e árvore de decisão
- Exportação de dados para análise externa

## 📁 Arquivos Criados

### Functions

- **`functions/sugestao.ts`** - Função principal para obter sugestões do N8N
- **`functions/exportarDados.ts`** - Exportar dados para análise externa
- **`functions/chat.ts`** - Modificado para chamar sugestão em paralelo

### Hooks

- **`hooks/useSugestoes.ts`** - Hook para gerenciar dados de sugestões

### Components

- **`components/EstatisticasSugestoes.tsx`** - Componente para visualizar estatísticas

### Scripts

- **`scripts/analise_sugestoes.py`** - Script Python para análise avançada

## 🛠️ Como Usar

### 1. Visualizar Estatísticas no App

```typescript
import EstatisticasSugestoes from "../components/EstatisticasSugestoes";

// Em qualquer tela
<EstatisticasSugestoes />;
```

### 2. Usar Hook de Sugestões

```typescript
import useSugestoes from "../hooks/useSugestoes";

function MinhaComponent() {
  const { sugestoes, estatisticas, obterPalavrasMaisUsadas, totalSugestoes } =
    useSugestoes();

  const top5 = obterPalavrasMaisUsadas(5);

  return (
    <View>
      <Text>Total: {totalSugestoes}</Text>
      {top5.map((item) => (
        <Text key={item.palavra}>
          {item.palavra}: {item.quantidade}
        </Text>
      ))}
    </View>
  );
}
```

### 3. Exportar Dados para Análise

```typescript
import {
  exportarSugestoesParaJSON,
  obterRelatorioDados,
} from "../functions/exportarDados";

// Exportar JSON
await exportarSugestoesParaJSON();

// Obter relatório simples
const relatorio = await obterRelatorioDados();
console.log(relatorio);
```

### 4. Análise Avançada com Python

```bash
# 1. Exporte os dados do app (função exportarSugestoesParaJSON)
# 2. Salve como 'sugestoes.json' na pasta scripts/
# 3. Execute:
cd scripts
python analise_sugestoes.py
```

## 🔧 Configuração do N8N

### Webhook de Sugestão

- URL: `https://capitech2.app.n8n.cloud/webhook/sugestao`
- Método: POST
- Body: `{ "mensagem": "texto da pergunta" }`

### Prompt do Agente IA

```
Extraia apenas o tema principal desta pergunta em UMA ÚNICA palavra que resuma o assunto.
Exemplos:

Pergunta: "Como posso melhorar minha produtividade no trabalho?" → Palavra: produtividade
Pergunta: "Qual é o melhor horário para treinar?" → Palavra: treino
```

## 📊 Estrutura dos Dados

### Registro de Sugestão

```typescript
interface SugestaoData {
  id: string; // ID único
  palavra: string; // Palavra-chave extraída
  dataHora: string; // Data e hora ISO
  mensagemOriginal: string; // Mensagem original do usuário
}
```

### Exemplo de Dados

```json
[
  {
    "id": "abc123",
    "palavra": "programacao",
    "dataHora": "2025-01-15T10:30:00Z",
    "mensagemOriginal": "Como aprender programação em Python?"
  }
]
```

## 🎯 Casos de Uso

### 1. Identificar Temas Populares

- Visualizar quais assuntos são mais perguntados
- Priorizar criação de conteúdo

### 2. Análise Temporal

- Descobrir horários de maior atividade
- Identificar tendências sazonais

### 3. Recomendação de Trilhas

- Usar árvore de decisão para sugerir trilhas
- Personalizar conteúdo baseado na demanda

### 4. Métricas de Engajamento

- Acompanhar evolução dos temas
- Medir efetividade do conteúdo

## 🚨 Importantes

1. **Privacidade**: Os dados são armazenados localmente no dispositivo
2. **Performance**: A chamada para sugestão não bloqueia o chat principal
3. **Fallback**: Se o webhook de sugestão falhar, o chat continua funcionando
4. **Limpeza**: Função para limpar dados antigos disponível

## 🔮 Próximos Passos

1. **Implementar sincronização com servidor** (opcional)
2. **Adicionar filtros por data/período**
3. **Criar dashboard web para análise**
4. **Implementar alertas para novos temas**
5. **Integrar com sistema de recomendação de trilhas**

## 📱 Dependências Adicionais (Opcionais)

Para funcionalidades completas de exportação:

```bash
expo install expo-file-system expo-sharing
```

Para análise Python:

```bash
pip install pandas matplotlib seaborn scikit-learn
```

---

🎉 **Sistema pronto para uso!** Toda mensagem enviada ao chat agora também alimenta automaticamente o sistema de análise de temas.
