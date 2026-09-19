# 🎉 HappyInvite – Greeting & Invitation Maker

HappyInvite is a full-stack web application that allows users to create and customize digital invitations, greeting cards, and wishing cards using ready-made templates.

🌐 Live Demo: https://happy-invite-eight.vercel.app/

💻 GitHub: https://github.com/Divyasri866/HappyInvite

## 🌟 Project Overview

HappyInvite provides a simple and creative platform for creating personalized digital invitations for different occasions such as birthdays, weddings, festivals, New Year celebrations, and other special events.

Users can explore templates, customize invitation content, preview their designs, and interact with the platform through authentication, contact, feedback, and other features.

The project was initially developed as part of my internship at ApexPlanet Software Pvt. Ltd. and was later extended into a full-stack web application.

## ✨ Features

- 🎨 Ready-made invitation and greeting card templates
- 🎂 Birthday, wedding, New Year, and other occasion templates
- ✏️ Customizable invitation content
- 👤 User registration and login
- 🔐 JWT-based authentication
- 🗄️ Persistent data storage using MongoDB Atlas
- 📩 Contact form
- 💬 Feedback form
- 📝 Todo list
- 📱 Responsive user interface
- 🔗 REST API integration
- ☁️ Cloud deployment

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication

- JSON Web Token (JWT)
- Password Hashing

### Deployment

- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

### Tools

- Visual Studio Code
- Git
- GitHub
- Postman

## 🏗️ Application Architecture

```text
User
  ↓
Vercel Frontend
  ↓
REST API
  ↓
Render Backend
  ↓
MongoDB Atlas

📂 Project Structure
HappyInvite/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── assets/
│   │   ├── images/
│   │   └── legacy/
│   ├── css/
│   ├── js/
│   ├── template/
│   ├── index.html
│   ├── explore.html
│   ├── login.html
│   ├── register.html
│   ├── contact.html
│   ├── feedback.html
│   ├── about.html
│   └── todolist.html
│
├── .gitignore
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
🚀 Deployment
Frontend

https://happy-invite-eight.vercel.app/

Backend

https://happyinvite.onrender.com

Database

MongoDB Atlas is used for persistent application data.

🔐 Environment Variables

The application uses environment variables for sensitive configuration.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
NODE_ENV=development

Sensitive credentials are excluded from the Git repository using .gitignore.

🎯 Project Goal

The goal of HappyInvite is to make digital invitation and greeting-card creation simple, personalized, and accessible through an easy-to-use web platform.

🔮 Future Enhancements
🖼️ User image uploads
📥 Download invitations as images or PDF
📤 WhatsApp and email sharing
🎨 Additional invitation templates
☁️ User invitation management
📊 Personalized user dashboard
📱 Further mobile optimization
👩‍💻 Developer

Divyasri Atmakuri

B.Tech Computer Science Engineering

Email: atmakuridivyasri@gmail.com

🙌 Acknowledgements

This project was initially developed as part of the internship program at ApexPlanet Software Pvt. Ltd.
