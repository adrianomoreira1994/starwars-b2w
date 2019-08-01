# API Desafio - B2W

> Api responsável por registrar dados de um planeta e recuperar a quantidade de aparições deste planeta em filmes.

## Setup do Projeto

Para instalar as dependências que serão necessárias para o funcionando do projeto, será necessário executar o comando abaixo dentro da pasta do projeto.

Yarn:

```sh
yarn
```

NPM:

```sh
npm install
```

## Endpoints

0. POST: /api/users/authenticate - Parametros (username = documento, password)
1. GET: /api/planets - Listar todos os planetas cadastrados
1. GET: /api/planets/:planet - Listar planeta baseado no nome como parâmetro
1. POST: /api/planets - Cadastro de um novo planeta
1. DELETE: /api/planets/:id - Remoção de um planeta baseado no ID
1. GET: /api/planets/buscar/:id - Listar planeta baseado no ID

##

> Projeto foi configurado para atender ao comando [yarn dev] junto ao nodemon para ser iniciado.
