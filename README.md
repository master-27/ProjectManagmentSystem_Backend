### **📌 README.md - Project Management System Backend**  

```md
# 🚀 Project Management System - Backend  

This is the backend for a **Project Management System**, built using **Node.js, Express.js, PostgreSQL, Prisma, and JWT Authentication**. It allows users to manage **projects and tasks**, assign tasks to users, and track progress.

---

## 📜 **Features**
- ✅ **User Authentication** (Signup/Login with JWT)
- ✅ **Project Management** (Create, View, Update, Delete Projects)
- ✅ **Task Management** (Create, Assign, Update, Delete Tasks)
- ✅ **Filtering & Searching** (Filter tasks by status and assigned user)
- ✅ **Secure API** (JWT-based authentication)

---

## 🛠 **Tech Stack**
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (via Prisma ORM)  
- **Authentication:** JWT (JSON Web Token)  
- **Middleware:** CORS, dotenv  

---

## ⚙️ **Setup Instructions**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/master-27/ProjectManagmentSystem_Backend.git
cd ProjectManagmentSystem_Backend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=5000
DATABASE_URL="your_postgresql_connection_url"
JWT_SECRET="your_secret_key"
```

### **4️⃣ Run Database Migrations**
```sh
npx prisma migrate dev --name init
```

### **5️⃣ Start the Server**
```sh
npm start
```
The API will run on `http://localhost:5000`.

---

## 📌 **API Documentation**
### 🔹 **Auth APIs**
#### 1️⃣ **User Registration**
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### 2️⃣ **User Login**
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt-token-here"
  }
  ```

---

### 🔹 **Project Management APIs**
#### 3️⃣ **Create a New Project**
- **Endpoint:** `POST /api/projects`
- **Request Body:**
  ```json
  {
    "name": "Project Name",
    "description": "Project Description"
  }
  ```
- **Response:**
  ```json
  {
    "id": "project-id",
    "name": "Project Name",
    "description": "Project Description"
  }
  ```

#### 4️⃣ **Get All Projects**
- **Endpoint:** `GET /api/projects`
- **Response:**
  ```json
  [
    {
      "id": "project-id",
      "name": "Project Name",
      "description": "Project Description"
    }
  ]
  ```

#### 5️⃣ **Update a Project**
- **Endpoint:** `PUT /api/projects/:projectId`
- **Request Body:**
  ```json
  {
    "name": "Updated Project Name",
    "description": "Updated Description"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Project updated successfully"
  }
  ```

#### 6️⃣ **Delete a Project**
- **Endpoint:** `DELETE /api/projects/:projectId`
- **Response:**
  ```json
  {
    "message": "Project deleted successfully"
  }
  ```

---

### 🔹 **Task Management APIs**
#### 7️⃣ **Create a Task Under a Project**
- **Endpoint:** `POST /api/projects/:projectId/tasks`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "TODO",
    "assignedUserId": "user-id-here"
  }
  ```
- **Response:**
  ```json
  {
    "id": "task-id",
    "title": "Task Title",
    "description": "Task Description",
    "status": "TODO",
    "assignedUserId": "user-id-here",
    "projectId": "project-id"
  }
  ```

#### 8️⃣ **Get All Tasks for a Project**
- **Endpoint:** `GET /api/projects/:projectId/tasks`
- **Response:**
  ```json
  [
    {
      "id": "task-id",
      "title": "Task Title",
      "description": "Task Description",
      "status": "TODO",
      "assignedUserId": "user-id-here",
      "projectId": "project-id"
    }
  ]
  ```

#### 9️⃣ **Get a Task by ID**
- **Endpoint:** `GET /api/tasks/:taskId`
- **Response:**
  ```json
  {
    "id": "task-id",
    "title": "Task Title",
    "description": "Task Description",
    "status": "IN_PROGRESS",
    "assignedUserId": "user-id-here",
    "projectId": "project-id"
  }
  ```

#### 🔟 **Update a Task**
- **Endpoint:** `PUT /api/tasks/:taskId`
- **Request Body:**
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "IN_PROGRESS",
    "assignedUserId": "new-user-id-here"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task updated successfully"
  }
  ```

#### 1️⃣1️⃣ **Delete a Task**
- **Endpoint:** `DELETE /api/tasks/:taskId`
- **Response:**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

#### 1️⃣2️⃣ **Filter Tasks by Status and Assigned User**
- **Endpoint:** `GET /api/tasks?status=IN_PROGRESS&assignedUserId=user-id`
- **Response:**
  ```json
  [
    {
      "id": "task-id",
      "title": "Task Title",
      "description": "Task Description",
      "status": "IN_PROGRESS",
      "assignedUserId": "user-id",
      "projectId": "project-id"
    }
  ]
  ```

---

## 📌 **Testing the API**
1. Use **Postman** or **cURL** to test API endpoints.
2. To authenticate, send the `Authorization` header with the **JWT token**:
   ```json
   {
     "Authorization": "Bearer your-jwt-token"
   }
   ```

---

## 🛠 **Author**
👨‍💻 **Mohit (master-27)**  
📌 GitHub: [master-27](https://github.com/master-27)
