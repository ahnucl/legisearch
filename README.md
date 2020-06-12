# Apresentação: LegiSearch

![barra do app](/docs/bar.png)

## Introdução

Esta pequena aplicação tem por objetivo listar os Senadores 
da República em exercício, bem como permitir visualizar algumas informações sobre os mesmos.

É possível baixar o repositório, instalá-lo e rodar localmente com:

```(shell)
npm install -- ou yarn install

npm run start -- ou yarn start
```

Mas o app também se encontra disponível em [https://legisearch.herokuapp.com/](https://legisearch.herokuapp.com/)

## Recursos usados

- React
- create-react-app: inicialização do projeto
- git: controle de versão
- axios: requisições http
- typescript: recursos de tipagem para o JS
- bootstrap: alguns componentes e classes
- heroku: hospedagem/ci

### APIs

Foram utilizadas apis de dados abertos do legislativo para obter dados em formato JSON.

- Lista de Senadores em exercício: [http://legis.senado.leg.br/dadosabertos/senador/lista/atual.json](http://legis.senado.leg.br/dadosabertos/senador/lista/atual.json)

- Lista de comissões de um dado Senador: [http://legis.senado.leg.br/dadosabertos/senador/5322/comissoes.json](http://legis.senado.leg.br/dadosabertos/senador/5322/comissoes.json)

Também foi utilizada api do IBGE para obter as unidades federativas:

- Lista das unidades federativas: [https://servicodados.ibge.gov.br/api/v1/localidades/estados](https://servicodados.ibge.gov.br/api/v1/localidades/estados)

## O que poderia ser melhorado

O maior desafio foi a _responsividade_, que inclusive não deve estar no melhor que poderia ser. A familiaridade com o _bootstrap_ também é algo a melhorar para poder extrair o melhor dos recursos e responsividade do mesmo.

## Outras funcionalidades que podem ser implementadas

- Envio de e-mail para o parlamentar a partir do app
- Adicionar animações durante as mudanças na lista de Senadores
- Adicionar aos cards dos Senadores algum overlay de carregamento

---
