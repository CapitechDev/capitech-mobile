# Como Acessar o Painel de Análise de Dados

## 📱 Acesso pela Aplicação

### 1. Iniciar a Aplicação

```bash
# No terminal, na pasta do projeto
npm start
# ou
expo start
```

### 2. Fazer Login

- Abra a aplicação no seu dispositivo/emulador
- Faça login com suas credenciais

### 3. Acessar o Painel de Análise

- Toque no **menu hambúrguer** (≡) no canto superior
- Selecione **"Análise de Dados"** na lista do menu
- O painel será aberto com todas as funcionalidades

## 🔧 Funcionalidades Disponíveis

### No Painel de Análise você pode:

#### 1. **Gerar Dados Fictícios**

- Botão verde "Gerar Dados"
- Cria 500 registros de exemplo para análise
- Útil para testar o sistema e treinar modelos

#### 2. **Exportar Dados**

- Botão azul "Exportar"
- Exporta todos os dados em formato JSON
- Os dados aparecem no console para análise

#### 3. **Atualizar Estatísticas**

- Botão laranja "Atualizar"
- Recarrega as estatísticas em tempo real
- Útil após gerar novos dados

#### 4. **Limpar Dados**

- Botão vermelho "Limpar"
- Remove todos os dados salvos
- **CUIDADO**: Ação irreversível!

## 📊 Visualizações Disponíveis

### Informações Gerais

- Total de registros coletados
- Confiança média das classificações
- Tamanho médio das perguntas

### Distribuição por Categoria

- HTML, CSS, JavaScript, SQL, Python
- React, Node.js, Carreira, Produtividade, Estudo
- Contagem de perguntas por categoria

### Palavras Mais Frequentes

- Top 5 palavras-chave mais perguntadas
- Frequência de cada palavra
- Útil para identificar tendências

## 🐍 Análise Avançada com Python

### 1. Exportar Dados da App

- Use o botão "Exportar" no painel
- Copie os dados JSON do console
- Salve em um arquivo `dados_sugestoes.json`

### 2. Executar Scripts Python

```bash
# Navegar para a pasta python
cd python

# Instalar dependências
pip install -r requirements.txt

# Gerar dataset completo (cria dataset_ml_capitech.json)
python gerador_dataset_ml.py

# Executar análise completa
python analisador_sugestoes.py
```

### 3. Resultados da Análise

- **Gráficos**: Salvo como `analise_sugestoes.png`
- **Modelo ML**: Salvo como `modelo_sugestoes.pkl`
- **Relatório**: Exibido no console
- **Recomendações**: Trilhas prioritárias para desenvolvimento

## 🔄 Fluxo Completo de Uso

### Para Teste/Demonstração:

1. **Gerar Dados** → Cria dados fictícios para demonstração
2. **Visualizar** → Vê estatísticas no painel da app
3. **Exportar** → Salva dados para análise Python
4. **Analisar** → Executa scripts Python para insights

### Para Uso Real:

1. **Usar o Chat** → Usuários fazem perguntas normalmente
2. **Coleta Automática** → Sistema salva palavras-chave automaticamente
3. **Monitorar** → Verifica estatísticas periodicamente no painel
4. **Analisar** → Executa análise Python para decisões estratégicas

## 🚨 Dicas Importantes

### ✅ Do's

- Gere dados fictícios para testar funcionalidades
- Exporte dados regularmente para backup
- Use análise Python para insights profundos
- Monitore estatísticas para entender tendências

### ❌ Don'ts

- Não limpe dados reais sem backup
- Não ignore as recomendações da análise
- Não deixe de atualizar estatísticas regularmente

## 📋 Checklist de Uso

- [ ] Aplicação rodando e login feito
- [ ] Menu acessível e painel de análise funcionando
- [ ] Dados gerados ou coletados
- [ ] Estatísticas visualizadas
- [ ] Dados exportados (se necessário)
- [ ] Análise Python executada (opcional)
- [ ] Insights aplicados no desenvolvimento de conteúdo

---

**Localização na App**: Menu → Análise de Dados  
**Arquivos Relacionados**: `/app/(protected)/analise/index.tsx`  
**Componente**: `/components/PainelAnaliseSimples.tsx`
