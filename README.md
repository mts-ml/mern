
# 🛡️ Autenticação JWT com Refresh Token usando React + Node.js + Express + MongoDB

Este projeto é uma aplicação full-stack que implementa um sistema completo de autenticação baseado em **JWT (JSON Web Token)**, utilizando também **Refresh Token via cookies HttpOnly** para manter sessões seguras e automatizar a renovação do token de acesso.

O objetivo é demonstrar de forma clara como funciona todo o fluxo de autenticação, proteção de rotas, renovação de token e logout seguro.
<br /><br />

## 🚀 Tecnologias Utilizadas

- **Front-end:** React, React Router, Axios, TypeScript, TailwindCSS
- **Back-end:** Node.js, Express, MongoDB, Mongoose, JWT
- **Autenticação:** JWT + Refresh Token via Cookies HttpOnly
<br /><br />

## 🔐 Como Funciona o Sistema de Autenticação

### 🔸 Login com JWT

- O usuário realiza o login enviando seu usuário e senha.
- Se as credenciais estiverem corretas:
  - O servidor gera:
    - Um **Access Token (JWT)** — curto, válido por **30 segundos** (configurado assim para testes e para que você veja claramente o fluxo de renovação).
    - Um **Refresh Token** — salvo em um **cookie HttpOnly**, inacessível via JavaScript, com validade maior (ex.: 1 dia).
- O access token é usado para acessar as rotas protegidas.
<br />

### 🔄 Refresh Token Automático

- Quando o access token expira (30 segundos), o front automaticamente dispara uma requisição para a rota `/refresh`.
- O servidor verifica se o refresh token (armazenado no cookie) é válido:
  - ✅ Se for válido, gera um **novo access token**.
  - 🚫 Se for inválido ou expirado, o usuário recebe mensagem de erro.
- Esse processo é realizado através de um hook chamado `useAxiosPrivate` que gerencia a renovação automaticamente.

### 🚪 Logout Seguro

- No logout:
  - O cookie com o refresh token é deletado no backend.
  - O access token armazenado no contexto (`AuthContext`) no front-end também é limpo.
- Isso invalida totalmente a sessão, obrigando o usuário a logar novamente.
<br /><br />

## 👤 Usuários de Teste

|     E-mail      |   Senha    |  Papel |
|-----------------|------------|--------|
| admin@test.com  | Test123!@# | Admin  |
| editor@test.com | Test123!@# | Editor |
| user@test.com   | Test123!@# | User   |

> 🔧 **Observação:** Você pode criar novos usuários através da rota de registro normalmente.

<br />

## 🔍 Rota `/test` — Entendendo o que acontece por trás dos panos

- A rota `/test` foi criada especialmente para você visualizar de forma prática **como funciona o fluxo de autenticação**.
- Nela, você pode fazer chamadas para uma rota protegida e observar:
  - Quando o token expira.
  - Quando acontece o processo automático de **refresh**.
  - Se a renovação funciona corretamente.
- Ideal para aprendizado e testes, mostrando claramente os bastidores da autenticação.

## 📜 Funcionalidades

- ✅ Registro de novos usuários
- ✅ Login com geração de JWT e Refresh Token
- ✅ Logout seguro (remoção do refresh token)
- ✅ Renovação automática do Access Token
- ✅ Proteção de rotas no front-end e back-end
- ✅ Diferenciação por papéis de usuário (Admin, Editor, User)
- ✅ Visualização do fluxo de autenticação na prática através da página `/test`
<br /><br />

## 📂 Estrutura Básica

```bash
/
├── client (React Front-end)
│   ├── src
│   │   ├── components
│   │   ├── context (AuthContext)
│   │   ├── hooks (useAxiosPrivate, useRefreshToken)
│   │   ├── pages (Login, Register, Home, Test, Layout)
│   │   └── services (axios config)
│   └── ...
├── server (Node + Express + MongoDB Back-end)
│   ├── controllers (auth, refresh, logout)
│   ├── models (User)
│   ├── routes (authRoutes, userRoutes, logout, refresh)
│   └── middleware (verifyJWT, credentials, errorHandler)
└── ...
```

## ⚙️ Como Rodar o Projeto

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## 🧠 Conceitos Aplicados

- Autenticação Stateless (JWT)
- Cookies HttpOnly para refresh token (segurança contra XSS)
- Interceptadores de requisições com Axios
- Context API para gerenciamento global do access token
- Proteção de rotas públicas e privadas
- Clean Code e organização de pastas

## 💡 Observação Importante

> ⚠️ O tempo de expiração do Access Token foi propositalmente reduzido para **30 segundos**, justamente para que você possa visualizar claramente o processo de renovação automática.  
Em produção, recomenda-se tempos maiores (ex.: 5, 10, 15 minutos) dependendo da necessidade do sistema.

<br /><br /><br />
# EN

# 🛡️ JWT Authentication with Refresh Token, using React + Node.js + Express + MongoDB (English)

This project is a full-stack application that implements a complete authentication system based on **JWT (JSON Web Token)**, using **Refresh Token with HttpOnly cookies** to maintain secure sessions and automate token renewal.

The goal is to demonstrate how the authentication flow works, including route protection, token renewal, and secure logout.
<br /><br />

## 🚀 Technologies Used

- **Frontend:** React, React Router, Axios, TypeScript, TailwindCSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Authentication:** JWT + Refresh Token via HttpOnly Cookies
<br /><br />

## 🔐 How Authentication Works

### 🔸 Login with JWT

- The user logs in by providing a username and password.
- If the credentials are valid:
  - The server generates:
    - An **Access Token (JWT)** — short-lived, valid for **30 seconds** (set this way intentionally for testing and validation purposes).
    - A **Refresh Token** — stored in an **HttpOnly cookie**, inaccessible from JavaScript, with a longer expiration (e.g., 1 day).
- The access token is used to access protected routes.

### 🔄 Automatic Token Refresh

- When the access token expires (after 30 seconds), the frontend automatically sends a request to the `/refresh` route.
- The backend verifies the refresh token (stored in the cookie):
  - ✅ If valid, it issues a **new access token**.
  - 🚫 If invalid or expired, an error message is send.
- This process is carried out by a custom hook called `useAxiosPrivate`, which manages token renewal behind the scenes.

### 🚪 Secure Logout

- On logout:
  - The backend deletes the refresh token cookie.
  - The frontend clears the access token from the context (`AuthContext`).
- This fully invalidates the session, requiring the user to log in again.

<br />

## 👤 Test Users

|     E-mail      |  Password  |  Role  |
|-----------------|------------|--------|
| admin@test.com  | Test123!@# | Admin  |
| editor@test.com | Test123!@# | Editor |
| user@test.com   | Test123!@# | User   |

> 🔧 **Note:** You can register new users through the registration route as well.

<br />


## 🔍 `/test` Route — Understand What Happens Behind the Scenes

- The `/test` route is designed to help you visualize **how the authentication flow works**.
- It allows you to:
  - See when the token expires.
  - Observe the automatic **refresh token process**.
  - Verify if token renewal is working correctly.
- Perfect for learning and understanding what's happening under the hood.

## 📜 Features

- ✅ User registration
- ✅ Login with JWT and Refresh Token
- ✅ Secure logout (refresh token removal)
- ✅ Automatic access token renewal
- ✅ Frontend and backend route protection
- ✅ Role-based access control (Admin, Editor, User)
- ✅ See the authentication flow in action via the `/test` page

## 📂 Project Structure

```bash
/
├── client (React Front-end)
│   ├── src
│   │   ├── components
│   │   ├── context (AuthContext)
│   │   ├── hooks (useAxiosPrivate, useRefreshToken)
│   │   ├── pages (Login, Register, Home, Test, Layout)
│   │   └── services (axios config)
│   └── ...
├── server (Node + Express + MongoDB Back-end)
│   ├── controllers (auth, refresh, logout)
│   ├── models (User)
│   ├── routes (authRoutes, userRoutes, logout, refresh)
│   └── middleware (verifyJWT, credentials, errorHandler)
└── ...
```

## ⚙️ How to Run the Project

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## 🧠 Concepts Applied

- Stateless Authentication (JWT)
- HttpOnly Cookies for refresh token (XSS protection)
- Axios request interceptors
- Context API for global access token management
- Public and private route protection
- Clean Code and organized folder structure

## 💡 Important Note

> ⚠️ The access token expiration is intentionally set to **30 seconds** to clearly demonstrate how the automatic token renewal process works.  
In production, it is recommended to use longer expiration times (e.g., 5, 10, or 15 minutes) depending on the system requirements.
