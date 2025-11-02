# MyImage 

A professional full-stack image search application built with modern web technologies, featuring OAuth authentication and real-time search capabilities. This project demonstrates comprehensive full-stack development skills with a focus on user experience and performance.

## Features

### 🔐 Authentication System
- **Multi-provider OAuth** - Secure login with Google, Facebook, and GitHub
- **Session Management** - Express-session for persistent user sessions
- **Protected Routes** - Authentication-required access for search features
- **User Profiles** - Personalized experience with avatars and names

### Search & Discovery
- **Unsplash API Integration** - Access to millions of high-quality images
- **Real-time Search** - Instant image results with professional API handling
- **Trending Analytics** - Top 5 most searched terms across all users
- **Personal Search History** - Individual user search timeline with timestamps
- **Multi-Select Interface** - Checkbox overlays for batch image selection

### 🎨 User Experience
- **Fully Responsive** - Mobile-first design that works perfectly on all devices
- **Modern UI Components** - Professional interface using Daisy UI and Tailwind CSS
- **Live Selection Counter** - Real-time tracking of selected images
- **Smooth Animations** - CSS transitions and hover effects for better interaction
- **Loading States** - Elegant loading indicators and skeleton screens

## Technology Stack

### Frontend Architecture
- **React** - Latest React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Daisy UI** - Component library for beautiful, accessible designs
- **Parcel** - Zero-configuration build tool for fast development
- **Axios** - Promise-based HTTP client for API communication
- **React Router DOM** - Declarative routing for single-page application

### Backend Infrastructure
- **Node.js** - JavaScript runtime for server-side execution
- **Express.js** - Minimal and flexible web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **CORS** - Cross-origin resource sharing middleware

### Authentication & Security
- **Passport.js** - Simple, unobtrusive authentication for Node.js
- **OAuth** - Industry-standard authentication protocol
- **Express Session** - Simple session middleware for Express
- **Environment Variables** - Secure configuration management

### APIs & Services
- **Unsplash API** - Professional photography API for image search
- **RESTful APIs** - Clean, structured API endpoints
- **HTTP Client** - Efficient server-client communication

## 📁 Project Structure
```
MyImage/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── search/
│   │   │       ├── TopSearchesBanner.jsx
│   │   │       ├── SearchBar.jsx
│   │   │       ├── ImageGrid.jsx
│   │   │       └── SearchHistory.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── SearchResults.jsx
│   │   │   └── LoginPage.jsx
│   │   ├── utils/
│   │   │   └── axiosClient.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── Backend/
│   ├── config/
│   │   └── passport.js
│   ├── models/
│   │   ├── User.js
│   │   └── SearchHistory.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── search.js
│   │   └── history.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```
## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | 
|--------|----------|-------------|
| `GET` | `/api/auth/google` | Initiate Google OAuth login |
| `GET` | `/api/auth/facebook` | Initiate Facebook OAuth login |
| `GET` | `/api/auth/github` | Initiate GitHub OAuth login | 
| `GET` | `/api/auth/user` | Get current user session | 
| `POST` | `/api/auth/logout` | Logout user and clear session |

### Search & Data Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/search` | Search images from Unsplash | Yes |
| `GET` | `/api/top-searches` | Get top 5 trending searches | No |
| `GET` | `/api/history` | Get user's search history | Yes |

## Deployment

### Production Build Commands

```bash
# Frontend production build
cd Frontend
npm run build

# Frontend Scripts -
npm start      # Start development server (port 1234)
npm run build  # Build for production
npm run dev    # Start development server

# Backend production start
cd Backend
npm install
npm run dev or npm run start

# Backend Scripts -
npm start      # Start production server
npm run dev    # Start development server with nodemon

```

## Environment Variables
```bash
- MONGODB_URI
- SESSION_SECRET
- CLIENT_URL
- SERVER_URL
- PORT = 5000

# OAuth Credentials
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- FACEBOOK_APP_ID
- FACEBOOK_APP_SECRET
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

# Unsplash API
- UNSPLASH_ACCESS_KEY
- UNSPLASH_SECRET_KEY

```
## 📸 Visual Proof

### Check the "/assets" folder in frontend

## 📞 Contact

**Vansh Soni**  
*Full Stack Developer*

- **GitHub**: [@1508vansh](https://github.com/1508vansh)
- **LinkedIn**: [Vansh Soni](https://www.linkedin.com/in/vansh-soni-619736286)
- **Email**: vanshsoni13062005@gmail.com


