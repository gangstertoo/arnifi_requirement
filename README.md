# Blog Application - MERN Stack

A multi-user blogging application built with MongoDB, Express, React, and Node.js.

## Features

- User authentication with JWT
- Create, read, update, and delete blogs
- Filter blogs by category and author
- User-specific blog management
- Responsive design
- Secure password encryption with bcryptjs

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT for authentication
- bcryptjs for password encryption

### Frontend
- React
- React Router for navigation
- Axios for API calls
- CSS for styling

## Installation & Setup

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb+srv://saraevanabp66:rUPfh7u6UkjRtUxl@db.bivmmoo.mongodb.net/?appName=db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user

### Blogs
- `GET /blogs` - Get all blogs (with optional category and author filters)
- `GET /blogs/user/my-blogs` - Get user's blogs
- `GET /blogs/:id` - Get a specific blog
- `POST /blogs` - Create a new blog
- `PUT /blogs/:id` - Update a blog
- `DELETE /blogs/:id` - Delete a blog

## Project Structure

### Backend
```
server/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   └── server.js
├── .env
└── package.json
```

### Frontend
```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── BlogCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Blogs.jsx
│   │   ├── CreateBlog.jsx
│   │   ├── EditBlog.jsx
│   │   └── MyBlogs.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── AuthPages.css
│   │   ├── Blogs.css
│   │   ├── BlogCard.css
│   │   ├── BlogForm.css
│   │   ├── MyBlogs.css
│   │   └── Home.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── .env
└── package.json
```

## Usage

1. Start both backend and frontend servers as described above
2. Navigate to `http://localhost:3000` in your browser
3. Create an account or login
4. Create, read, update, and delete your blogs
5. Browse and filter other users' blogs

## Security

- Passwords are encrypted using bcryptjs
- JWT tokens are used for authentication
- Protected routes ensure only authenticated users can access certain endpoints
- MongoDB credentials are stored in environment variables

## Contributing

This is a coding assignment project. Feel free to fork and improve.

## Notes

- The application follows MVC architecture for backend
- Components are modular and reusable in the frontend
- Error handling is implemented throughout the application
- Git commits should be meaningful and descriptive
