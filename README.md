# 👩‍💼 Employee Management GraphQL API

A full-featured GraphQL API for managing employees, built with TypeScript, Apollo Server, Prisma, and PostgreSQL. Includes authentication, role-based access control (RBAC), filtering, sorting, and pagination.

---

## 🚀 Features

- ⚙️ GraphQL API with Apollo Server
- 🗃️ PostgreSQL with Prisma ORM
- 🔐 Authentication using JWT
- 🛡️ Role-based Access Control (Admin vs Employee)
- 📄 Filtering, sorting, and pagination
- 🔍 Get employee by ID or search by criteria
- ➕ Add & update employee records
- 🧪 Includes test queries and mutations

---

Create a .env file:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/yourdb"
JWT_SECRET="your-secret-key"
PORT=4000

Initialize Database : 
npx prisma migrate dev --name init
npx prisma generate

Run the Server :
npm run dev   # for development (auto-reload)
# or
npm start     # for production
Open: http://localhost:4000/

Example Queries : 

Get all employees -> 

query {
  employees {
    id
    name
    age
    class
    attendance
  }
}

Add an employee : 

mutation {
  addEmployee(input: {
    name: "Alice",
    age: 30,
    class: "10A",
    subjects: ["Math", "Science"],
    attendance: 95
  }) {
    id
    name
  }
}

Login :

mutation {
  login(email: "alice@example.com", password: "yourpassword") {
    token
    user {
      id
      name
    }
  }
}
Add the token in headers:
{ "Authorization": "Bearer <token>" }

🔐 Roles & Access
Feature	Admin	Employee
View Employees	✅	✅
Add/Update Employee	✅	❌
Login

