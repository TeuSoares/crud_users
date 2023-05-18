# CRUD - Listagem de usuários

## Telas do projeto

### 1 - Dashboard
> Ao carregar a página

![Dashboard](https://i.imgur.com/mBZQ753.png)

> Ao realizar uma pesquisa por um usuário

![Dashboard ao pesquisar](https://i.imgur.com/34jh75I.png)

### 2 - Cadastro
> Formulário de cadastro de usuário

![Cadastro](https://i.imgur.com/UjpfPiH.png)

### 3 - Página do usuário
> Página para visualizar informações de um usuário específico

![Página do usuário](https://i.imgur.com/CXOPOAq.png)

### 4 - Edição
> Formulário de edição do usuário

![Edição do usuário](https://i.imgur.com/466Z4LE.png)

## O que foi usado

* ReactJS
* TypeScript
* PHP
* Banco de dados (MySql)
* Styled-Components
* Arquitetura MVC
* Criação de APIs REST utilizando Slim-Framework
* Formulários avançados com React Hook Form e Zod
* Consumo de API com React Query

## Funcionalidades
* [x] Cadastro de usuários, com as devidas validações de inputs
* [x] Visualizar na dashboard todos os usuários cadastrados no banco
* [x] Fazer a pesquisa por um usuário específico
* [x] Visualizar as informação de determinado usuário, de acordo com o ID
* [x] Deletar um usuário
* [x] Atualizar os dados de um usuário

## Como rodar

Pré-Requisitos
* NodeJS: https://nodejs.org/en/
* WampServer: https://www.wampserver.com/en/
* Composer: https://getcomposer.org/download/
  
Antes de tudo, clone este repositório
```bash
    git clone https://github.com/TeuSoares/crud_users.git
```

Configurando servidor 👇
1. Execute o seu servidor wampserver

2. Acesse a URL http://localhost/phpmyadmin/index.php
   
3. Crie um novo banco de dados e importe a tabela que está dentro da pasta database
   
4. Configure uma variável de ambiente de usuário no Path com o seguinte valor:
```bash
    C:\wamp64\bin\php\php7.4.26
```
  
5. Instale as dependências dentro de server
```bash
    cd server
```
```bash
    composer install
```

6. Crie um arquivo `.env` dentro da pasta server com as informações do banco de dados
```
DB_HOST = "localhost"
DB_NAME = <nomeDoBanco>
DB_USERNAME = "root"
DB_PASSWORD = ""
```

7. Rode o servidor:
```bash
    composer run server
```

Inicializando o projeto 👇

1. Acesse a pasta web
```bash
    cd web
```

1. Instalando dependências
```bash
    npm install
```

1. Inicializar projeto
```bash
    npm run dev
```

## Vídeo de apresentação

https://user-images.githubusercontent.com/70549313/233874112-c15e639d-674c-4f01-9b3b-508a9595f716.mp4

## Autor

* **Mateus Soares** [Linkedin](https://www.linkedin.com/in/mateus-soares-santos/)

## Versão

1.0.0
