#!/bin/bash

# Switch to the ec2-user's home directory (common default on Amazon Linux)
cd /home/ec2-user

# Update system packages
sudo yum update -y

# Install Node.js and npm 
sudo yum install -y nodejs npm

# (Optional) Install PM2 globally
# sudo npm install -g pm2

# If your Node.js project is in this directory, install dependencies
npm install
