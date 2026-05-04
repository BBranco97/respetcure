# ResPetCure 🐾

Sistema web desenvolvido para conectar ONGs e pessoas interessadas em:

- adoção de animais
- lar temporário
- animais perdidos e encontrados
- divulgação de campanhas e eventos

---

# Tecnologias utilizadas

## Backend

- Java 17
- :contentReference[oaicite:1]{index=1}
- Spring Data JPA
- Hibernate
- SQL Server
- Maven

## Frontend

- :contentReference[oaicite:2]{index=2}
- TypeScript
- Vite
- Tailwind CSS

## Ferramentas

- Git
- :contentReference[oaicite:3]{index=3}
- :contentReference[oaicite:4]{index=4}

---

# Funcionalidades implementadas

## Usuários

- cadastro
- consulta
- atualização
- exclusão

## Recuperação de senha

- geração de token
- envio de e-mail
- expiração automática
- redefinição de senha

## Anúncios

- adoção
- achados e perdidos

---

# Estrutura do projeto

```text
respetcure/
├── backend/
└── frontend/
```

---

# Como executar

## Backend

```bash
cd backend
./mvnw spring-boot:run
```

Servidor:

```text
http://localhost:8080
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Servidor:

```text
http://localhost:5173
```

---

# Telas implementadas

- Página inicial
- Login
- Cadastro
- Recuperação de senha
- Redefinição de senha

---

# Próximas implementações

- autenticação JWT
- upload de imagens
- dashboard administrativo
- integração com WhatsApp

---

# Desenvolvido por

Bárbara Branco Gasques