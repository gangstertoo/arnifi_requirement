# Deployment Guide - Blog Application

This guide covers deploying the MERN blogging application to production.

## Prerequisites

- GitHub account (for version control)
- MongoDB Atlas account (already configured)
- Hosting service account (Vercel, Netlify for frontend; Heroku, Railway, or Fly.io for backend)

## Deployment Strategy

### Option 1: Separate Deployment (Recommended)

Deploy frontend and backend to different services.

#### Backend Deployment (Heroku)

1. **Create Heroku Account**
   - Go to https://heroku.com
   - Sign up and create a new app

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Deploy**
   ```bash
   heroku login
   cd server
   heroku create your-blog-api
   heroku config:set MONGODB_URI=mongodb+srv://saraevanabp66:rUPfh7u6UkjRtUxl@db.bivmmoo.mongodb.net/?appName=db
   heroku config:set JWT_SECRET=your_production_secret_key
   git push heroku main
   ```

4. **Verify**
   - Check: `https://your-blog-api.herokuapp.com/health`

#### Frontend Deployment (Vercel)

1. **Connect Repository**
   - Push code to GitHub
   - Go to https://vercel.com
   - Import your repository

2. **Configure Build Settings**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variable:
     - `VITE_API_URL=https://your-blog-api.herokuapp.com`

3. **Deploy**
   - Vercel will automatically deploy on every push to main

#### Frontend Deployment (Netlify)

1. **Connect Repository**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select your GitHub repository

2. **Configure Build Settings**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment Variable:
     - `VITE_API_URL=https://your-blog-api.herokuapp.com`

3. **Deploy**
   - Netlify will build and deploy automatically

### Option 2: Using Railway (Simplified)

Railway simplifies deployment for full-stack apps.

1. **Backend on Railway**
   ```bash
   npm install -g @railway/cli
   railway login
   cd server
   railway init
   railway add
   railway up
   ```

2. **Frontend on Vercel or Netlify**
   - Follow the frontend deployment steps above
   - Set `VITE_API_URL` to your Railway backend URL

## Environment Variables for Production

### Backend (.env)
```
MONGODB_URI=mongodb+srv://saraevanabp66:rUPfh7u6UkjRtUxl@db.bivmmoo.mongodb.net/?appName=db
JWT_SECRET=generate-a-strong-random-string-for-production
PORT=5000
NODE_ENV=production
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-production-backend-url.com
```

## Pre-deployment Checklist

- [ ] All environment variables are configured
- [ ] MongoDB connection is working
- [ ] Frontend API URL points to production backend
- [ ] JWT_SECRET is a strong random string
- [ ] Error handling is working properly
- [ ] All tests pass locally
- [ ] Git commits are meaningful and clean
- [ ] README is up to date
- [ ] No sensitive data in code or git history

## Testing Before Deployment

1. **Local Testing**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

2. **Test All Features**
   - User registration
   - User login
   - Blog creation
   - Blog editing
   - Blog deletion
   - Blog filtering
   - Category filtering
   - Author search

3. **Check Production Build**
   ```bash
   cd client
   npm run build
   npm run preview
   ```

## Post-deployment Verification

1. **Test Frontend**
   - Visit your deployed frontend URL
   - Test all pages load correctly
   - Test responsive design on mobile

2. **Test Backend**
   - Check health endpoint
   - Test API endpoints with Postman or curl
   - Verify MongoDB connections

3. **Test Full Integration**
   - Create account on deployed version
   - Create, edit, delete blogs
   - Test filtering and search
   - Verify error handling

## Monitoring & Maintenance

1. **Backend Monitoring**
   - Set up error tracking (Sentry)
   - Monitor server logs
   - Watch for database performance

2. **Frontend Monitoring**
   - Use analytics (Google Analytics)
   - Monitor error tracking
   - Check performance metrics

3. **Regular Backups**
   - MongoDB Atlas provides automatic backups
   - Test backup restoration periodically

## Troubleshooting Deployment Issues

### Backend won't start
- Check environment variables in deployment platform
- Verify MongoDB connection string
- Check application logs for errors

### Frontend shows API errors
- Verify VITE_API_URL in deployment environment
- Check CORS settings on backend
- Verify backend is running and accessible

### CORS errors
- Backend needs CORS enabled:
  ```javascript
  app.use(cors());
  ```
- Ensure frontend URL is allowed in CORS settings

### Slow performance
- Check MongoDB indexes
- Optimize queries in backend
- Implement caching
- Consider CDN for static assets

## Scaling Considerations

1. **Database**
   - Use MongoDB Atlas for scalability
   - Add indexes for frequently queried fields
   - Consider sharding for large datasets

2. **Backend**
   - Use load balancer for multiple instances
   - Implement caching layer (Redis)
   - Use queues for heavy operations

3. **Frontend**
   - Use CDN for static assets
   - Implement code splitting
   - Optimize images and assets
   - Cache API responses

## Security Checklist

- [ ] Passwords are encrypted with bcryptjs
- [ ] JWT tokens are properly validated
- [ ] HTTPS is enabled on all URLs
- [ ] CORS is properly configured
- [ ] Environment variables don't contain secrets in git
- [ ] Input validation is implemented
- [ ] Error messages don't expose sensitive info
- [ ] Database credentials are secure
- [ ] API rate limiting is considered
- [ ] SQL injection/NoSQL injection is prevented

## Rollback Plan

If something goes wrong after deployment:

1. **Vercel/Netlify**: Revert to previous deployment
2. **Heroku**: Use `heroku rollback`
3. **Railway**: Revert to previous deployment
4. **Git**: Use `git revert` to undo changes

## Git Workflow for Deployment

```bash
# Development
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Code review and merge
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main

# Deployment happens automatically
```

## Useful Commands

```bash
# Backend
cd server
npm run dev          # Start development server
npm run build        # Build for production
npm test             # Run tests

# Frontend
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Git
git log              # View commit history
git status           # Check working directory
git diff             # View changes
git revert [commit]  # Revert to previous commit
```

## Support & Documentation

- MongoDB: https://docs.mongodb.com
- Express: https://expressjs.com
- React: https://react.dev
- Vite: https://vitejs.dev
- Heroku: https://devcenter.heroku.com
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com

## Next Steps

1. Push code to GitHub
2. Set up automatic deployments
3. Monitor production environment
4. Gather user feedback
5. Plan for feature improvements
