# Sistema de Sugestões Capitech - Projeto Integrador

## Descrição

Este sistema implementa um fluxo completo de análise de perguntas dos usuários para gerar sugestões de trilhas de conteúdo, conforme especificado no Projeto Integrador da Fatec.

## Objetivo

Utilizar **Aprendizagem de Máquina** nos dados coletados das interações dos usuários com o chatbot para:

1. **Gerar dados sintéticos** (500 registros) usando biblioteca Faker
2. **Projetar uma rede neural** ou classificador para fazer previsões em novos dados
3. **Criar relatório completo** com metadados, código do classificador, desempenho e testes
4. **Desenvolver análise** para sugerir trilhas de conteúdo baseadas nos temas mais perguntados

## Arquitetura do Sistema

### 1. Coleta de Dados (React Native)

- **Webhook N8N**: `https://capitech2.app.n8n.cloud/webhook/sugestao`
- **Função**: `functions/sugestao.ts` - Processa mensagens e extrai palavras-chave
- **Armazenamento**: AsyncStorage para persistência local

### 2. Geração de Dados Sintéticos

- **Arquivo**: `functions/geradorDados.ts`
- **Quantidade**: 500 registros fictícios
- **Categorias**: HTML, CSS, JavaScript, SQL, Python, React, Node.js, Carreira, Produtividade, Estudo

### 3. Análise com Machine Learning (Python)

- **Dataset**: `python/gerador_dataset_ml.py`
- **Analisador**: `python/analisador_sugestoes.py`
- **Algoritmo**: Árvore de Decisão (Decision Tree)
- **Métricas**: Acurácia, Matriz de Confusão, Classification Report

## Estrutura dos Dados

### Campos Coletados:

```typescript
interface SugestaoData {
  id: string; // ID único
  palavra: string; // Palavra-chave extraída
  dataHora: string; // Timestamp
  mensagemOriginal: string; // Pergunta original
  categoria: string; // Categoria classificada
  trilhaSugerida?: string; // Trilha recomendada
  confianca?: number; // Confiança da classificação
}
```

### Features para Machine Learning:

- `tamanho_pergunta`: Número de caracteres
- `num_palavras`: Número de palavras
- `mes`: Mês da pergunta
- `dia_semana`: Dia da semana
- `hora`: Hora do dia
- `confianca`: Confiança da classificação
- `periodo_do_dia`: Manhã, tarde, noite, madrugada
- `fim_de_semana`: Boolean
- `usuario_tipo`: Iniciante, intermediário, avançado
- `dispositivo`: Mobile, desktop, tablet

## Como Usar

### 1. Configuração do Ambiente

```bash
# Instalar dependências Python
cd python
pip install -r requirements.txt
```

### 2. Gerar Dados Fictícios

```bash
# Gerar dataset para ML
python gerador_dataset_ml.py

# Ou usar dados simples
python gerador_dados_ficticios.py
```

### 3. Executar Análise

```bash
# Análise completa com ML
python analisador_sugestoes.py
```

### 4. No React Native

```typescript
// Usar o painel de análise
import PainelAnalise from "../components/PainelAnalise";

// Gerar dados fictícios
await salvarDadosFicticios(500);

// Exportar dados para análise
const dados = await exportarDadosParaAnalise();
```

## Fluxo de Funcionamento

1. **Usuário faz pergunta** no chat
2. **Mensagem é enviada** para dois webhooks:
   - `capibot`: Resposta do chatbot
   - `sugestao`: Extração de palavra-chave
3. **Palavra-chave é categorizada** automaticamente
4. **Dados são salvos** no AsyncStorage
5. **Análise periódica** gera recomendações de trilhas

## Relatórios Gerados

### Análise Automática:

- Distribuição por categoria
- Palavras mais frequentes
- Padrões temporais
- Trilhas mais demandadas
- Recomendações de conteúdo

### Visualizações:

- Gráficos de distribuição
- Análise temporal
- Matriz de confusão
- Métricas de desempenho

## Resultados Esperados

### 1. Identificação de Tendências

- Temas mais perguntados
- Horários de maior atividade
- Padrões de comportamento

### 2. Recomendações Estratégicas

- Trilhas prioritárias para desenvolvimento
- Conteúdo em alta demanda
- Gaps de conhecimento

### 3. Métricas de Qualidade

- Acurácia do classificador
- Confiança nas predições
- Distribuição balanceada

## Arquivos Principais

### React Native:

- `functions/sugestao.ts` - Processamento de sugestões
- `functions/geradorDados.ts` - Geração de dados fictícios
- `functions/chat.ts` - Integração com chatbot
- `components/PainelAnalise.tsx` - Interface de análise

### Python:

- `python/gerador_dataset_ml.py` - Dataset para ML
- `python/analisador_sugestoes.py` - Análise completa
- `python/requirements.txt` - Dependências

## Próximos Passos

1. **Implementar** sistema em produção
2. **Coletar** dados reais dos usuários
3. **Refinar** algoritmos de classificação
4. **Desenvolver** trilhas baseadas nas análises
5. **Monitorar** performance e ajustar modelo

## Tecnologias Utilizadas

- **React Native**: Interface e coleta de dados
- **N8N**: Processamento de webhooks
- **AsyncStorage**: Armazenamento local
- **Python**: Análise de dados
- **Scikit-learn**: Machine Learning
- **Pandas**: Manipulação de dados
- **Matplotlib/Seaborn**: Visualizações

## Contribuição

Este projeto faz parte do Projeto Integrador da Fatec e demonstra a aplicação prática de Machine Learning em sistemas educacionais para personalização de conteúdo.

---

**Desenvolvido por**: [Seu Nome]  
**Instituição**: Fatec Centro Paula Souza  
**Projeto**: Capitech Mobile  
**Data**: Julho 2025
