# Blog Application - Setup Instructions

## Quick Start

This is a full-stack MERN application with both frontend and backend components.

### Step 1: Backend Setup (Run in Terminal)

The backend needs to run in a separate terminal/process.

1. Open a terminal/command prompt
2. Navigate to the server directory:
   ```bash
   cd server
   ```

3. Install dependencies (if not already done):
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will start on `http://localhost:5000`

### Step 2: Frontend

The frontend is already running in the preview at `http://localhost:3000`

## Environment Configuration

### Backend (.env)
The backend uses the following environment variables:
- `MONGODB_URI`: MongoDB connection string (already configured)
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)

### Frontend (.env)
The frontend API base URL is configured in `client/.env`:
- `VITE_API_URL=http://localhost:5000`

## Testing the Application

### 1. Test User Registration
- Navigate to the Signup page
- Fill in name, email, and password
- Click "Sign Up"
- Expected: User is registered and redirected to blogs page

### 2. Test User Login
- Click Logout to clear session
- Navigate to Login page
- Enter email and password
- Click "Login"
- Expected: User is logged in and redirected to blogs page

### 3. Test Blog Creation
- Click "Create New Blog" in the navigation
- Fill in:
  - Title: "My First Blog"
  - Category: Select any category
  - Content: Write some content
  - Image URL: (optional) Add an image URL
- Click "Create Blog"
- Expected: Blog is created and user is redirected to "My Blogs"

### 4. Test Blog Listing
- Click "All Blogs" in navigation
- Expected: See all blogs created by all users

### 5. Test Blog Filtering
- On the Blogs page, use the filters:
  - Select a category from dropdown
  - Enter author name in search box
- Expected: Blogs are filtered accordingly

### 6. Test Blog Editing
- Go to "My Blogs"
- Click "Edit" on any blog
- Modify the content/title
- Click "Update Blog"
- Expected: Blog is updated and changes are reflected

### 7. Test Blog Deletion
- Go to "My Blogs"
- Click "Delete" on any blog
- Confirm deletion
- Expected: Blog is deleted and no longer appears in lists

### 8. Test Authorization
- Create a blog with one user
- Login with another user
- Try to access/edit the first user's blog
- Expected: Cannot edit or delete other users' blogs

## File Structure

```
blog-app/
├── server/                 # Backend application
│   ├── src/
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth middleware
│   │   ├── config/        # Database configuration
│   │   └── server.js      # Entry point
│   ├── .env               # Environment variables
│   └── package.json
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── services/      # API service
│   │   ├── styles/        # CSS files
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## API Endpoints Reference

### Authentication
- `POST /auth/signup` - Register new user
  - Body: `{ name, email, password }`
  
- `POST /auth/login` - Login user
  - Body: `{ email, password }`

### Blogs
- `GET /blogs` - Get all blogs
  - Query: `?category=Career&author=John`
  
- `GET /blogs/user/my-blogs` - Get user's blogs
  - Headers: `Authorization: Bearer token`
  
- `POST /blogs` - Create blog
  - Headers: `Authorization: Bearer token`
  - Body: `{ title, category, content, image }`
  
- `PUT /blogs/:id` - Update blog
  - Headers: `Authorization: Bearer token`
  - Body: `{ title, category, content, image }`
  
- `DELETE /blogs/:id` - Delete blog
  - Headers: `Authorization: Bearer token`

## Troubleshooting

### Backend won't start
- Make sure MongoDB connection string is correct in `.env`
- Check if port 5000 is not already in use
- Verify Node.js is installed: `node --version`

### Frontend shows "Failed to fetch"
- Make sure backend is running on port 5000
- Check browser console for exact error message
- Verify API URL in `client/.env`

### Can't create/edit blogs
- Make sure you're logged in (check for token in localStorage)
- Check backend logs for detailed error messages
- Verify MongoDB connection is working

### CORS Errors
- Backend should have CORS enabled in `server.js`
- Frontend API calls should use correct base URL

## MongoDB Database

The application uses MongoDB Atlas with the following collections:
- `users` - Stores user accounts
- `blogs` - Stores blog posts

### User Schema
```javascript
{
  name: String,
  email: String,
  password: String (encrypted),
  createdAt: Date
}
```

### Blog Schema
```javascript
{
  title: String,
  category: String,
  author: String,
  content: String,
  image: String,
  userId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

1. **Password Encryption**: Passwords are hashed using bcryptjs
2. **JWT Authentication**: Tokens are used to secure API endpoints
3. **Access Control**: Users can only edit/delete their own blogs
4. **Protected Routes**: Frontend routes are protected with authentication

## Deployment

To deploy this application:

1. **Backend**: Deploy to services like:
   - Heroku
   - Railway
   - Fly.io
   - AWS/Google Cloud

2. **Frontend**: Deploy to services like:
   - Vercel
   - Netlify
   - GitHub Pages

3. Update environment variables in deployment platforms

## Performance Notes

- Filtering is done on the backend for better performance
- MongoDB indexes should be created for frequently queried fields
- Consider pagination for large datasets in future versions

## Future Enhancements

- Add comments on blogs
- Add likes/ratings
- Add search functionality
- Add pagination
- Add blog publishing status (draft/published)
- Add tags for better categorization
- Add email notifications
- Add user profiles
- Add pagination for blog lists
