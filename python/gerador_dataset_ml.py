import pandas as pd
import numpy as np
from faker import Faker
from datetime import datetime, timedelta
import random
import json

# Configuração
fake = Faker('pt_BR')
random.seed(42)
np.random.seed(42)

def gerar_dataset_ml(num_registros=500):
    """
    Gera um dataset completo para análise de Machine Learning
    conforme especificações do Projeto Integrador
    """
    
    # Categorias e suas palavras-chave associadas
    categorias_palavras = {
        "html": ["html", "tag", "elemento", "estrutura", "pagina", "web", "markup", "formulario", "link", "imagem"],
        "css": ["css", "estilo", "design", "layout", "cor", "fonte", "seletor", "propriedade", "animacao", "responsivo"],
        "javascript": ["javascript", "js", "funcao", "variavel", "loop", "condicional", "evento", "objeto", "array", "dom"],
        "sql": ["sql", "banco", "dados", "tabela", "consulta", "select", "insert", "update", "delete", "join"],
        "python": ["python", "programacao", "algoritmo", "lista", "dicionario", "funcao", "classe", "modulo", "biblioteca", "pandas"],
        "react": ["react", "componente", "jsx", "hook", "estado", "props", "virtual", "dom", "render", "lifecycle"],
        "nodejs": ["node", "backend", "servidor", "api", "express", "npm", "package", "middleware", "async", "callback"],
        "carreira": ["carreira", "emprego", "curriculo", "entrevista", "salario", "networking", "desenvolvimento", "habilidades", "mercado", "oportunidades"],
        "produtividade": ["produtividade", "tempo", "organizacao", "foco", "eficiencia", "planejamento", "gestao", "prioridade", "habitos", "disciplina"],
        "estudo": ["estudo", "aprendizado", "curso", "conhecimento", "memoria", "concentracao", "tecnica", "metodo", "revisao", "prova"]
    }
    
    # Trilhas correspondentes
    trilhas = {
        "html": "Fundamentos de HTML",
        "css": "Estilização com CSS", 
        "javascript": "Programação JavaScript",
        "sql": "Banco de Dados SQL",
        "python": "Programação Python",
        "react": "Desenvolvimento React",
        "nodejs": "Backend com Node.js",
        "carreira": "Desenvolvimento de Carreira",
        "produtividade": "Produtividade e Gestão",
        "estudo": "Técnicas de Estudo"
    }
    
    # Templates de perguntas por categoria
    templates_perguntas = {
        "html": [
            "Como criar {palavra}?",
            "O que é {palavra} em HTML?",
            "Como usar {palavra} no desenvolvimento web?",
            "Qual a melhor forma de implementar {palavra}?",
            "Como fazer {palavra} responsivo?",
            "Preciso de ajuda com {palavra}",
            "Como funciona {palavra}?",
            "Tutorial de {palavra}",
            "Exemplos de {palavra}",
            "Como aprender {palavra}?"
        ],
        "css": [
            "Como estilizar com {palavra}?",
            "O que é {palavra} no CSS?",
            "Como aplicar {palavra} no design?",
            "Melhor forma de usar {palavra}",
            "Como fazer {palavra} responsivo?",
            "Tutorial de {palavra} CSS",
            "Exemplos práticos de {palavra}",
            "Como dominar {palavra}?",
            "Dicas de {palavra}",
            "Como implementar {palavra}?"
        ],
        "javascript": [
            "Como criar {palavra} em JavaScript?",
            "O que é {palavra} no JS?",
            "Como usar {palavra} na programação?",
            "Explicação sobre {palavra}",
            "Tutorial de {palavra}",
            "Como funciona {palavra}?",
            "Exemplos de {palavra}",
            "Melhor forma de implementar {palavra}",
            "Como aprender {palavra}?",
            "Dicas sobre {palavra}"
        ],
        "sql": [
            "Como fazer {palavra} no banco?",
            "O que é {palavra} em SQL?",
            "Como usar {palavra} em consultas?",
            "Tutorial de {palavra}",
            "Exemplos de {palavra}",
            "Como otimizar {palavra}?",
            "Melhor forma de usar {palavra}",
            "Como implementar {palavra}?",
            "Dicas de {palavra}",
            "Como dominar {palavra}?"
        ],
        "python": [
            "Como usar {palavra} em Python?",
            "O que é {palavra} no Python?",
            "Tutorial de {palavra}",
            "Como implementar {palavra}?",
            "Exemplos práticos de {palavra}",
            "Como aprender {palavra}?",
            "Melhor forma de usar {palavra}",
            "Como dominar {palavra}?",
            "Dicas sobre {palavra}",
            "Como funciona {palavra}?"
        ],
        "react": [
            "Como criar {palavra} no React?",
            "O que é {palavra} no React?",
            "Como usar {palavra} em componentes?",
            "Tutorial de {palavra}",
            "Exemplos de {palavra}",
            "Como implementar {palavra}?",
            "Melhor forma de usar {palavra}",
            "Como aprender {palavra}?",
            "Dicas de {palavra}",
            "Como dominar {palavra}?"
        ],
        "nodejs": [
            "Como usar {palavra} no Node.js?",
            "O que é {palavra} no backend?",
            "Tutorial de {palavra}",
            "Como implementar {palavra}?",
            "Exemplos práticos de {palavra}",
            "Como configurar {palavra}?",
            "Melhor forma de usar {palavra}",
            "Como aprender {palavra}?",
            "Dicas sobre {palavra}",
            "Como dominar {palavra}?"
        ],
        "carreira": [
            "Como desenvolver {palavra}?",
            "O que é importante para {palavra}?",
            "Como melhorar minha {palavra}?",
            "Dicas para {palavra}",
            "Como conseguir {palavra}?",
            "Estratégias para {palavra}",
            "Como ter sucesso em {palavra}?",
            "Tutorial sobre {palavra}",
            "Como planejar {palavra}?",
            "Melhor forma de alcançar {palavra}"
        ],
        "produtividade": [
            "Como melhorar minha {palavra}?",
            "O que é {palavra} eficiente?",
            "Como desenvolver {palavra}?",
            "Dicas para {palavra}",
            "Como otimizar {palavra}?",
            "Estratégias de {palavra}",
            "Como ter mais {palavra}?",
            "Tutorial sobre {palavra}",
            "Como planejar {palavra}?",
            "Melhor forma de gerenciar {palavra}"
        ],
        "estudo": [
            "Como melhorar meu {palavra}?",
            "O que é {palavra} eficiente?",
            "Como desenvolver {palavra}?",
            "Dicas para {palavra}",
            "Como otimizar {palavra}?",
            "Técnicas de {palavra}",
            "Como ter mais {palavra}?",
            "Tutorial sobre {palavra}",
            "Como planejar {palavra}?",
            "Melhor forma de fazer {palavra}"
        ]
    }
    
    dados = []
    data_inicio = datetime.now() - timedelta(days=90)  # 90 dias de dados
    
    for i in range(num_registros):
        # Escolhe categoria aleatória
        categoria = random.choice(list(categorias_palavras.keys()))
        
        # Escolhe palavra-chave da categoria
        palavra_chave = random.choice(categorias_palavras[categoria])
        
        # Gera pergunta usando template
        template = random.choice(templates_perguntas[categoria])
        pergunta = template.format(palavra=palavra_chave)
        
        # Gera timestamp aleatório
        dias_aleatorios = random.randint(0, 89)
        horas_aleatorias = random.randint(0, 23)
        minutos_aleatorios = random.randint(0, 59)
        
        timestamp = data_inicio + timedelta(
            days=dias_aleatorios,
            hours=horas_aleatorias,
            minutes=minutos_aleatorios
        )
        
        # Calcula features
        tamanho_pergunta = len(pergunta)
        num_palavras = len(pergunta.split())
        mes = timestamp.month
        dia_semana = timestamp.weekday()
        hora = timestamp.hour
        
        # Gera confiança (mais alta para perguntas mais claras)
        confianca_base = 0.7
        if tamanho_pergunta > 20:
            confianca_base += 0.1
        if num_palavras >= 5:
            confianca_base += 0.1
        confianca = min(1.0, confianca_base + random.uniform(0, 0.1))
        
        # Cria registro
        registro = {
            "id": fake.uuid4(),
            "pergunta": pergunta,
            "palavra_chave": palavra_chave,
            "categoria": categoria,
            "trilha_sugerida": trilhas[categoria],
            "confianca": round(confianca, 3),
            "data_hora": timestamp.isoformat(),
            "mes": mes,
            "dia_semana": dia_semana,
            "hora": hora,
            "tamanho_pergunta": tamanho_pergunta,
            "num_palavras": num_palavras,
            # Features adicionais para ML
            "tem_interrogacao": "?" in pergunta,
            "comeca_com_como": pergunta.lower().startswith("como"),
            "comeca_com_o_que": pergunta.lower().startswith("o que"),
            "periodo_do_dia": "manha" if 6 <= hora < 12 else "tarde" if 12 <= hora < 18 else "noite" if 18 <= hora < 22 else "madrugada",
            "fim_de_semana": dia_semana >= 5,
            "categoria_prioridade": random.choice(["alta", "media", "baixa"]),
            "usuario_tipo": random.choice(["iniciante", "intermediario", "avancado"]),
            "dispositivo": random.choice(["mobile", "desktop", "tablet"]),
            "sessao_duracao": random.randint(1, 30),  # minutos
            "interacoes_anteriores": random.randint(0, 10)
        }
        
        dados.append(registro)
    
    return dados

def salvar_dataset(dados, nome_arquivo="dataset_ml_capitech.json"):
    """Salva o dataset em formato JSON"""
    with open(nome_arquivo, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)
    print(f"Dataset salvo em {nome_arquivo}")

def gerar_relatorio_dataset(dados):
    """Gera relatório completo do dataset"""
    print("=" * 70)
    print("RELATÓRIO DO DATASET PARA MACHINE LEARNING")
    print("PROJETO INTEGRADOR - ANÁLISE DE SUGESTÕES CAPITECH")
    print("=" * 70)
    
    df = pd.DataFrame(dados)
    
    # Informações gerais
    print(f"\n📊 INFORMAÇÕES GERAIS:")
    print(f"Total de registros: {len(df):,}")
    print(f"Período: {df['data_hora'].min()} a {df['data_hora'].max()}")
    print(f"Categorias: {df['categoria'].nunique()}")
    print(f"Palavras-chave únicas: {df['palavra_chave'].nunique()}")
    
    # Distribuição por categoria
    print(f"\n🎯 DISTRIBUIÇÃO POR CATEGORIA:")
    categoria_counts = df['categoria'].value_counts()
    for categoria, count in categoria_counts.items():
        porcentagem = (count / len(df)) * 100
        print(f"  {categoria}: {count:,} ({porcentagem:.1f}%)")
    
    # Estatísticas das features
    print(f"\n📈 ESTATÍSTICAS DAS FEATURES:")
    print(f"Tamanho médio da pergunta: {df['tamanho_pergunta'].mean():.1f} caracteres")
    print(f"Número médio de palavras: {df['num_palavras'].mean():.1f}")
    print(f"Confiança média: {df['confianca'].mean():.3f}")
    print(f"Sessão média: {df['sessao_duracao'].mean():.1f} minutos")
    
    # Distribuição temporal
    print(f"\n📅 DISTRIBUIÇÃO TEMPORAL:")
    print("Por período do dia:")
    periodo_counts = df['periodo_do_dia'].value_counts()
    for periodo, count in periodo_counts.items():
        porcentagem = (count / len(df)) * 100
        print(f"  {periodo}: {count:,} ({porcentagem:.1f}%)")
    
    print("Por dia da semana:")
    fim_semana = df['fim_de_semana'].value_counts()
    print(f"  Semana: {fim_semana[False]:,} ({(fim_semana[False]/len(df)*100):.1f}%)")
    print(f"  Fim de semana: {fim_semana[True]:,} ({(fim_semana[True]/len(df)*100):.1f}%)")
    
    # Distribuição por tipo de usuário
    print(f"\n👥 DISTRIBUIÇÃO POR TIPO DE USUÁRIO:")
    usuario_counts = df['usuario_tipo'].value_counts()
    for tipo, count in usuario_counts.items():
        porcentagem = (count / len(df)) * 100
        print(f"  {tipo}: {count:,} ({porcentagem:.1f}%)")
    
    # Distribuição por dispositivo
    print(f"\n📱 DISTRIBUIÇÃO POR DISPOSITIVO:")
    dispositivo_counts = df['dispositivo'].value_counts()
    for dispositivo, count in dispositivo_counts.items():
        porcentagem = (count / len(df)) * 100
        print(f"  {dispositivo}: {count:,} ({porcentagem:.1f}%)")
    
    # Top palavras-chave
    print(f"\n🔑 TOP 15 PALAVRAS-CHAVE:")
    palavra_counts = df['palavra_chave'].value_counts().head(15)
    for palavra, count in palavra_counts.items():
        print(f"  {palavra}: {count:,}")
    
    # Matriz de confusão simulada
    print(f"\n🎲 FEATURES BOOLEANAS:")
    print(f"Perguntas com '?': {df['tem_interrogacao'].sum():,} ({(df['tem_interrogacao'].sum()/len(df)*100):.1f}%)")
    print(f"Começam com 'como': {df['comeca_com_como'].sum():,} ({(df['comeca_com_como'].sum()/len(df)*100):.1f}%)")
    print(f"Começam com 'o que': {df['comeca_com_o_que'].sum():,} ({(df['comeca_com_o_que'].sum()/len(df)*100):.1f}%)")
    
    print(f"\n✅ Dataset preparado para análise de Machine Learning!")
    print(f"📋 Campos disponíveis: {list(df.columns)}")
    print(f"🎯 Target: 'categoria' (classificação)")
    print(f"📊 Features: {len(df.columns) - 1}")

if __name__ == "__main__":
    print("Gerando dataset para Machine Learning...")
    print("Projeto Integrador - Análise de Sugestões Capitech")
    print("-" * 50)
    
    # Gera dataset com 500 registros
    dados = gerar_dataset_ml(500)
    
    # Salva dataset
    salvar_dataset(dados)
    
    # Gera relatório
    gerar_relatorio_dataset(dados)
    
    print("\n" + "=" * 50)
    print("PRÓXIMOS PASSOS:")
    print("1. Execute: python analisador_sugestoes.py")
    print("2. Analise os gráficos gerados")
    print("3. Avalie as recomendações de trilhas")
    print("4. Implemente melhorias baseadas nos insights")
    print("=" * 50)
