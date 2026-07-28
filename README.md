# LactareConnect — API Backend

API REST do **LactareConnect**, plataforma que conecta nutrizes doadoras a bancos de leite humano. A solução cobre todo o fluxo de doação (exames pré-doação, agendamento de coleta e registro da doação), um sistema de recompensas em "Gotinhas" (moeda virtual ganha ao doar, trocável por prêmios), suporte via chatbot ("Lila") e um painel administrativo interno (campanhas, relatórios).

Projeto desenvolvido para a Sprint 3 da FIAP, implementando a solução definida nas Sprints 1 e 2.

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
- Acesso a um banco Oracle (host, porta, SID, usuário e senha) — não incluso no repositório

Não é necessário ter Node.js, npm ou Oracle Instant Client instalados localmente: tudo roda dentro do container.

## Configuração do ambiente

1. Copie o arquivo de exemplo:

   ```bash
   cp .env.example .env
   ```

2. Preencha o `.env` com suas próprias credenciais Oracle e um segredo de JWT:

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

> **Conta de administrador de teste:** o schema Oracle usado neste projeto já possui um administrador cadastrado (`dev@lactareconnect.com` / `admin123`), criado durante o desenvolvimento e mantido intencionalmente no banco para permitir o teste imediato das rotas administrativas. Não é necessário (nem possível pela API) criar um administrador "do zero", já que a criação de administradores exige um token de administrador — use essa conta para obter o primeiro token.

## Exemplos de uso

Fluxo sugerido para testar a API do zero (todos os exemplos abaixo usam `curl`, mas os mesmos passos podem ser feitos pelo Swagger em `/docs`):

**1. Login como administrador (para acessar rotas administrativas):**

```bash
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dev@lactareconnect.com","senha":"admin123","tipo":"administrador"}'
```

A resposta traz `accessToken`. Use-o no cabeçalho `Authorization: Bearer <accessToken>` nas próximas chamadas.

**2. Cadastrar uma nutriz (rota pública, não exige token):**

```bash
curl -X POST http://localhost:3000/v1/nutrizes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "cpf": "12345678900",
    "dataNascimento": "1995-05-10",
    "telefone": "11999999999",
    "email": "maria@exemplo.com",
    "senha": "senha123"
  }'
```

Guarde o `id` retornado — ele é usado como `nutrizId` nos exemplos seguintes.

**3. Login como a nutriz recém-criada:**

```bash
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@exemplo.com","senha":"senha123","tipo":"nutriz"}'
```

**4. Usar o token da nutriz para cadastrar seu endereço:**

```bash
curl -X POST http://localhost:3000/v1/enderecos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken-da-nutriz>" \
  -d '{
    "nutrizId": 1,
    "cep": "01310-100",
    "rua": "Avenida Paulista",
    "numero": "1000",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "uf": "SP"
  }'
```

O mesmo padrão vale para as demais entidades que dependem de um `nutrizId`, `bancoId`, `agendamentoId`, etc.: crie primeiro o registro "pai" (nutriz, banco de leite, agendamento...), pegue o `id` retornado, e use-o no corpo da próxima requisição. Todos os endpoints, seus parâmetros e exemplos de payload também podem ser explorados diretamente pelo Swagger (`/docs`).

## Estruturas de entrada e saída

Todas as rotas usam DTOs próprios tanto para receber dados (`create-*.dto.ts` / `update-*.dto.ts`, com validação via `class-validator`) quanto para devolver respostas (`*-response.dto.ts`). As entidades persistidas (TypeORM) nunca são expostas diretamente na API — os DTOs de resposta selecionam apenas os campos relevantes (nunca dados sensíveis, como hash de senha) e representam relacionamentos como o id do registro relacionado (ex: `nutrizId`), em vez de objetos aninhados.
