# LactareConnect — Backend

Backend da solução **LactareConnect**, desenvolvida como entrega do Challenge FIAP em parceria com a Eurofarma.

## Sobre o projeto

O LactareConnect conecta nutrizes doadoras a bancos de leite humano, cobrindo todo o fluxo de doação: exames pré-doação, agendamento de coleta e registro da doação. A plataforma também conta com um sistema de recompensas em "Gotinhas" (moeda virtual ganha ao doar, trocável por prêmios), suporte via chatbot ("Lila") e um painel administrativo interno (campanhas, relatórios).

Este repositório contém o backend da solução: uma API REST em NestJS + TypeScript, com persistência em Oracle.

## Stack

- [NestJS 11](https://nestjs.com/) + TypeScript
- [TypeORM](https://typeorm.io/) + `oracledb` (modo Thin — sem necessidade de Oracle Instant Client instalado)
- Banco de dados **Oracle** (externo/cloud)
- Autenticação **JWT** (`@nestjs/jwt` + `passport-jwt`) com controle de acesso por perfil (RBAC)
- Documentação **Swagger/OpenAPI** (`@nestjs/swagger`)
- Validação de entrada com `class-validator` / `class-transformer`
- Docker + Docker Compose

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados
- Acesso a um banco Oracle (host, porta, SID, usuário e senha) — pode usar suas próprias credenciais ou as credenciais de desenvolvimento já fornecidas neste README

Não é necessário ter Node.js, npm ou Oracle Instant Client instalados localmente: tudo roda dentro do container.

## Configuração do ambiente

1. Copie o arquivo de exemplo:

   ```bash
   cp .env.example .env
   ```

2. Preencha o `.env`. Duas opções:

   **Opção A — usar suas próprias credenciais Oracle:**

   ```dotenv
   APP_PORT=3000

   JWT_SECRET=escolha-um-segredo-qualquer
   JWT_EXPIRES_IN=1d

   DB_HOST=seu-host-oracle
   DB_PORT=1521
   DB_SID=seu-sid
   DB_USER=seu-usuario
   DB_PASSWORD=sua-senha
   DB_SYNCHRONIZE=true
   DB_LOGGING=false
   ```

   **Opção B — usar o mesmo Oracle utilizado no desenvolvimento** (ambiente de treinamento da FIAP, sem dados sensíveis reais — use estas credenciais se não quiser configurar um Oracle próprio):

   ```dotenv
   APP_PORT=3000

   JWT_SECRET=lactareconnect-dev-secret-fiap-2026
   JWT_EXPIRES_IN=1d

   DB_HOST=oracle.fiap.com.br
   DB_PORT=1521
   DB_SID=ORCL
   DB_USER=rm557716
   DB_PASSWORD=090905
   DB_SYNCHRONIZE=true
   DB_LOGGING=false
   ```

   > **Nota:** com `DB_SYNCHRONIZE=true`, o TypeORM cria automaticamente todas as tabelas necessárias no schema Oracle informado na primeira inicialização da aplicação — **não é preciso rodar nenhuma migration manual**. Todas as tabelas são criadas com o prefixo `LC_` (ex: `LC_nutrizes`, `LC_administradores`), para não colidir com outras tabelas que já existam no mesmo schema.

## Como rodar com Docker

O `docker-compose.yml` sobe apenas o container da API — **não há container de banco de dados**, já que o Oracle é externo (cloud/servidor à parte). A aplicação se conecta ao Oracle usando as credenciais do `.env`.

**Construir a imagem e iniciar o container:**

```bash
docker compose up --build
```

(use `-d` para rodar em segundo plano: `docker compose up --build -d`)

Ao final do log deve aparecer `Nest application successfully started`. A API fica disponível em `http://localhost:3000` (ou na porta definida em `APP_PORT`).

**Parar o container (mantendo os dados):**

```bash
docker compose stop
```

**Parar e remover containers, rede e imagens criadas:**

```bash
docker compose down
```

## Versionamento das rotas

Todas as rotas são versionadas via URI, com `v1` como padrão. Exemplo: `GET /nutrizes` deve ser chamado como `GET /v1/nutrizes`.

## Documentação interativa (Swagger)

Com a aplicação rodando, acesse:

```
http://localhost:3000/docs
```

Lá é possível ver todos os endpoints, seus DTOs de entrada/saída, e testar requisições diretamente pelo navegador. Para testar rotas protegidas, clique em **Authorize** e cole o `accessToken` obtido no login (veja abaixo).

## Autenticação e permissões

A API usa login por e-mail/senha com token JWT (`POST /v1/auth/login`), com três perfis de acesso:

- **Rotas administrativas** (`Administrador`, `Campanha`, `RelatorioGerado`, `TransacaoGotinhas`, `Conversa`, `Mensagem`): exigem token de administrador.
- **Rotas de catálogo** (`BancoLeite`, `Recompensa`, `PerguntaFrequente`): leitura aberta a qualquer usuário autenticado, escrita restrita a administrador.
- **Rotas de dono do registro** (`Nutriz`, `Endereco`, `PreferenciasUsuario`, `ExamePreDoacao`, `Agendamento`, `Doacao`, `Resgate`, `FeedbackFaq`): uma nutriz só acessa/edita os próprios dados; administrador acessa todos.

O cadastro de uma nova nutriz (`POST /v1/nutrizes`) é a única rota totalmente pública, pois é o ponto de entrada de um novo usuário no sistema.

> **Administrador inicial:** como cadastrar um administrador exige um token de administrador, não haveria como criar o primeiro administrador pela API em um banco vazio. Por isso, a aplicação garante automaticamente, a cada inicialização, que exista um administrador fixo — se ele ainda não existir, é criado (`email: admin@lactareconnect.com`, `senha: admin123`). Use essa conta para obter o primeiro token administrativo; a partir dela é possível cadastrar os demais administradores normalmente via `POST /v1/administradores`.

## Exemplos de uso

Fluxo sugerido para testar a API do zero (os mesmos passos também podem ser feitos direto pelo Swagger em `/docs`):

### 1. Login como administrador

`POST /v1/auth/login`

```json
{
  "email": "admin@lactareconnect.com",
  "senha": "admin123",
  "tipo": "administrador"
}
```

Resposta:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "tipo": "administrador",
  "id": 1,
  "nome": "Administrador Inicial"
}
```

Use o `accessToken` no cabeçalho `Authorization: Bearer <accessToken>` nas próximas chamadas que exigirem autenticação.

### 2. Cadastrar uma nutriz

`POST /v1/nutrizes` (rota pública, não exige token)

```json
{
  "nome": "Maria Silva",
  "cpf": "12345678900",
  "dataNascimento": "1995-05-10",
  "telefone": "11999999999",
  "email": "maria@exemplo.com",
  "senha": "senha123"
}
```

Resposta:

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "cpf": "12345678900",
  "dataNascimento": "1995-05-10T00:00:00.000Z",
  "telefone": "11999999999",
  "email": "maria@exemplo.com",
  "status": "pendente",
  "saldoGotinhas": 0,
  "dataCadastro": "2026-07-28T05:00:00.000Z",
  "enderecoId": null,
  "preferenciasId": null
}
```

Guarde o `id` retornado — ele é usado como `nutrizId` nos exemplos seguintes.

### 3. Login como a nutriz recém-criada

`POST /v1/auth/login`

```json
{
  "email": "maria@exemplo.com",
  "senha": "senha123",
  "tipo": "nutriz"
}
```

### 4. Cadastrar o endereço da nutriz

`POST /v1/enderecos` (exige `Authorization: Bearer <accessToken-da-nutriz>`)

```json
{
  "nutrizId": 1,
  "cep": "01310-100",
  "rua": "Avenida Paulista",
  "numero": "1000",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "uf": "SP"
}
```

O mesmo padrão vale para as demais entidades que dependem de um `nutrizId`, `bancoId`, `agendamentoId`, etc.: crie primeiro o registro "pai" (nutriz, banco de leite, agendamento...), pegue o `id` retornado, e use-o no corpo da próxima requisição. Todos os endpoints, seus parâmetros e exemplos de payload também podem ser explorados diretamente pelo Swagger (`/docs`).

## Estruturas de entrada e saída

Todas as rotas usam DTOs próprios tanto para receber dados (`create-*.dto.ts` / `update-*.dto.ts`, com validação via `class-validator`) quanto para devolver respostas (`*-response.dto.ts`). As entidades persistidas (TypeORM) nunca são expostas diretamente na API — os DTOs de resposta selecionam apenas os campos relevantes (nunca dados sensíveis, como hash de senha) e representam relacionamentos como o id do registro relacionado (ex: `nutrizId`), em vez de objetos aninhados.

---

<p align="center">
  <img src="docs/assets/eurofarma-logo.png" alt="Eurofarma" height="50" />
  &nbsp;&nbsp;&nbsp;×&nbsp;&nbsp;&nbsp;
  <img src="docs/assets/fiap-logo.png" alt="FIAP" height="50" />
</p>
