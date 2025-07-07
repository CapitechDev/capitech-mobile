import json
import random
from datetime import datetime, timedelta
import uuid

def gerar_dados_ficticios(quantidade=500):
    """Gera dados fictícios para teste do sistema"""
    
    exemplos = [
        # HTML
        {"pergunta": "Como criar uma página web?", "palavra": "html", "categoria": "html"},
        {"pergunta": "O que são tags HTML?", "palavra": "html", "categoria": "html"},
        {"pergunta": "Como fazer uma estrutura básica?", "palavra": "estrutura", "categoria": "html"},
        {"pergunta": "Como criar um formulário?", "palavra": "formulario", "categoria": "html"},
        {"pergunta": "O que é markup?", "palavra": "markup", "categoria": "html"},
        {"pergunta": "Como usar elementos HTML?", "palavra": "elemento", "categoria": "html"},
        {"pergunta": "O que são atributos HTML?", "palavra": "atributo", "categoria": "html"},
        
        # CSS
        {"pergunta": "Como estilizar minha página?", "palavra": "estilo", "categoria": "css"},
        {"pergunta": "Como mudar cores no site?", "palavra": "cores", "categoria": "css"},
        {"pergunta": "O que é CSS Grid?", "palavra": "layout", "categoria": "css"},
        {"pergunta": "Como fazer um design responsivo?", "palavra": "design", "categoria": "css"},
        {"pergunta": "Como usar seletores CSS?", "palavra": "seletor", "categoria": "css"},
        {"pergunta": "O que são propriedades CSS?", "palavra": "propriedade", "categoria": "css"},
        {"pergunta": "Como fazer animações CSS?", "palavra": "animacao", "categoria": "css"},
        
        # JavaScript
        {"pergunta": "Como criar uma função?", "palavra": "funcao", "categoria": "javascript"},
        {"pergunta": "O que são variáveis?", "palavra": "variavel", "categoria": "javascript"},
        {"pergunta": "Como fazer um loop?", "palavra": "loop", "categoria": "javascript"},
        {"pergunta": "Como programar em JS?", "palavra": "programacao", "categoria": "javascript"},
        {"pergunta": "O que é lógica de programação?", "palavra": "logica", "categoria": "javascript"},
        {"pergunta": "Como usar condicionais?", "palavra": "condicional", "categoria": "javascript"},
        {"pergunta": "O que são eventos JavaScript?", "palavra": "evento", "categoria": "javascript"},
        
        # SQL
        {"pergunta": "Como criar uma consulta?", "palavra": "consulta", "categoria": "sql"},
        {"pergunta": "O que é um banco de dados?", "palavra": "banco", "categoria": "sql"},
        {"pergunta": "Como fazer um SELECT?", "palavra": "select", "categoria": "sql"},
        {"pergunta": "Como criar uma tabela?", "palavra": "tabela", "categoria": "sql"},
        {"pergunta": "O que é SQL?", "palavra": "sql", "categoria": "sql"},
        {"pergunta": "Como fazer JOIN?", "palavra": "join", "categoria": "sql"},
        {"pergunta": "O que são índices?", "palavra": "indice", "categoria": "sql"},
        
        # Python
        {"pergunta": "Como usar machine learning?", "palavra": "learning", "categoria": "python"},
        {"pergunta": "O que é ciência de dados?", "palavra": "ciencia", "categoria": "python"},
        {"pergunta": "Como criar um algoritmo?", "palavra": "algoritmo", "categoria": "python"},
        {"pergunta": "Como automatizar tarefas?", "palavra": "automacao", "categoria": "python"},
        {"pergunta": "O que é IA?", "palavra": "ia", "categoria": "python"},
        {"pergunta": "Como usar pandas?", "palavra": "pandas", "categoria": "python"},
        {"pergunta": "O que é deep learning?", "palavra": "deep", "categoria": "python"},
        
        # React
        {"pergunta": "Como criar um componente?", "palavra": "componente", "categoria": "react"},
        {"pergunta": "O que é JSX?", "palavra": "jsx", "categoria": "react"},
        {"pergunta": "Como usar hooks?", "palavra": "hook", "categoria": "react"},
        {"pergunta": "O que é estado?", "palavra": "estado", "categoria": "react"},
        {"pergunta": "Como fazer uma interface?", "palavra": "interface", "categoria": "react"},
        {"pergunta": "O que é props?", "palavra": "props", "categoria": "react"},
        {"pergunta": "Como usar context?", "palavra": "context", "categoria": "react"},
        
        # Node.js
        {"pergunta": "Como criar um servidor?", "palavra": "servidor", "categoria": "nodejs"},
        {"pergunta": "O que é uma API?", "palavra": "api", "categoria": "nodejs"},
        {"pergunta": "Como usar Express?", "palavra": "express", "categoria": "nodejs"},
        {"pergunta": "O que é backend?", "palavra": "backend", "categoria": "nodejs"},
        {"pergunta": "Como instalar pacotes?", "palavra": "pacote", "categoria": "nodejs"},
        {"pergunta": "O que é NPM?", "palavra": "npm", "categoria": "nodejs"},
        {"pergunta": "Como fazer middleware?", "palavra": "middleware", "categoria": "nodejs"},
        
        # Carreira
        {"pergunta": "Como conseguir um emprego?", "palavra": "emprego", "categoria": "carreira"},
        {"pergunta": "Como fazer um currículo?", "palavra": "curriculo", "categoria": "carreira"},
        {"pergunta": "Como me preparar para entrevista?", "palavra": "entrevista", "categoria": "carreira"},
        {"pergunta": "Qual carreira seguir?", "palavra": "carreira", "categoria": "carreira"},
        {"pergunta": "Como crescer profissionalmente?", "palavra": "profissao", "categoria": "carreira"},
        {"pergunta": "Como construir networking?", "palavra": "networking", "categoria": "carreira"},
        {"pergunta": "Como negociar salário?", "palavra": "salario", "categoria": "carreira"},
        
        # Produtividade
        {"pergunta": "Como melhorar minha produtividade?", "palavra": "produtividade", "categoria": "produtividade"},
        {"pergunta": "Como gerenciar meu tempo?", "palavra": "tempo", "categoria": "produtividade"},
        {"pergunta": "Como me organizar melhor?", "palavra": "organizacao", "categoria": "produtividade"},
        {"pergunta": "Como manter o foco?", "palavra": "foco", "categoria": "produtividade"},
        {"pergunta": "Como ser mais eficiente?", "palavra": "eficiencia", "categoria": "produtividade"},
        {"pergunta": "Como fazer planejamento?", "palavra": "planejamento", "categoria": "produtividade"},
        {"pergunta": "Como eliminar distrações?", "palavra": "distracao", "categoria": "produtividade"},
        
        # Estudo
        {"pergunta": "Como estudar melhor?", "palavra": "estudo", "categoria": "estudo"},
        {"pergunta": "Como aprender mais rápido?", "palavra": "aprendizado", "categoria": "estudo"},
        {"pergunta": "Qual curso fazer?", "palavra": "curso", "categoria": "estudo"},
        {"pergunta": "Como me preparar para prova?", "palavra": "prova", "categoria": "estudo"},
        {"pergunta": "Como adquirir conhecimento?", "palavra": "conhecimento", "categoria": "estudo"},
        {"pergunta": "Como fazer resumos?", "palavra": "resumo", "categoria": "estudo"},
        {"pergunta": "Como memorizar melhor?", "palavra": "memoria", "categoria": "estudo"},
    ]
    
    trilhas = {
        "html": "Fundamentos de HTML",
        "css": "Estilização com CSS",
        "javascript": "Programação JavaScript",
        "sql": "Banco de Dados SQL",
        "python": "Python para Ciência de Dados",
        "react": "Desenvolvimento React",
        "nodejs": "Backend com Node.js",
        "carreira": "Desenvolvimento de Carreira",
        "produtividade": "Produtividade e Gestão",
        "estudo": "Técnicas de Estudo"
    }
    
    dados_gerados = []
    data_inicio = datetime.now() - timedelta(days=30)
    
    for i in range(quantidade):
        exemplo = random.choice(exemplos)
        
        # Gera variações da pergunta
        variacoes = [
            exemplo["pergunta"],
            exemplo["pergunta"].replace("Como ", "Como posso "),
            exemplo["pergunta"].replace("O que é", "O que seria"),
            exemplo["pergunta"] + " na programação?",
            exemplo["pergunta"] + " para iniciantes?",
            exemplo["pergunta"] + " passo a passo?",
            "Me ajude com " + exemplo["pergunta"].lower(),
            "Preciso saber " + exemplo["pergunta"].lower(),
        ]
        
        pergunta_final = random.choice(variacoes)
        
        # Gera data aleatória nos últimos 30 dias
        data_aleatoria = data_inicio + timedelta(
            days=random.randint(0, 30),
            hours=random.randint(0, 23),
            minutes=random.randint(0, 59)
        )
        
        registro = {
            "id": str(uuid.uuid4()),
            "pergunta": pergunta_final,
            "palavra_chave": exemplo["palavra"],
            "categoria": exemplo["categoria"],
            "trilha_sugerida": trilhas[exemplo["categoria"]],
            "confianca": round(random.uniform(0.7, 1.0), 3),
            "data_hora": data_aleatoria.isoformat(),
            "mes": data_aleatoria.month,
            "dia_semana": data_aleatoria.weekday(),
            "hora": data_aleatoria.hour,
            "tamanho_pergunta": len(pergunta_final),
            "num_palavras": len(pergunta_final.split())
        }
        
        dados_gerados.append(registro)
    
    return dados_gerados

def salvar_dados_json(dados, nome_arquivo="dados_sugestoes.json"):
    """Salva os dados em formato JSON"""
    with open(nome_arquivo, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)
    print(f"Dados salvos em {nome_arquivo}")

def gerar_relatorio_basico(dados):
    """Gera um relatório básico dos dados"""
    print("=" * 50)
    print("RELATÓRIO BÁSICO DOS DADOS GERADOS")
    print("=" * 50)
    
    print(f"Total de registros: {len(dados)}")
    
    # Contagem por categoria
    categorias = {}
    for registro in dados:
        cat = registro["categoria"]
        categorias[cat] = categorias.get(cat, 0) + 1
    
    print("\nDistribuição por categoria:")
    for categoria, count in sorted(categorias.items()):
        porcentagem = (count / len(dados)) * 100
        print(f"  {categoria}: {count} ({porcentagem:.1f}%)")
    
    # Palavras mais frequentes
    palavras = {}
    for registro in dados:
        palavra = registro["palavra_chave"]
        palavras[palavra] = palavras.get(palavra, 0) + 1
    
    print("\nPalavras-chave mais frequentes:")
    palavras_ordenadas = sorted(palavras.items(), key=lambda x: x[1], reverse=True)
    for palavra, count in palavras_ordenadas[:10]:
        print(f"  {palavra}: {count}")

if __name__ == "__main__":
    print("Gerando dados fictícios...")
    
    # Gera 500 registros
    dados = gerar_dados_ficticios(500)
    
    # Salva em JSON
    salvar_dados_json(dados)
    
    # Gera relatório básico
    gerar_relatorio_basico(dados)
    
    print("\n✅ Dados gerados com sucesso!")
    print("Para analisar os dados, execute: python analisador_sugestoes.py")
