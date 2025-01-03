#!/bin/bash

# Switch to the ec2-user's home directory
cd /home/ec2-user

# Install PM2 globally
sudo npm install -g pm2

# Pull the latest changes from the Git repository
git pull

# Start your app using PM2 and the ecosystem config
pm2 start ecosystem.config.js
