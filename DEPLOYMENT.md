# Deployment Guide

## Render.com Deployment

### Backend Deployment

1. **Create a new Web Service on Render.com**
2. **Connect your GitHub repository**
3. **Configure the following settings:**
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node
   - **Node Version**: 18 or higher

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   GMAIL_USER=your_gmail_address
   GMAIL_PASS=your_gmail_app_password
   PORT=10000
   ```

### Frontend Deployment

1. **Create a new Static Site on Render.com**
2. **Configure the following settings:**
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Environment**: Static

3. **Set Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-service.onrender.com/api
   ```

## Heroku Deployment

### Backend Deployment

1. **Create a new Heroku app**
2. **Set the following config vars:**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   GMAIL_USER=your_gmail_address
   GMAIL_PASS=your_gmail_app_password
   ```

3. **Deploy using Git:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Frontend Deployment

1. **Use the buildpack for static sites**
2. **Set the following config vars:**
   ```
   REACT_APP_API_URL=https://your-backend-app.herokuapp.com/api
   ```

## Vercel Deployment

### Frontend Deployment

1. **Connect your GitHub repository to Vercel**
2. **Set the following environment variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

3. **Configure build settings:**
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: npm run build
   - **Output Directory**: build

## Netlify Deployment

### Frontend Deployment

1. **Connect your GitHub repository to Netlify**
2. **Set the following environment variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

3. **Configure build settings:**
   - **Base Directory**: frontend
   - **Build Command**: npm run build
   - **Publish Directory**: frontend/build

## Common Issues and Solutions

### Issue: ENOENT package.json not found
**Solution**: Make sure you have a root package.json file (already created)

### Issue: Build fails due to missing dependencies
**Solution**: Run `npm run install-all` to install all dependencies

### Issue: CORS errors
**Solution**: Make sure your backend CORS is configured for your frontend domain

### Issue: Environment variables not working
**Solution**: Check that all required environment variables are set in your deployment platform

## Testing Deployment

1. **Backend**: Visit `https://your-backend-url.com/` - should return API status
2. **Frontend**: Visit `https://your-frontend-url.com/` - should load the salon website
3. **API**: Test booking functionality to ensure frontend-backend communication works

## Monitoring

- Check deployment logs for any errors
- Monitor API response times
- Set up uptime monitoring
- Configure error tracking (e.g., Sentry)
