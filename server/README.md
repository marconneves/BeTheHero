  ![BeTheHero][logo-image]

  ## Projeto desenvolvido na semana Semana Omnistack 11.0 
  ---
  [![License: MIT][license-image]][license-link]<br>
  ![Deploy Develop - Test, Build & Redeploy](https://github.com/marconwillian/BeTheHero/workflows/Deploy%20Develop%20-%20Test,%20Build%20&%20Redeploy/badge.svg)<br>
  ![Deploy - Test, Build & Redeploy](https://github.com/marconwillian/BeTheHero/workflows/Deploy%20-%20Test,%20Build%20&%20Redeploy/badge.svg)<br>

  Esse projeto foi feito com a intensão de platicar meus conhecimentos na stack do JavaScript.
  Este projeto foi feito com 3 técnologias basicas, que forão divididas em repositórios diferente, são elas:
  - [**Node.js - backend (Este Respositório)**](#rocket-tecnologias)
  - [React.js - frondend / desktop][repo-frontend]
  - [React Native - mobile][repo-mobile]

  Abaixo vamos tudo sobre o nosso projeto para **backend**.

  ## :rocket: Tecnologias

  - Main Libs
    - [![express (latest)](https://img.shields.io/npm/v/express/latest?label=Express&style=flat-square)][npm-express] | Usado para configurar as rotas e fazer a aplicação ouvir uma porta especifica (port:3333).
    - [![celebrate (latest)](https://img.shields.io/npm/v/celebrate/latest?label=Celebrate&style=flat-square)][npm-celebrate] | Integração do Express com o Joi para validação de dados.
    - [![knex (latest)](https://img.shields.io/npm/v/knex/latest?label=knex.js&style=flat-square)][npm-knex] | Usado para itegrar a aplicação com o banco de dados, neste caso usado o Sqlite3
    - [![Sqlite3 (latest)](https://img.shields.io/npm/v/sqlite3/latest?label=Sqlite3&style=flat-square)][npm-sqlite] | Banco de dados rodando velo node.js
    - [![Cors (latest)](https://img.shields.io/npm/v/cors/latest?label=Cors&style=flat-square)][npm-cors] | Usado para proteger e altenticar a origem das requisições na api.

  - Test Libs
    - [![jest (latest)](https://img.shields.io/npm/v/jest/latest?label=Jest&style=flat-square)][npm-jest] | Usado para fazer os testes na aplicação.
    - [![supertest (latest)](https://img.shields.io/npm/v/supertest/latest?label=SuperTest&style=flat-square)][npm-supertest] | Usado para fazer tste atravez da rota inteira.
    - [![cross-env (latest)](https://img.shields.io/npm/v/cross-env/latest?label=Cross+Env&style=flat-square)][npm-cross-env] | Usado para definir process universais.

s
  ## :minidisc: Descrição
  O projeto é uma plataforma para que ongs possão fazer uma conta (Versão desktop), e poder cadastrar os casos que precisa de ajuda, exemplo titulo, descrição e o valor da ajuda, e após o cadastro, estes casos fica disponivel no app mobile para que as pessoas possão visualizar os casos da região e enviar um email ou mensagem no whatsapp para a ong, assim podendo a ajudar.

  Ele foi publicado em: https://api.bethehero.projects.themark.dev.
  Sua Documentação é: https://api.bethehero.projects.themark.dev/docs.
  ****
  Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/https://github.com/TheMarkWill/BeTheHero/tree/main/server/LICENSE) para mais detalhes.


  <!-- Markdown link & img dfn's -->
  [logo-image]: https://i.imgur.com/ftyy51h.png
  [license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
  [license-link]: https://opensource.org/licenses/MIT
  [repo-backend]: https://github.com/TheMarkWill/BeTheHero/tree/main/server#projeto-desenvolvido-na-semana-semana-omnistack-110
  [repo-frontend]: https://github.com/TheMarkWill/BeTheHero/tree/main/client#projeto-desenvolvido-na-semana-semana-omnistack-110
  [repo-mobile]: https://github.com/TheMarkWill/BeTheHero/tree/mamainster/mobile#projeto-desenvolvido-na-semana-semana-omnistack-110
  [npm-express]: https://www.npmjs.com/package/express
  [npm-celebrate]: https://www.npmjs.com/package/celebrate
  [npm-knex]: https://www.npmjs.com/package/knex
  [npm-sqlite]: https://www.npmjs.com/package/sqlite3
  [npm-cors]: https://www.npmjs.com/package/cors
  [npm-jest]: https://www.npmjs.com/package/jest
  [npm-supertest]: https://www.npmjs.com/package/supertest
  [npm-cross-env]: https://www.npmjs.com/package/cross-env
