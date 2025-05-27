# **DOCUMENTAÇÃO API 🤘🏻🚀🛸**

# Endpoints de Trilhas 

## Listar Todas as Trilhas

### URL base do projeto: **https://capitech-back.vercel.app**

**GET /trilhas**

 - Retorna todas as trilhas disponíveis.

**Requerimentos:** Nenhum
**Resposta**: Lista de trilhas
##
## Obter uma Trilha por ID

**GET /trilhas/**

 - Retorna uma trilha específica baseada no ID fornecido.

**Requerimentos**:Nenhum
**Resposta**:Detalhes da trilha selecionada
##
## Criar uma Nova Trilha
**POST /trilhas**

 - Cadastra uma nova trilha no sistema.

**Requerimentos**:Token de autenticação válido

**Corpo da Requisição:**

    image_path (opcional): string
    description (opcional): string
    video_description (opcional): string
    name (opcional): string
    references (opcional): string
    subtitle (opcional): string
    video_title (opcional): string
    Resposta:
    Detalhes da trilha criada
##
## Editar uma Trilha Existente
PUT /trilhas/

 - Atualiza uma trilha existente com base no ID fornecido.

**Requerimentos**:Token de autenticação válido

**Corpo da Requisição:**

    image_path (opcional): string
    description (opcional): string
    video_description (opcional): string
    name (opcional): string
    references (opcional): string
    subtitle (opcional): string
    video_title (opcional): string

**Resposta**: Detalhes da trilha atualizada
##
## Excluir uma Trilha
**DELETE /trilhas/**

 - Remove uma trilha do sistema baseada no ID fornecido.

**Requerimentos**: Token de autenticação válido

**Resposta**: Mensagem de confirmação de exclusão
#
# Endpoints de Usuário
## Login de Usuário
**POST /login**



 - Autentica um usuário com email e senha.



**Requerimentos**:  

**Corpo da Requisição:**

    email: string
    password: string
    Resposta:
    Token de autenticação válido
#
## Cadastro de Novo Usuário
**POST /cadastro**

 - Registra um novo usuário no sistema.

**Requerimentos**:
**Corpo da Requisição:**

    email: string
    password: string
    adminCode: string (Deve ser "FatecVotorantim2024")
    name: string

**Resposta**: Detalhes do usuário cadastrado
#
## Editar Informações do Usuário
**PUT /user/**

 - Atualiza informações de um usuário existente com base no ID
   fornecido.

**Requerimentos:** Token de autenticação válido

**Corpo da Requisição:**

    email (opcional): string
    password (opcional): string
    name (opcional): string
    Resposta:
    Detalhes do usuário atualizado
#
## Excluir Usuário
**DELETE /user/**

 - Remove um usuário do sistema baseado no ID fornecido.

**Requerimentos:** Token de autenticação válido

**Resposta**: Mensagem de confirmação de exclusão do usuário

# Endpoints de Trilhas
## Listar Todas as Trilhas
**GET /trilhas**

 - Retorna todas as trilhas disponíveis.

**Requerimentos**: Nenhum

**Resposta**: Lista de trilhas
#
## Obter uma Trilha por ID
**GET /trilhas/**

 - Retorna uma trilha específica baseada no ID fornecido.

**Requerimentos**:Nenhum

**Resposta**:Detalhes da trilha selecionada
#
## Criar uma Nova Trilha
POST /trilhas

 - Cadastra uma nova trilha no sistema.

**Requerimentos**: Token de autenticação válido

**Corpo da Requisição:**

    image_path (opcional): string
    description (opcional): string
    video_description (opcional): string
    name (opcional): string
    references (opcional): string
    subtitle (opcional): string
    video_title (opcional): string

**Resposta**: Detalhes da trilha criada
#
## Editar uma Trilha Existente
**PUT /trilhas/**

 - Atualiza uma trilha existente com base no ID fornecido.

**Requerimentos**: Token de autenticação válido

**Corpo da Requisição:**

    image_path (opcional): string
    description (opcional): string
    video_description (opcional): string
    name (opcional): string
    references (opcional): string
    subtitle (opcional): string
    video_title (opcional): string

**Resposta:** vDetalhes da trilha atualizada
#
## Excluir uma Trilha
**DELETE /trilhas/**

 - Remove uma trilha do sistema baseada no ID fornecido.

**Requerimentos:** Token de autenticação válido

**Resposta**:
Mensagem de confirmação de exclusão

# Endpoints de Usuário
## Login de Usuário
**POST /login**

 - Autentica um usuário com email e senha.

**Requerimentos**:
Corpo da Requisição:

    email: string
    password: string

**Resposta:**
Token de autenticação válido
#
## Cadastro de Novo Usuário
**POST /cadastro**

 - Registra um novo usuário no sistema.

**Requerimentos**:
Corpo da Requisição:

    email: string
    password: string
    adminCode: string (Deve ser "FatecVotorantim2024")
    name: string

**Resposta**:
Detalhes do usuário cadastrado
#
## Editar Informações do Usuário
**PUT /user/**

    Atualiza informações de um usuário existente com base no ID fornecido.

**Requerimentos**: Token de autenticação válido

**Corpo da Requisição:**

    email (opcional): string
    password (opcional): string
    name (opcional): string

**Resposta**:
Detalhes do usuário atualizado
#
## Excluir Usuário
**DELETE /user/**

 - Remove um usuário do sistema baseado no ID fornecido.

**Requerimentos**: Token de autenticação válido

**Resposta**:
Mensagem de confirmação de exclusão do usuário



