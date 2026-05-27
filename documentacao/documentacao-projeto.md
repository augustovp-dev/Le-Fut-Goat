# Le' Fut Goat

## Visão Geral

O Le' Fut Goat é um site sobre futebol com páginas informativas, cadastro, login e uma dashboard interativa para montar uma carta de jogador no estilo FIFA.

O projeto foi desenvolvido a partir da base web-data-viz, mas foi adaptado para um tema próprio. A proposta é unir conteúdo pessoal, história do futebol e uma experiência simples de análise de atributos.

## Objetivo

Criar uma aplicação web simples, funcional e fácil de apresentar, conectando o tema futebol com recursos básicos de front-end, back-end, banco de dados e visualização de dados.

## Público-Alvo

O projeto é voltado para pessoas que gostam de futebol, principalmente estudantes e usuários que querem interagir com uma carta de jogador e conhecer a história por trás do tema escolhido.

## Justificativa

O futebol foi escolhido por ser um tema forte na minha trajetória pessoal. Além de ser um esporte popular, ele representa disciplina, trabalho em equipe, superação e tomada de decisão.

No projeto, esse tema aparece de duas formas:

- Conteúdo informativo sobre futebol.
- Uma dashboard que transforma atributos em uma análise visual.

## Funcionalidades

- Página inicial com vídeo de fundo e cards sobre futebol.
- Página de história pessoal no futebol.
- Cadastro de usuário.
- Login de usuário.
- Menu adaptado para usuário logado ou deslogado.
- Dashboard com atributos de jogador.
- Cálculo de overall.
- Sugestão de posição ideal.
- Gráfico radar com Chart.js.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL
- Chart.js
- Git e GitHub
- Trello

## Estrutura do Projeto

```text
Le-Fut-Goat
├── app.js
├── package.json
├── banco de dados
│   └── script inicial banco de dados.sql
├── public
│   ├── index.html
│   ├── login.html
│   ├── cadastro.html
│   ├── dashboard.html
│   ├── minhaHistoria.html
│   ├── dashboard.js
│   ├── cssHeader.css
│   ├── js
│   │   └── sessao.js
│   └── assets
└── src
    ├── controllers
    │   └── usuarioController.js
    ├── database
    │   └── config.js
    ├── models
    │   └── usuarioModel.js
    └── routes
        └── usuarios.js
```

## Páginas

### Home

A página inicial apresenta o tema do projeto, cards com informações sobre futebol e chamadas para cadastro e dashboard.

### Minha História

Página que apresenta a relação pessoal com o futebol, principais momentos, desafios, aprendizados e destaques.

### Cadastro

Tela para criar uma conta com nome, email, senha e confirmação de senha. Os dados são enviados para a rota de cadastro do back-end.

### Login

Tela para autenticar o usuário. Quando o login funciona, os dados principais são salvos no `sessionStorage`.

### Dashboard

Tela interativa onde o usuário informa atributos de 0 a 100:

- Ritmo
- Chute
- Passe
- Drible
- Defesa
- Físico

Com esses dados, o sistema calcula o overall, sugere uma posição ideal e exibe um gráfico radar.

## Back-End

O servidor fica no arquivo `app.js`.

Ele usa Express para:

- Servir os arquivos estáticos da pasta `public`.
- Receber requisições de cadastro.
- Receber requisições de login.
- Conectar as rotas de usuário.

## Rotas

### POST /usuarios/cadastrar

Recebe os dados do formulário de cadastro e envia para o model gravar no banco.

Dados esperados:

```json
{
  "nomeServer": "Nome do usuário",
  "emailServer": "email@exemplo.com",
  "senhaServer": "senha"
}
```

### POST /usuarios/autenticar

Recebe email e senha, consulta o banco e retorna os dados do usuário se o login estiver correto.

Dados esperados:

```json
{
  "emailServer": "email@exemplo.com",
  "senhaServer": "senha"
}
```

## Banco de Dados

O projeto usa MySQL. O script principal está em:

```text
banco de dados/script inicial banco de dados.sql
```

A tabela usada pelo cadastro e login é `usuarios`.

## Dashboard

A dashboard calcula o overall pela média dos seis atributos informados.

Exemplo:

```text
Overall = (ritmo + chute + passe + drible + defesa + físico) / 6
```

A posição ideal é definida por regras simples:

- Defesa e físico altos: zagueiro.
- Passe e drible altos: meio-campo.
- Chute alto: atacante.
- Ritmo e drible altos: ponta.
- Ritmo e defesa altos: lateral.
- Caso contrário: volante.

## Como Executar

1. Instalar as dependências:

```bash
npm install
```

2. Criar o banco de dados no MySQL usando o script da pasta `banco de dados`.

3. Conferir as configurações do arquivo `.env.dev`.

4. Iniciar o servidor:

```bash
npm start
```

5. Abrir no navegador:

```text
http://localhost:3333
```

## Validações

Cadastro:

- Campos obrigatórios.
- Nome com pelo menos 2 caracteres.
- Email em formato válido.
- Senha com pelo menos 6 caracteres.
- Confirmação de senha igual à senha.

Login:

- Email obrigatório.
- Senha obrigatória.
- Validação no banco de dados.

Dashboard:

- Atributos menores que 0 viram 0.
- Atributos maiores que 100 viram 100.
- Campos vazios são considerados 0.

## Pontos Fortes

- Tema pessoal e fácil de defender na apresentação.
- Estrutura simples.
- Separação entre rota, controller, model e configuração do banco.
- Dashboard visual com gráfico.
- Menu reaproveitado por script de sessão.

## Pontos de Melhoria

- Criptografar senhas antes de salvar no banco.
- Criar histórico das cartas geradas.
- Permitir salvar uma carta por usuário.
- Melhorar responsividade da dashboard.
- Exibir ranking de jogadores cadastrados.
- Criar tela de perfil do usuário.

## Conclusão

O Le' Fut Goat mostra como um tema pessoal pode virar uma aplicação web completa. O projeto usa cadastro, login, banco de dados e visualização de dados para transformar a paixão pelo futebol em uma experiência interativa.
