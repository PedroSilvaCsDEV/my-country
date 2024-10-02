
# Explorador de Países

## Descrição
O **Explorador de Países** é uma aplicação web que permite explorar informações sobre países de todo o mundo. Através da API RestCountries, o usuário pode visualizar detalhes sobre cada país, como nome, bandeira, capital, região, sub-região, população, área, idiomas, moedas, fuso horário, domínio de internet, e código de discagem internacional.

A aplicação possui uma interface simples e intuitiva, com funcionalidade de busca e filtros, além de um sistema de scroll infinito para carregar a lista de países dinamicamente.

## Tecnologias Utilizadas

- **React**: Framework JavaScript para construção da interface de usuário.
- **Tailwind CSS**: Framework CSS para design responsivo e estilização.
- **API RestCountries**: API pública utilizada para obter dados sobre os países.
- **Vercel**: Plataforma de deploy utilizada para hospedar a aplicação.

## Funcionalidades

### 1. Tela de Listagem de Países
- Exibição de uma lista de países com nome, bandeira, capital e região.
- Implementação de scroll infinito para carregar mais países à medida que o usuário rola a página.
- Campo de busca para encontrar países por nome.
- Filtros dinâmicos para refinar a lista de países com base em critérios como continente ou sub-região.

### 2. Tela de Detalhes do País
- Exibição de informações detalhadas sobre o país selecionado, incluindo:
  - Nome oficial
  - Bandeira
  - Capital
  - Região e sub-região
  - População e área
  - Idiomas e moedas
  - Fuso horário e domínio de internet
  - Código de discagem internacional
- Navegação de volta para a lista de países.

## Estrutura do Projeto

```
my-country
├── .gitignore
├── README.md
├── extractor
│   ├── countries.json
│   ├── keys.py
│   └── regions.py
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.svg
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   │   ├── CountryCard.jsx
│   │   ├── CountryFilters.jsx
│   │   └── CountryList.jsx
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── pages
│   │   ├── CountryDetails.jsx
│   │   └── Home.jsx
│   ├── reportWebVitals.js
│   └── setupTests.js
└── tailwind.config.js
```

## Scripts Python

Dentro da pasta `extractor`, existem três arquivos Python utilizados para extrair dados da API RestCountries e gerar o arquivo JSON `countries.json`.

1. **keys.py**: Script responsável por extrair todas as chaves únicas do JSON da API.
2. **regions.py**: Script que extrai as regiões e sub-regiões dos países.
3. **countries.json**: Arquivo gerado a partir dos scripts Python contendo informações de todos os países.

## Link da Aplicação

A aplicação está hospedada no Vercel e pode ser acessada através do seguinte link:

[https://my-country-ten.vercel.app/](https://my-country-ten.vercel.app/)

## Como Rodar o Projeto Localmente

### 1. Clone o Repositório

```
git clone https://github.com/seu-usuario/my-country.git
```

### 2. Instale as Dependências

```
npm install
```

### 3. Execute a Aplicação

```
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).
