# ImageCropper

Projeto de site para corte e tratamento de uma imagem.

## Ambiente
#### Instalação default
`deve ser executada em repositórios recem clonados`
```sh
$ npm install # para instalar as dependências do npm
$ gulp # task default, executa o jshint nos arquivos de source JS e carrega as dependencias do bower
```
#### Tasks específicas
```sh
$ gulp build:dev # Baixa as dependências do bower e faz a build dos arquivos minified da aplicação
$ gulp bower:dep # Carrega as dependências do bower no index.html, usado quando existirem novas dependências
$ gulp lint # Roda o JSHint nos fontes .JS
```

## Estrutura
```sh
- src/ # raíz dos arquivos de código
---- js/
---- css/
- www/ # raíz dos arquivos públicos
---- dist/ # arquivo incluído no gitignore contendo os bundles e fontes externas
---- icon/
---- fav/
---- index.html # formulário público
```

## Stack
[`npm`](http://npmjs.com/)
[`gulp`](http://gulpjs.com/)
[`bower`](http://bower.io/)
