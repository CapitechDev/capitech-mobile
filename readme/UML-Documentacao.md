# Documentação UML - Sistema de Login e Classificação de Trilhas

Esta documentação apresenta os diagramas UML para o sistema Capitech Mobile, focando especificamente nas funcionalidades de **login de usuários** e **classificação das visitas/trilhas**.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Diagramas Disponíveis](#diagramas-disponíveis)
- [Como Visualizar os Diagramas](#como-visualizar-os-diagramas)
- [Descrição dos Diagramas](#descrição-dos-diagramas)
- [Funcionalidades Mapeadas](#funcionalidades-mapeadas)

## 🎯 Visão Geral

O sistema Capitech Mobile é uma aplicação educacional que permite aos usuários:

1. **Autenticação**: Login, cadastro e gestão de perfil
2. **Trilhas de Aprendizagem**: Navegação, classificação e acompanhamento de progresso
3. **Analytics**: Registro e análise de visitas e progresso dos usuários

## 📊 Diagramas Disponíveis

### 1. Diagrama de Classes Completo
- **Arquivo**: `uml-sistema-login-trilhas.puml`
- **Imagem**: `Sistema Capitech Mobile - Login e Classificação de Trilhas.png`
- **Descrição**: Visão completa do sistema com todas as classes, serviços e relacionamentos

![Sistema Completo](Sistema%20Capitech%20Mobile%20-%20Login%20e%20Classificação%20de%20Trilhas.png)

### 2. Diagrama de Sequência - Fluxo de Login e Visitas
- **Arquivo**: `uml-fluxo-login-visitas.puml`
- **Imagem**: `Fluxo de Login e Classificação de Visitas.png`
- **Descrição**: Sequência de interações do login até a classificação de trilhas

![Fluxo de Login e Visitas](Fluxo%20de%20Login%20e%20Classificação%20de%20Visitas.png)

### 3. Diagrama de Classes - Entidades Principais
- **Arquivo**: `uml-classes-login-trilhas.puml`
- **Imagem**: `Classes - Login e Classificação de Trilhas.png`
- **Descrição**: Foco nas entidades principais e seus relacionamentos

![Classes Principais](Classes%20-%20Login%20e%20Classificação%20de%20Trilhas.png)

### 4. Diagrama de Casos de Uso
- **Arquivo**: `uml-casos-uso-login-trilhas.puml`
- **Imagem**: `Casos de Uso - Login e Classificação de Trilhas.png`
- **Descrição**: Casos de uso para diferentes tipos de usuários

![Casos de Uso](Casos%20de%20Uso%20-%20Login%20e%20Classificação%20de%20Trilhas.png)

## 🔍 Como Visualizar os Diagramas

### Opção 1: Online (Recomendado)
1. Acesse [PlantUML Online](http://www.plantuml.com/plantuml/uml/)
2. Copie o conteúdo de qualquer arquivo `.puml`
3. Cole na interface online
4. Visualize o diagrama gerado

### Opção 2: VS Code
1. Instale a extensão "PlantUML" no VS Code
2. Abra qualquer arquivo `.puml`
3. Use `Ctrl+Shift+P` → "PlantUML: Preview Current Diagram"

### Opção 3: Local (Java + PlantUML)
```bash
# Instalar PlantUML
wget http://sourceforge.net/projects/plantuml/files/plantuml.jar/download -O plantuml.jar

# Gerar PNG
java -jar plantuml.jar uml-sistema-login-trilhas.puml
```

## 📖 Descrição dos Diagramas

### 1. Sistema Completo (uml-sistema-login-trilhas.puml)

Este diagrama apresenta a arquitetura completa do sistema, incluindo:

**Entidades Principais:**
- `User`: Gestão de usuários e autenticação
- `Trail`: Trilhas de aprendizagem
- `UserTrailProgress`: Acompanhamento de progresso

**Componentes Mobile:**
- `LoginScreen`: Interface de autenticação
- `ContentIndex`: Listagem de trilhas
- `TrailDescription`: Detalhes da trilha

**Serviços:**
- `AuthService`: Autenticação e autorização
- `TrailService`: Gestão de trilhas
- `UserService`: Gestão de usuários

### 2. Fluxo de Interações (uml-fluxo-login-visitas.puml)

Demonstra a sequência de interações desde o login até a classificação de trilhas:

1. **Login**: Usuário → App → AuthService → API
2. **Navegação**: Acesso às trilhas
3. **Classificação**: Organização das trilhas por categoria
4. **Visualização**: Acesso ao conteúdo específico
5. **Registro**: Acompanhamento do progresso

### 3. Classes Principais (uml-classes-login-trilhas.puml)

Foca nas entidades de negócio e seus relacionamentos:

**Classes Principais:**
- `Usuario`: Dados e autenticação
- `Trilha`: Conteúdo educacional
- `VisitaTrilha`: Histórico de acesso
- `CategoriaTriha`: Classificação de conteúdo

**Serviços Especializados:**
- `ClassificadorTrilhas`: Organização inteligente
- `ServicoAnalytics`: Análise de dados

### 4. Casos de Uso (uml-casos-uso-login-trilhas.puml)

Define as funcionalidades por tipo de usuário:

**Usuário Não Autenticado:**
- Visualizar trilhas públicas
- Fazer login/cadastro
- Classificar trilhas

**Usuário Autenticado:**
- Acompanhar progresso
- Ver recomendações
- Gerar relatórios

**Administrador:**
- Gerenciar trilhas
- Ver analytics do sistema

## ⚙️ Funcionalidades Mapeadas

### 🔐 Sistema de Login

| Funcionalidade | Status | Diagrama |
|----------------|--------|----------|
| Login com email/senha | 📋 Documentado | Todos |
| Cadastro de usuário | 📋 Documentado | Classes, Casos de Uso |
| Recuperação de senha | 📋 Documentado | Casos de Uso |
| Gestão de sessão | 📋 Documentado | Classes |
| Atualização de perfil | 📋 Documentado | Todos |

### 📚 Classificação de Trilhas

| Funcionalidade | Status | Diagrama |
|----------------|--------|----------|
| Listagem de trilhas | ✅ Implementado | Todos |
| Filtro por categoria | 📋 Documentado | Classes, Casos de Uso |
| Classificação por nível | 📋 Documentado | Classes |
| Ordenação por popularidade | 📋 Documentado | Classes |
| Busca de trilhas | 📋 Documentado | Casos de Uso |
| Progresso do usuário | 📋 Documentado | Todos |

### 📊 Analytics e Visitas

| Funcionalidade | Status | Diagrama |
|----------------|--------|----------|
| Registro de visitas | 📋 Documentado | Sequência, Classes |
| Acompanhamento de progresso | 📋 Documentado | Todos |
| Histórico de visualizações | 📋 Documentado | Classes, Casos de Uso |
| Relatórios de progresso | 📋 Documentado | Casos de Uso |
| Recomendações personalizadas | 📋 Documentado | Casos de Uso |

## 🔗 Relacionamento com a API

Os diagramas mapeiam os seguintes endpoints da API:

### Autenticação
- `POST /login` - Login de usuário
- `POST /cadastro` - Cadastro de usuário
- `PUT /user/` - Atualização de perfil
- `DELETE /user/` - Exclusão de conta

### Trilhas
- `GET /trilhas` - Listagem de trilhas
- `GET /trilhas/{id}` - Detalhes da trilha
- `POST /trilhas` - Criação de trilha (admin)
- `PUT /trilhas/{id}` - Edição de trilha (admin)
- `DELETE /trilhas/{id}` - Exclusão de trilha (admin)

## 📝 Notas de Implementação

### Estado Atual
- ✅ Interface de trilhas implementada
- ✅ Navegação básica funcionando
- ✅ API de trilhas documentada
- 📋 Sistema de login planejado
- 📋 Analytics de visitas planejado

### Próximos Passos
1. Implementar telas de login/cadastro
2. Adicionar sistema de autenticação
3. Implementar acompanhamento de progresso
4. Criar sistema de classificação inteligente
5. Adicionar analytics e relatórios

---

**Legenda:**
- ✅ Implementado
- 📋 Documentado/Planejado
- ❌ Não implementado

Para mais detalhes sobre a API, consulte: [Documentação da API](docAPI.md)