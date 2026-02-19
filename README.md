## Tech stack

- Frontend
  - React (Vite)
  - React Router
  - Axios
  - CSS (plain)
  - ESLint config present (client/eslint.config.js)
- Backend
  - Node.js, Express
  - MongoDB + Mongoose
  - dotenv, cors
  - JWT authentication (server routes + frontend axios usage)
- Tools
  - seedPizzas.js — seed demo pizza data
  - Vite dev proxy configured to forward `/api` to backend

---

## Features

- User registration & login (JWT)
- Add pizzas to cart and place orders
- View orders (user)
- Admin: manage pizzas (CRUD), manage orders (update status), manage users (promote/demote/delete), view basic stats
- Axios interceptor in client to automatically attach JWT from localStorage

---

## Quickstart — Run locally

Prerequisites:
- Node.js (16+ recommended)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

1. Clone the repo and install
   - git clone <this-repo-url>
   - cd pizza-delivery-app

2. Backend (server)
   - cd server
   - npm install
   - Create a `.env` file (see "Environment variables" below)
   - Run the API:
     - If you have a dev script (nodemon): npm run dev
     - Or: node server.js
   - Optional: seed demo pizzas
     - node seedPizzas.js

3. Frontend (client)
   - cd ../client
   - npm install
   - Start dev server:
     - npm run dev
   - The Vite server is configured to proxy `/api` to `http://localhost:5000` (see client/vite.config.js). Open the dev URL Vite gives you (usually http://localhost:5173).

Notes:
- If the server runs on a different port, update the frontend base URLs or the proxy.
- The frontend reads token/user from localStorage for auth state.

---

## Environment variables

Create `server/.env` with at minimum:

MONGO_URI=your-mongodb-connection-string
PORT=5000
JWT_SECRET=your_jwt_secret_key

Example `.env` (do NOT commit real secrets):
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/pizza-demo?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=change_this_to_a_secure_random_string

(Optional) If you deploy, set the same environment variables in your hosting provider.

---

## API (summary)

Auth
- POST /api/auth/register
- POST /api/auth/login

Pizzas
- GET /api/pizzas
- POST /api/pizzas (Admin)
- PUT /api/pizzas/:id (Admin)
- DELETE /api/pizzas/:id (Admin)

Orders
- POST /api/orders
- GET /api/orders/my

Admin
- GET /api/admin/orders
- PATCH /api/admin/orders/:id
- GET /api/admin/users
- PATCH /api/admin/users/:id
- GET /api/admin/stats

(Use Authorization: Bearer <token> header for protected routes.)

---
