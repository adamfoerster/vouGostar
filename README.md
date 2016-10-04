# vouGostar?
*Um APP de recomendações de filmes baseado em busca de perfis similares*

Meu primeiro APP. Um projeto que iniciei para estudar AngularJS, NodeJs e Ionic.

A ideia central do APP parte do princípio que nenhum sistema atual de recomendações de filmes (Netflix, IMDB etc) parece acertar meus gostos.

## Versão atual
Como é um projeto pequeno e eu sou o único desenvolvedor, não me atenho tão estritamente a versões. Mas pelo roadmap as features atuais colocam o vouGostar na versão *0.4.x*.

## API de filmes
Desejava usar a API do trakt inicialmente. Mas tive muitos problemas para sequer logar nela. Reconsiderei e acabei usando uma API bem mais simples chamada [OMDB](http://www.omdbapi.com/).

## Backend
Criar os perfis diferentes e especialmente, compará-los exigirá um máquina mais forte. Portanto as comparações e criação de perfis será feito externamente e consutada via API. Inicialmente pretendia fazer essa API em NodeJs, mas talvez simplifique e faça em PHP Yii2 (framework no qual já tenho familiaridade).

## Material Design
Pretendia usar o Ionic Material, mas como este projeto foi abandonado estou considerando usar o [Material Design Lite] (https://github.com/google/material-design-lite), mesmo este não sendo feito especificamente para mobile. Mas com o anúncio que o Ionic2 trará o tema Material já como parte integral estou considerando se o esforço valerá a pena. Talvez acabe deixando com o tema regular do Ionic 1.

## Roadmap

- 0.1 - Versão com o layout inicial das telas de listagem de filmes e de informações e horários.
- 0.2 - Consulta da lista de filmes dinâmicamente através de um serviço. Menu lateral.
- 0.3 - Armazenamento das listas de filmes e imagens em um cache no celular para diminuir o tráfego de dados.
- 0.4 - Possibilidade de votar (positiva ou negativamente nos filmes). Fazer as pesquisas alimentarem e carregarem o cache, e não apenas o dash.
- 0.5 - Autenticação (OAuth?). Material design.
- 0.6 - Criação da tela de instalação e aprendizado inicial.
- 0.7 - Criação dos perfis de comparação
- 0.8 - Implementação da tela de Opções. Com a possibilidade de resetar todos os dados do usuário.
- 0.9 - Notificações PUSH de novos filmes que o usuário gostaria de ver.
- 1.0 - Release com todas as funções propostas implementadas.
