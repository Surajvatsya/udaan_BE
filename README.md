# Udaan Lead Management System

This repository contains a **Lead Management System** designed for Key Account Managers (KAMs) at Udaan, a B2B e-commerce platform. KAMs use this system to manage leads, track interactions and performance, and plan calls for large restaurant accounts.

## Table of Contents

1. [Project Overview](#project-overview)  
2. [System Requirements](#system-requirements)  
3. [Installation](#installation)  
4. [Running the Application](#running-the-application)  
5. [API Documentation](#api-documentation)  
6. [Sample Usage Examples](#sample-usage-examples)

---

## Project Overview

This system focuses on the **lead management** needs of Udaan’s KAMs:

- **Lead Management**: Create and store information about new restaurant leads, including status tracking.  
- **Contact Management**: Maintain multiple points of contact (POCs) for each restaurant, storing roles and contact info.  
- **Interaction Tracking**: Record calls made to leads, track orders placed, and maintain details of each interaction.  
- **Call Planning**: Set call frequency for leads; list which leads require calls on any given day.  
- **Performance Tracking**: Identify well-performing and underperforming accounts based on orders and frequencies.

The **tech stack** features: 
- **Node.js/Express** for the backend API
- **PostgreSQL** as the database
- **Sequelize** as an ORM

---

## System Requirements

1. **Operating System**: Linux, macOS, or Windows  
2. **Node.js**: v14 or higher (v18 recommended)  
3. **npm**: v6 or higher (comes bundled with Node.js)  
4. **PostgreSQL**: v12 or higher (v15 recommended)
5. **Git** (for cloning the repository)

Additionally, ensure you have:
- **An active PostgreSQL server** and valid credentials.
- **Internet connectivity** to install npm dependencies.

---

## Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/Surajvatsya/udaan_BE.git
   cd udaan_BE
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file in the project root (if not already present), and populate it with values similar to:
   ```ini
   DB_URL=postgres://<USERNAME>:<PASSWORD>@localhost:5432/udaan
   JWT_SECRET=your_jwt_secret_key
   ```
   - **`DB_URL`**: Points to your PostgreSQL database.  
   - **`JWT_SECRET`**: Used for authentication tokens (adjust if you implement auth).  

4. **Database setup** (if needed):
   - Ensure your PostgreSQL instance is running.
   - Create the database (`udaan`) and user matching your `DB_URL` or use existing credentials.

---

## Running the Application

1. **Start the server** (development mode or simple start):
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```
   By default, the server listens on **port 3000**.  

2. **Check logs**:
   - If successful, you’ll see messages like:  
     ```
     Server is running on port 3000
     Database connected successfully.
     ```
   - If there’s a database connection error, verify your `.env` settings.

3. **Access the API**:
   - Open your browser or use a tool like **Postman** to hit endpoints:
     ```
     http://localhost:3000/api/<endpoint>
     ```

---
## Directory Structure

<img width="418" alt="image" src="https://github.com/user-attachments/assets/ec3b89e4-7ecb-4a9c-9c0d-c7d1431b8c35" />



## Running Instructions

1. **Start the development server**:

   ```bash
   npm start
   ```

2. **Access the application**:

   Open your browser and navigate to `http://localhost:3000` to use the application.

---
## Directory Structure

## API Documentation

## 🔐 **Authentication APIs**

### **POST /auth/signup**

- **Description**: Register a new user.
- **Payload**:
    
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "role": "admin"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "User registered successfully",
      "token": "jwt_token"
    }
    
    ```
    

### **POST /auth/login**

- **Description**: Authenticate a user and provide a JWT token.
- **Payload**:
    
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "Login successful",
      "token": "jwt_token"
    }
    
    ```
    

---

## 🍴 **Restaurant APIs**

### **POST /leads**

- **Description**: Create a new restaurant lead.
- **Authentication**: JWT token required.
- **Payload**:
    
    ```json
    {
      "name": "Kudla Restaurant",
      "location": "Bangalore",
      "cuisine_type": "Seafood",
      "lead_status": "New"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "Restaurant created successfully",
      "restaurant_id": 1
    }
    
    ```
    

### **GET /leads**

- **Description**: Retrieve all restaurant leads.
- **Authentication**: JWT token required.

### **GET /leads/revenue_contribution**

- **Description**: Get revenue contribution details for all restaurants.

### **GET /leads/stats**

- **Description**: Get statistical data for all restaurant leads.

### **GET /leads/data**

- **Description**: Get detailed statistics for restaurants.

### **GET /leads/perf**

- **Description**: Get account performance stats.

### **GET /leads/:lead_id**

- **Description**: Retrieve a specific restaurant by ID.

### **GET /leads/status/:lead_status**

- **Description**: Retrieve restaurants filtered by lead status.

---

## 📞 **Point of Contact (POC) APIs**

### **POST /contacts**

- **Description**: Create a new Point of Contact (POC).
- **Authentication**: JWT token required.
- **Payload**:
    
    ```json
    {
      "restaurant_id": 1,
      "name": "John Doe",
      "role": "Manager",
      "phone_number": "+1234567890",
      "email": "john.doe@example.com"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "POC created successfully",
      "poc_id": 1
    }
    
    ```
    

### **GET /contacts/:rId**

- **Description**: Retrieve all POCs for a specific restaurant by restaurant ID.

---

## 📋 **Interaction APIs**

### **POST /interactions**

- **Description**: Record a new interaction.
- **Authentication**: JWT token required.
- **Payload**:
    
    ```json
    {
      "restaurant_id": 1,
      "interaction_title": "Follow-up Meeting",
      "poc_id": 2,
      "interaction_type": "Meeting",
      "details": "Discussed the new menu options.",
      "outcome": "Scheduled another meeting next week.",
      "interaction_date": "2024-12-01T10:00:00Z",
      "follow_up_date": "2024-12-08T10:00:00Z"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "Interaction recorded successfully",
      "interaction_id": 1
    }
    
    ```
    

### **GET /interactions**

- **Description**: Retrieve all interaction calls.

### **GET /interactions/all**

- **Description**: Retrieve all interactions.

### **GET /interactions/today**

- **Description**: Retrieve follow-up interactions scheduled for today.

### **GET /interactions/:restaurant_id**

- **Description**: Retrieve interactions for a specific restaurant by restaurant ID.

---

## 📦 **Order APIs**

### **POST /orders**

- **Description**: Place a new order.
- **Authentication**: JWT token required.
- **Payload**:
    
    ```json
    {
      "restaurant_id": 1,
      "order_by": 2,
      "order_date": "2024-12-01T10:00:00Z",
      "order_status": "Pending",
      "items": [
        {
          "item_name": "Chicken Biryani",
          "quantity": 2,
          "price": 250.00,
          "instructions": "Extra spicy"
        },
        {
          "item_name": "Paneer Butter Masala",
          "quantity": 1,
          "price": 180.00,
          "instructions": "No onions"
        }
      ]
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "Order placed successfully",
      "order_id": 1
    }
    
    ```
    

### **GET /orders/trends**

- **Description**: Retrieve order trends data.

### **GET /orders/heatmap/:restaurant_id**

- **Description**: Retrieve order counts and dates for a specific restaurant.

### **GET /orders/stats**

- **Description**: Retrieve general order statistics.

### **GET /orders/:restaurant_id**

- **Description**: Retrieve all orders for a specific restaurant.

### **GET /orders/get/:order_id**

- **Description**: Retrieve a specific order by order ID.

---

## ✅ **Sample Usage Example**

### **Creating a Restaurant Lead**

```bash
POST /leads
token : jwt_token
Content-Type: application/json
{
  "name": "Kudla Restaurant",
  "location": "Bangalore",
  "cuisine_type": "Seafood",
  "lead_status": "New"
}

```

**Response:**

```json
{
  "message": "Restaurant created successfully",
  "restaurant_id": 1
}

```

### **Getting All POCs for a Restaurant**

```bash
GET /contacts/1
token: jwt_token

```

**Response:**

```json
[
  {
    "poc_id": 1,
    "name": "John Doe",
    "role": "Manager",
    "phone_number": "+1234567890",
    "email": "john.doe@example.com"
  }
]

```

---

**Note**: All APIs are secured with JWT-based authentication. Ensure to include the token in the request headers for authenticated endpoints.




---

## Sample Usage Examples

- **Create a New Restaurant** (via cURL):
  ```bash
  curl -X POST \
       -H "Content-Type: application/json" \
       -d '{"name":"Best Bites","location":"Mumbai","cuisine_type":"Indian","lead_status":"NEW"}' \
       http://localhost:3000/api/leads
  ```

- **Add a New Contact**:
  ```bash
  curl -X POST \
       -H "Content-Type: application/json" \
       -d '{"restaurantId":1,"name":"John Doe","role":"Manager","phone":"9999999999", "email":"johnbhai@gmail.com"}' \
       http://localhost:3000/api/contacts
  ```

- **Fetch Leads Requiring Calls in an Interval**:
  ```bash
  curl -X GET http://localhost:3000/api/nteractions?fromDate=2024-12-21&toDate=2024-12-31
  ```

- **Check Performance for last 7 days**:
  ```bash
  curl -X GET http://localhost:3000/api/leads/perf?days=7
  ```
