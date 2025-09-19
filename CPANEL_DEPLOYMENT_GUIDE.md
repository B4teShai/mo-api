# Production Deployment Guide for cPanel

## 🚀 **cPanel Node.js Deployment Steps**

### 1. **Prepare Your Application for Production**

#### Update package.json scripts:
```json
{
  "scripts": {
    "build": "nest build",
    "start": "node dist/main",
    "start:prod": "node dist/main",
    "postinstall": "npm run build"
  }
}
```

#### Create production environment file (.env.production):
```env
NODE_ENV=production
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_cpanel_db_name
DB_USER=your_cpanel_db_user
DB_PASSWORD=your_cpanel_db_password
JWT_SECRET_KEY=your_super_secure_jwt_key_here
PORT=3000
```

### 2. **cPanel Setup Process**

#### Step 1: Enable Node.js App in cPanel
1. Login to your cPanel
2. Find **"Node.js App"** or **"Setup Node.js App"** 
3. Click **"Create Application"**
4. Configure:
   - **Node.js version**: 18.x or 20.x (latest stable)
   - **Application mode**: Production
   - **Application root**: `/public_html/api` (or your preferred folder)
   - **Application URL**: `yourdomain.com/api` or subdomain
   - **Application startup file**: `dist/main.js`

#### Step 2: Access Terminal
1. In cPanel Node.js App section
2. Click **"Open Terminal"** or find **"Terminal"** in cPanel
3. Navigate to your application directory:
   ```bash
   cd /home/yourusername/public_html/api
   ```

#### Step 3: Clone Your Repository
```bash
# Clone your repository
git clone https://github.com/yourusername/your-repo-name.git .

# Or if already cloned, pull latest changes
git pull origin master
```

#### Step 4: Install Dependencies
```bash
# Install Node.js dependencies
npm install --production

# Or if using yarn
yarn install --production
```

#### Step 5: Build the Application
```bash
# Build for production
npm run build

# Or with yarn
yarn build
```

### 3. **Database Setup in cPanel**

#### Create MySQL Database:
1. Go to **"MySQL Databases"** in cPanel
2. Create new database: `yourusername_mo_api`
3. Create database user with password
4. Add user to database with **ALL PRIVILEGES**
5. Note the database details for .env file

#### Import Database Structure:
1. Go to **"phpMyAdmin"** in cPanel
2. Select your database
3. Click **"Import"**
4. Upload your `mysql_database_structure.sql` file
5. Click **"Go"**

### 4. **Environment Configuration**

#### Create .env file in production:
```bash
# In terminal, create production environment file
nano .env

# Add your production configuration:
NODE_ENV=production
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yourusername_mo_api
DB_USER=yourusername_dbuser
DB_PASSWORD=your_secure_password
JWT_SECRET_KEY=your_super_secure_production_jwt_key
PORT=3000
```

### 5. **Start the Application**

#### Using cPanel Node.js Manager:
1. Go back to **"Node.js App"** in cPanel
2. Click **"Start App"** or **"Restart App"**
3. Check if status shows "Running"

#### Or manually in terminal:
```bash
# Start the application
npm start

# Or for background process
nohup npm start > app.log 2>&1 &
```

### 6. **Verify Deployment**

#### Check if app is running:
```bash
# Check running processes
ps aux | grep node

# Check application logs
cat app.log

# Test the endpoint
curl http://yourdomain.com/api/v1/auth/sign-in
```

### 7. **Domain/Subdomain Setup**

#### Option A: Subdomain
1. Create subdomain in cPanel: `api.yourdomain.com`
2. Point document root to your Node.js app folder
3. Access via: `https://api.yourdomain.com`

#### Option B: Directory
1. App accessible via: `https://yourdomain.com/api`
2. Configure reverse proxy if needed

### 8. **SSL Certificate**

1. Go to **"SSL/TLS"** in cPanel
2. Enable **"Let's Encrypt"** for your domain
3. Force HTTPS redirect

### 9. **Common cPanel Commands**

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# View environment variables
env

# Check disk space
df -h

# Monitor logs in real-time
tail -f app.log

# Stop application
pkill -f "node"

# Restart application
npm start
```

### 10. **Troubleshooting**

#### Common Issues:
1. **Port conflicts**: Use port 3000 or check available ports
2. **Permission issues**: Check file permissions (755 for directories, 644 for files)
3. **Module not found**: Run `npm install` again
4. **Database connection**: Verify database credentials in .env
5. **Memory limits**: Contact hosting provider if needed

#### Check Application Status:
```bash
# Check if app is listening on port
netstat -tlnp | grep :3000

# Check application process
ps aux | grep node

# View recent logs
tail -50 app.log
```

### 11. **Production Optimizations**

#### Performance:
```bash
# Enable production mode
export NODE_ENV=production

# Use PM2 for process management (if available)
npm install -g pm2
pm2 start dist/main.js --name "mo-api"
pm2 startup
pm2 save
```

## 🔄 **Continuous Deployment Script**

Create `deploy.sh` for easy updates:
```bash
#!/bin/bash
git pull origin master
npm install --production
npm run build
pm2 restart mo-api || npm start
```

## 📞 **Support**

If you encounter issues:
1. Check cPanel documentation for Node.js hosting
2. Contact your hosting provider support
3. Check application logs for specific errors
4. Verify database connectivity

Your API should now be live and accessible! 🚀
