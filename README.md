# FB Campaigns API

Uma API REST para gerenciamento de campanhas publicitárias.

## Instalação

Para instalar as dependências do projeto, execute o comando abaixo:

```bash
yarn install
```

## Antes de executar
Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) e crie um cluster. Após isso, crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
MONGODB_USERNAME=<username>
MONGODB_PASSWORD=<password>
MONGODB_HOST=<host>
MONGODB_DATABASE=<database>
```

## Executando o projeto

Para executar o projeto em desenvolvimento, execute o comando abaixo:

```bash
yarn dev
```

Para executar o projeto em produção, execute os comandos abaixo:

```bash
yarn build
yarn start
```
