#  Pizza Delivery App (Backend)

A REST API for a pizza delivery application built using Node.js, Express, and MongoDB.

##  Features
- User authentication (JWT)
- Role-based access (Admin / User)
- CRUD operations for pizzas
- Place orders
- View user orders
- Secure routes with middleware

##  Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Postman (API testing)

##  API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Pizzas
- GET /api/pizzas
- POST /api/pizzas (Admin)
- PUT /api/pizzas/:id (Admin)
- DELETE /api/pizzas/:id (Admin)

### Orders
- POST /api/orders
- GET /api/orders/my


