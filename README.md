## DevTribe
**Live App:**  [devtribe.online](https://devtribe.online)

A full-stack social networking platform built with React, Express, and MongoDB, deployed on AWS EC2 with Nginx and secured using HTTPS.

## Project Structure
# Frontend

```
devFinder-web

├── public  
│   └── Static assets (favicons, images)

├── src  

│   ├── assets  
│   │   └── Images and UI media resources  

│   ├── components  
│   │   ├── Navbar, Footer  
│   │   ├── Feed, FeedUserCard  
│   │   ├── LoginPage, ResetPasswordPage  
│   │   ├── ProfileView, ProfileEditor  
│   │   ├── ConnectionPage, RequestsPage  
│   │   ├── ChatPage  
│   │   └── ErrorPage  

│   ├── layout  
│   │   ├── MainBody (App layout wrapper)  
│   │   ├── HeroSection (Landing section)  
│   │   └── MiddleSection (Content section)  

│   ├── utils  
│   │   ├── appStore (Redux store setup)  
│   │   ├── userSlice (User state)  
│   │   ├── feedSlice (Feed state)  
│   │   ├── connectionSlice (Connections state)  
│   │   ├── requestSlice (Requests state)  
│   │   ├── socket (Real-time communication)  
│   │   └── mockData (Base API config)  

│   ├── App.jsx (Root component)  
│   ├── main.jsx (Application entry point)  
│   └── index.css (Global styles)  
```
# Backend


```
backend

├── src  

│   ├── app.js  
│   │   └── Main server entry point  

│   ├── config  
│   │   └── database.js (Database connection setup)  

│   ├── middlewares  
│   │   ├── auth.js (Authentication middleware)  
│   │   └── upload.js (File upload handling)  

│   ├── models  
│   │   ├── user.js  
│   │   ├── chats.js  
│   │   └── connectionRequest.js  
│   │   └── (MongoDB schemas)  

│   ├── routes  
│   │   ├── auth.js (Authentication routes)  
│   │   ├── profile.js (User profile APIs)  
│   │   ├── request.js (Connection requests)  
│   │   ├── users.js (User-related APIs)  
│   │   └── texts.js (Messaging APIs)  

│   ├── utils  
│   │   ├── cloudinary.js (Image upload service)  
│   │   ├── socket.js (Real-time communication)  
│   │   └── validation.js (Input validation)  
```
##  Getting Started

Follow these steps to set up the project locally.

###  Clone the Repository

```bash
git clone https://github.com/sashank-ab4/devFinderWeb.git
git clone https://github.com/sashank-ab4/my-backend.git
```

---

###  Backend Setup

```bash
cd backend
npm install
```

###  Environment Variables

Create a `.env` file using the example:

```bash
cp .env.example .env
```

Update the values inside `.env` with your credentials.

---

###  Start Backend

```bash
npm start
```

---

###  Frontend Setup

```bash
cd devFinder-web
npm install
npm run dev
```

---

###  Access the App

- Frontend: http://localhost:5173  
- Backend: http://localhost:4444

##  Tech Stack

###  Frontend
- React.js (Vite)
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

###  Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication (Cookie-based)
- Socket.IO (Real-time communication)

###  Deployment & DevOps
- AWS EC2
- Nginx (Reverse Proxy)
- PM2 (Process Manager)
- Certbot (HTTPS / SSL)
- Git & GitHub

###  Other Tools
- Cloudinary (Image uploads)
- Postman (API testing)
##  Features

###  Authentication & Security
- Secure user authentication using JWT (cookie-based)
- Protected routes with session handling
- Password reset functionality

###  User Profiles
- Create and manage user profiles
- Edit profile details and upload profile images
- View other users profiles

###  Connections System
- Send, accept, and reject connection requests
- Manage incoming and outgoing requests
- View your network of connections

###  Feed System
- Discover other users on the platform
- Dynamic feed powered by backend APIs
- Real-time updates with efficient state management

###  Responsive UI
- Fully responsive design across devices
- Clean and modern UI built with Tailwind CSS

###  Offline Detection
- Detects network status in real-time
- Displays a custom offline screen with retry option

###  Deployment & Performance
- Deployed on AWS EC2 with Nginx reverse proxy
- Managed backend processes using PM2
- Secured with HTTPS using Certbot
  
