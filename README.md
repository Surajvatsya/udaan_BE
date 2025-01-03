# Udaan Lead Management System

This repository contains a **Lead Management System** designed for Key Account Managers (KAMs) at Udaan, a B2B e-commerce platform. KAMs use this system to manage leads, track interactions and performance, and plan calls for large restaurant accounts.

## Table of Contents

1. [Project Overview](#project-overview)  
2. [System Requirements](#system-requirements)  
3. [Installation](#installation)  
4. [Running the Application](#running-the-application)  
5. [Test Execution Guide](#test-execution-guide)  
6. [API Documentation](#api-documentation)  
7. [Sample Usage Examples](#sample-usage-examples)

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

## Test Execution Guide

If tests are included in the repository:

1. **Install dev dependencies** (if not already done):
   ```bash
   npm install
   ```
2. **Run tests**:
   ```bash
   npm test
   ```
3. **View test results** in the console.  

> **Note**: If you have no tests set up yet, consider adding them with a framework like **Jest** or **Mocha**.

---

## API Documentation

Below is a high-level overview of the main endpoints. Adjust paths/methods as needed based on your actual code.

1. **Restaurants / Leads**  
   - **GET** `/api/restaurants` – Retrieves a list of restaurant leads.  
   - **POST** `/api/restaurants` – Creates a new restaurant lead.  
   - **GET** `/api/restaurants/:id` – Fetches details of a single restaurant.  
   - **PUT** `/api/restaurants/:id` – Updates a restaurant’s info/status.  
   - **DELETE** `/api/restaurants/:id` – Deletes a restaurant lead.

2. **Contacts**  
   - **GET** `/api/contacts` – Retrieves a list of contacts.  
   - **POST** `/api/contacts` – Creates a new contact for a restaurant.  
   - **GET** `/api/contacts/:id` – Gets a contact’s info.  
   - **PUT** `/api/contacts/:id` – Updates a contact’s details.  
   - **DELETE** `/api/contacts/:id` – Deletes a contact.

3. **Interactions (Calls, Orders)**  
   - **GET** `/api/interactions` – Lists all interactions (calls/orders).  
   - **POST** `/api/interactions` – Logs a new interaction.  
   - **GET** `/api/interactions/:id` – Retrieves a single interaction record.  
   - **PUT** `/api/interactions/:id` – Updates an interaction.  
   - **DELETE** `/api/interactions/:id` – Deletes an interaction.

4. **Call Planning**  
   - **GET** `/api/leads/today` – Returns leads requiring a call today.  
   - **GET** `/api/leads/upcoming` – Leads scheduled for upcoming calls based on set frequency.

5. **Performance Tracking**  
   - **GET** `/api/leads/performance` – Summaries of well-performing vs. underperforming accounts.  
   - **GET** `/api/leads/revenue_contribution?days=7` – Example endpoint for revenue stats over a set timeframe.

> See the **controllers** or **routes** directories in the repo for exact route names, parameters, and request/response shapes.

---

## Sample Usage Examples

- **Create a New Restaurant** (via cURL):
  ```bash
  curl -X POST \
       -H "Content-Type: application/json" \
       -d '{"name":"Best Bites","location":"Mumbai","cuisine_type":"Indian","lead_status":"NEW"}' \
       http://localhost:3000/api/restaurants
  ```

- **Add a New Contact**:
  ```bash
  curl -X POST \
       -H "Content-Type: application/json" \
       -d '{"restaurantId":1,"name":"John Doe","role":"Manager","contactInfo":"9999999999"}' \
       http://localhost:3000/api/contacts
  ```

- **Fetch Leads Requiring Calls Today**:
  ```bash
  curl -X GET http://localhost:3000/api/leads/today
  ```

- **Check Performance**:
  ```bash
  curl -X GET http://localhost:3000/api/leads/performance
  ```
