"""
Script Python para analisar as sugestões coletadas do chat
e gerar recomendações para trilhas de conteúdo.

Para usar:
1. Exporte os dados do AsyncStorage do app
2. Salve como 'sugestoes.json' na mesma pasta deste script
3. Execute: python analise_sugestoes.py
"""

import json
import pandas as pd
from collections import Counter
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import numpy as np

class AnalisadorSugestoes:
    def __init__(self, arquivo_json='sugestoes.json'):
        self.arquivo_json = arquivo_json
        self.dados = None
        self.df = None
        
    def carregar_dados(self):
        """Carrega os dados do arquivo JSON"""
        try:
            with open(self.arquivo_json, 'r', encoding='utf-8') as file:
                self.dados = json.load(file)
            print(f"✅ Carregados {len(self.dados)} registros de sugestões")
            return True
        except FileNotFoundError:
            print(f"❌ Arquivo {self.arquivo_json} não encontrado")
            return False
        except json.JSONDecodeError:
            print(f"❌ Erro ao decodificar JSON do arquivo {self.arquivo_json}")
            return False
    
    def processar_dados(self):
        """Processa os dados e cria DataFrame"""
        if not self.dados:
            print("❌ Nenhum dado carregado")
            return
        
        # Criar DataFrame
        self.df = pd.DataFrame(self.dados)
        
        # Converter dataHora para datetime
        self.df['dataHora'] = pd.to_datetime(self.df['dataHora'])
        
        # Normalizar palavras (lowercase)
        self.df['palavra_normalizada'] = self.df['palavra'].str.lower().str.strip()
        
        # Adicionar colunas de tempo
        self.df['hora'] = self.df['dataHora'].dt.hour
        self.df['dia_semana'] = self.df['dataHora'].dt.day_name()
        self.df['mes'] = self.df['dataHora'].dt.month
        
        print(f"✅ Dados processados: {len(self.df)} registros")
        
    def analisar_frequencia(self):
        """Analisa a frequência das palavras"""
        if self.df is None:
            print("❌ Processe os dados primeiro")
            return
        
        print("\n📊 ANÁLISE DE FREQUÊNCIA DAS PALAVRAS")
        print("=" * 50)
        
        # Contagem das palavras
        frequencia = self.df['palavra_normalizada'].value_counts()
        
        print("\n🔝 Top 10 temas mais perguntados:")
        for i, (palavra, count) in enumerate(frequencia.head(10).items(), 1):
            print(f"{i:2d}. {palavra.capitalize():<20} - {count} vezes")
        
        # Estatísticas gerais
        print(f"\n📈 Estatísticas gerais:")
        print(f"   • Total de perguntas: {len(self.df)}")
        print(f"   • Temas únicos: {len(frequencia)}")
        print(f"   • Tema mais popular: {frequencia.index[0]} ({frequencia.iloc[0]} vezes)")
        
        return frequencia
    
    def analisar_temporal(self):
        """Analisa padrões temporais"""
        if self.df is None:
            print("❌ Processe os dados primeiro")
            return
        
        print("\n⏰ ANÁLISE TEMPORAL")
        print("=" * 50)
        
        # Análise por hora
        print("\n🕐 Horários mais ativos:")
        horarios = self.df['hora'].value_counts().sort_index()
        for hora, count in horarios.head(5).items():
            print(f"   {hora:2d}:00 - {count} perguntas")
        
        # Análise por dia da semana
        print("\n📅 Dias da semana mais ativos:")
        dias = self.df['dia_semana'].value_counts()
        for dia, count in dias.head(3).items():
            print(f"   {dia} - {count} perguntas")
    
    def gerar_recomendacoes_trilhas(self):
        """Gera recomendações de trilhas baseadas nos dados"""
        if self.df is None:
            print("❌ Processe os dados primeiro")
            return
        
        print("\n🎯 RECOMENDAÇÕES DE TRILHAS")
        print("=" * 50)
        
        frequencia = self.df['palavra_normalizada'].value_counts()
        
        # Mapear palavras para áreas de conhecimento
        areas_conhecimento = {
            'programacao': ['python', 'javascript', 'react', 'nodejs', 'html', 'css', 'sql', 'java'],
            'carreira': ['carreira', 'emprego', 'trabalho', 'salario', 'entrevista'],
            'produtividade': ['produtividade', 'organizacao', 'tempo', 'gestao', 'foco'],
            'estudos': ['estudo', 'aprendizado', 'curso', 'faculdade', 'prova'],
            'tecnologia': ['tecnologia', 'ai', 'ia', 'machine', 'data', 'cloud'],
            'saude': ['saude', 'exercicio', 'treino', 'alimentacao', 'bem-estar']
        }
        
        recomendacoes = {}
        
        for area, palavras_relacionadas in areas_conhecimento.items():
            count = 0
            for palavra in palavras_relacionadas:
                if palavra in frequencia.index:
                    count += frequencia[palavra]
            
            if count > 0:
                recomendacoes[area] = count
        
        # Ordenar por demanda
        recomendacoes_ordenadas = sorted(recomendacoes.items(), key=lambda x: x[1], reverse=True)
        
        print("\n🏆 Áreas com maior demanda (prioridade para trilhas):")
        for i, (area, demanda) in enumerate(recomendacoes_ordenadas, 1):
            print(f"{i}. {area.capitalize():<15} - {demanda} perguntas relacionadas")
        
        # Sugestões específicas
        print("\n💡 Sugestões específicas de trilhas:")
        top_palavras = frequencia.head(5)
        for palavra, count in top_palavras.items():
            print(f"   • Trilha de {palavra.capitalize()}: {count} usuários interessados")
        
        return recomendacoes_ordenadas
    
    def criar_arvore_decisao(self):
        """Cria uma árvore de decisão para recomendação de trilhas"""
        if self.df is None:
            print("❌ Processe os dados primeiro")
            return
        
        print("\n🌳 ÁRVORE DE DECISÃO PARA TRILHAS")
        print("=" * 50)
        
        # Preparar dados para ML
        le_palavra = LabelEncoder()
        le_hora = LabelEncoder()
        le_dia = LabelEncoder()
        
        # Features
        X = pd.DataFrame({
            'palavra_encoded': le_palavra.fit_transform(self.df['palavra_normalizada']),
            'hora': self.df['hora'],
            'dia_semana_encoded': le_dia.fit_transform(self.df['dia_semana'])
        })
        
        # Target: área de conhecimento baseada na palavra
        def mapear_area(palavra):
            areas = {
                'programacao': ['python', 'javascript', 'react', 'nodejs', 'html', 'css', 'sql'],
                'carreira': ['carreira', 'emprego', 'trabalho', 'salario'],
                'produtividade': ['produtividade', 'organizacao', 'tempo', 'gestao'],
                'estudos': ['estudo', 'aprendizado', 'curso', 'faculdade'],
                'tecnologia': ['tecnologia', 'ai', 'ia', 'machine', 'data'],
                'saude': ['saude', 'exercicio', 'treino', 'alimentacao']
            }
            
            palavra_lower = palavra.lower()
            for area, palavras in areas.items():
                if any(p in palavra_lower for p in palavras):
                    return area
            return 'outros'
        
        self.df['area'] = self.df['palavra_normalizada'].apply(mapear_area)
        y = self.df['area']
        
        # Treinar modelo
        clf = DecisionTreeClassifier(max_depth=5, random_state=42)
        clf.fit(X, y)
        
        # Importância das features
        feature_importance = pd.DataFrame({
            'feature': ['palavra', 'hora', 'dia_semana'],
            'importance': clf.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print("\n📊 Importância das características:")
        for _, row in feature_importance.iterrows():
            print(f"   {row['feature']:<12}: {row['importance']:.3f}")
        
        return clf
    
    def gerar_relatorio_completo(self):
        """Gera relatório completo da análise"""
        if not self.carregar_dados():
            return
        
        self.processar_dados()
        
        print("\n" + "="*60)
        print("🚀 RELATÓRIO COMPLETO DE ANÁLISE DE SUGESTÕES")
        print("="*60)
        
        # Análises
        self.analisar_frequencia()
        self.analisar_temporal()
        recomendacoes = self.gerar_recomendacoes_trilhas()
        self.criar_arvore_decisao()
        
        # Resumo final
        print("\n" + "="*60)
        print("📋 RESUMO EXECUTIVO")
        print("="*60)
        print(f"• Total de interações analisadas: {len(self.df)}")
        print(f"• Período: {self.df['dataHora'].min().strftime('%d/%m/%Y')} a {self.df['dataHora'].max().strftime('%d/%m/%Y')}")
        print(f"• Temas únicos identificados: {len(self.df['palavra_normalizada'].unique())}")
        
        if recomendacoes:
            print(f"• Área prioritária para trilhas: {recomendacoes[0][0].capitalize()}")
        
        print("\n💡 Próximos passos:")
        print("   1. Desenvolver trilhas nas áreas de maior demanda")
        print("   2. Monitorar continuamente as tendências")
        print("   3. Ajustar conteúdo baseado nos horários de maior atividade")
        print("   4. Criar conteúdo personalizado para os temas mais procurados")

# Exemplo de uso
if __name__ == "__main__":
    # Criar exemplo de dados se não existir arquivo
    exemplo_dados = [
        {
            "id": "1",
            "palavra": "programacao",
            "dataHora": "2025-01-01T10:00:00Z",
            "mensagemOriginal": "Como aprender programação?"
        },
        {
            "id": "2", 
            "palavra": "carreira",
            "dataHora": "2025-01-01T14:30:00Z",
            "mensagemOriginal": "Dicas para mudar de carreira"
        },
        {
            "id": "3",
            "palavra": "python",
            "dataHora": "2025-01-02T09:15:00Z", 
            "mensagemOriginal": "Python para iniciantes"
        }
    ]
    
    try:
        analisador = AnalisadorSugestoes()
        analisador.gerar_relatorio_completo()
    except Exception as e:
        print(f"❌ Erro: {e}")
        print("\n📝 Criando arquivo de exemplo...")
        with open('sugestoes.json', 'w', encoding='utf-8') as f:
            json.dump(exemplo_dados, f, ensure_ascii=False, indent=2)
        print("✅ Arquivo 'sugestoes.json' criado com dados de exemplo")
        print("   Execute novamente para ver a análise!")
