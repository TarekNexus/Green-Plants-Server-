# 🌿 Green Plants — Backend

This is the backend server for the **Green Plants** web application — a plant care tracker that helps users manage and monitor their houseplants. It provides API endpoints for authentication and plant management using Node.js, Express, and MongoDB.

---

## 🌐 Live Project

- 🔗 Frontend Live Site: [https://a10-green-plants.netlify.app/](https://a10-green-plants.netlify.app/)
- 🔗 Backend live site: [https://green-plants-server.vercel.app/](https://green-plants-server.vercel.app/)

---

## 🚀 Features

- JWT-based user authentication
- CRUD operations for plants
- Filter plants by user
- Protected API routes

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **dotenv**, **CORS**

---

## Environment Setup
- Node.js v18 or higher
- MongoDB Atlas account
- Git installed
Clone the Repository: git clone https://github.com/TarekNexus/Green-Plants-servers
- cd Green-Plants-servers

 - Install Dependencies


 ## Create .env File:
 - PORT=5000
- DB_USER=your_mongodb_user
- DB_PASS=your_mongodb_password
- npm run dev
## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.6.0",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "jsonwebtoken": "^9.0.2",
  "nodemon": "^3.0.3"
}
