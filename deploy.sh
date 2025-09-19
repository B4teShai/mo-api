#!/bin/bash

# Deployment script for cPanel
# Run this script after pulling from git

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest changes from git..."
git pull origin master

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Restart the application
    echo "🔄 Restarting application..."
    
    # Kill existing process
    pkill -f "node dist/main"
    
    # Start new process in background
    nohup npm run start:prod > app.log 2>&1 &
    
    echo "✅ Deployment complete!"
    echo "📊 Application logs: tail -f app.log"
    echo "🌐 Check your API at: https://yourdomain.com/api"
else
    echo "❌ Build failed! Check the errors above."
    exit 1
fi
