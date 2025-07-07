import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder, StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import json

class AnalisadorSugestoes:
    def __init__(self):
        self.modelo = None
        self.label_encoder = LabelEncoder()
        self.scaler = StandardScaler()
        self.features = []
        self.target = []
        
    def carregar_dados(self, caminho_arquivo):
        """Carrega dados do arquivo JSON exportado do React Native"""
        try:
            with open(caminho_arquivo, 'r', encoding='utf-8') as f:
                dados = json.load(f)
            
            df = pd.DataFrame(dados)
            print(f"Dados carregados: {len(df)} registros")
            return df
        except Exception as e:
            print(f"Erro ao carregar dados: {e}")
            return None
    
    def preparar_dados(self, df):
        """Prepara os dados para análise"""
        # Features para o modelo
        features = ['tamanho_pergunta', 'num_palavras', 'mes', 'dia_semana', 'hora', 'confianca']
        
        # Remove registros com valores nulos
        df_clean = df.dropna(subset=features + ['categoria'])
        
        # Prepara features
        X = df_clean[features]
        
        # Target (categoria)
        y = df_clean['categoria']
        
        # Codifica labels
        y_encoded = self.label_encoder.fit_transform(y)
        
        # Normaliza features
        X_scaled = self.scaler.fit_transform(X)
        
        return X_scaled, y_encoded, df_clean
    
    def treinar_modelo(self, X, y):
        """Treina o modelo de árvore de decisão"""
        # Divide dados em treino e teste
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Treina árvore de decisão
        self.modelo = DecisionTreeClassifier(
            random_state=42,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2
        )
        self.modelo.fit(X_train, y_train)
        
        # Avalia modelo
        y_pred = self.modelo.predict(X_test)
        
        print("Relatório de Classificação:")
        print(classification_report(y_test, y_pred, 
                                    target_names=self.label_encoder.classes_))
        
        return X_test, y_test, y_pred
    
    def gerar_relatorio_completo(self, df):
        """Gera relatório completo da análise"""
        print("=" * 60)
        print("RELATÓRIO DE ANÁLISE DOS DADOS DE SUGESTÕES")
        print("=" * 60)
        
        # Informações gerais
        print(f"\n📊 INFORMAÇÕES GERAIS:")
        print(f"Total de registros: {len(df)}")
        print(f"Período: {df['data_hora'].min()} a {df['data_hora'].max()}")
        print(f"Categorias únicas: {df['categoria'].nunique()}")
        print(f"Palavras-chave únicas: {df['palavra_chave'].nunique()}")
        
        # Estatísticas das perguntas
        print(f"\n📝 ESTATÍSTICAS DAS PERGUNTAS:")
        print(f"Tamanho médio da pergunta: {df['tamanho_pergunta'].mean():.1f} caracteres")
        print(f"Número médio de palavras: {df['num_palavras'].mean():.1f}")
        print(f"Confiança média: {df['confianca'].mean():.3f}")
        
        # Distribuição por categoria
        print(f"\n🎯 DISTRIBUIÇÃO POR CATEGORIA:")
        categoria_counts = df['categoria'].value_counts()
        for categoria, count in categoria_counts.items():
            porcentagem = (count / len(df)) * 100
            print(f"  {categoria}: {count} ({porcentagem:.1f}%)")
        
        # Palavras mais frequentes
        print(f"\n🔑 PALAVRAS-CHAVE MAIS FREQUENTES:")
        palavra_counts = df['palavra_chave'].value_counts().head(10)
        for palavra, count in palavra_counts.items():
            print(f"  {palavra}: {count}")
        
        # Trilhas mais sugeridas
        print(f"\n🛤️ TRILHAS MAIS SUGERIDAS:")
        trilha_counts = df['trilha_sugerida'].value_counts().head(10)
        for trilha, count in trilha_counts.items():
            print(f"  {trilha}: {count}")
        
        # Distribuição temporal
        print(f"\n📅 DISTRIBUIÇÃO TEMPORAL:")
        print("Por mês:")
        mes_counts = df['mes'].value_counts().sort_index()
        meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        for mes, count in mes_counts.items():
            print(f"  {meses[mes-1]}: {count}")
        
        print("Por dia da semana:")
        dia_counts = df['dia_semana'].value_counts().sort_index()
        dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
        for dia, count in dia_counts.items():
            print(f"  {dias[dia]}: {count}")
    
    def recomendar_trilhas(self, df):
        """Recomenda trilhas baseado na análise"""
        print("\n" + "=" * 60)
        print("RECOMENDAÇÕES DE TRILHAS")
        print("=" * 60)
        
        # Análise de tendências
        categoria_counts = df['categoria'].value_counts()
        trilha_counts = df['trilha_sugerida'].value_counts()
        
        print(f"\n🚀 TRILHAS PRIORITÁRIAS (baseado na demanda):")
        
        # Top 5 categorias mais procuradas
        top_categorias = categoria_counts.head(5)
        for i, (categoria, count) in enumerate(top_categorias.items(), 1):
            porcentagem = (count / len(df)) * 100
            trilha = df[df['categoria'] == categoria]['trilha_sugerida'].iloc[0]
            
            prioridade = "ALTA" if porcentagem > 15 else "MÉDIA" if porcentagem > 10 else "BAIXA"
            
            print(f"  {i}. {trilha}")
            print(f"     Categoria: {categoria}")
            print(f"     Demanda: {count} perguntas ({porcentagem:.1f}%)")
            print(f"     Prioridade: {prioridade}")
            print()
        
        # Análise de gaps
        print(f"\n🔍 ANÁLISE DE GAPS:")
        palavras_sem_trilha = df[df['categoria'] == 'geral']['palavra_chave'].value_counts()
        if len(palavras_sem_trilha) > 0:
            print("Palavras-chave que precisam de trilhas específicas:")
            for palavra, count in palavras_sem_trilha.head(5).items():
                print(f"  - {palavra}: {count} perguntas")
        
        # Sugestões baseadas em padrões temporais
        print(f"\n📊 PADRÕES TEMPORAIS:")
        hora_pico = df['hora'].mode().iloc[0]
        dia_pico = df['dia_semana'].mode().iloc[0]
        dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        
        print(f"Horário de pico: {hora_pico}h")
        print(f"Dia da semana mais ativo: {dias[dia_pico]}")
        print(f"Sugestão: Lançar conteúdo novo às {hora_pico}h de {dias[dia_pico]}")
    
    def visualizar_dados(self, df):
        """Cria visualizações dos dados"""
        plt.style.use('seaborn-v0_8')
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        
        # Distribuição por categoria
        categoria_counts = df['categoria'].value_counts()
        axes[0, 0].bar(categoria_counts.index, categoria_counts.values)
        axes[0, 0].set_title('Distribuição por Categoria')
        axes[0, 0].tick_params(axis='x', rotation=45)
        
        # Distribuição por hora
        hora_counts = df['hora'].value_counts().sort_index()
        axes[0, 1].plot(hora_counts.index, hora_counts.values, marker='o')
        axes[0, 1].set_title('Distribuição por Hora do Dia')
        axes[0, 1].set_xlabel('Hora')
        axes[0, 1].set_ylabel('Número de Perguntas')
        
        # Tamanho das perguntas por categoria
        df.boxplot(column='tamanho_pergunta', by='categoria', ax=axes[1, 0])
        axes[1, 0].set_title('Tamanho das Perguntas por Categoria')
        axes[1, 0].tick_params(axis='x', rotation=45)
        
        # Confiança por categoria
        df.boxplot(column='confianca', by='categoria', ax=axes[1, 1])
        axes[1, 1].set_title('Confiança por Categoria')
        axes[1, 1].tick_params(axis='x', rotation=45)
        
        plt.tight_layout()
        plt.savefig('analise_sugestoes.png', dpi=300, bbox_inches='tight')
        plt.show()
    
    def executar_analise_completa(self, caminho_arquivo):
        """Executa análise completa"""
        # Carrega dados
        df = self.carregar_dados(caminho_arquivo)
        if df is None:
            return
        
        # Gera relatório
        self.gerar_relatorio_completo(df)
        
        # Prepara dados para ML
        X, y, df_clean = self.preparar_dados(df)
        
        # Treina modelo
        print("\n" + "=" * 60)
        print("TREINAMENTO DO MODELO DE MACHINE LEARNING")
        print("=" * 60)
        
        X_test, y_test, y_pred = self.treinar_modelo(X, y)
        
        # Recomendações
        self.recomendar_trilhas(df_clean)
        
        # Visualizações
        self.visualizar_dados(df_clean)
        
        # Salva modelo
        import pickle
        with open('modelo_sugestoes.pkl', 'wb') as f:
            pickle.dump({
                'modelo': self.modelo,
                'label_encoder': self.label_encoder,
                'scaler': self.scaler
            }, f)
        
        print(f"\n✅ Análise concluída!")
        print(f"📊 Gráficos salvos em: analise_sugestoes.png")
        print(f"🤖 Modelo salvo em: modelo_sugestoes.pkl")

# Exemplo de uso
if __name__ == "__main__":
    analisador = AnalisadorSugestoes()
    
    # Substitua pelo caminho do seu arquivo JSON
    caminho_arquivo = "dataset_ml_capitech.json"
    
    analisador.executar_analise_completa(caminho_arquivo)
