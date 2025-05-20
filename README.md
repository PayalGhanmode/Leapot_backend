# Leapot_backend
📘 Description
A RESTful API built with Node.js, Express, and MongoDB for managing users with full CRUD operations and advanced filtering by multiple fields (email, firstName, lastName, group, etc.).

🚀 Features
Add, update, delete, and fetch users

Filter users by firstName, lastName, email, and group

Assign users to predefined groups: CSE, MECH, CIVIL

Tested and verified using Postman

🧾 User Fields
Users can be added using the following parameters:

firstName (string)

lastName (string)

email (string)

group (string – must be one of: CSE, MECH, CIVIL)

🔧 Setup Instructions

git clone https://github.com/PayalGhanmode/Laepot_backend.git
cd lepot_backend
npm install
npm start

✅ Note: .env file is already included in the folder for smooth setup. It contains:


📮 API Endpoints
Method	Endpoint	Description

POST	/users	Create a new user

GET	/users	Get all users (with optional filters)

PUT	/users/:id	Update user by ID

DELETE	/users/:id	Delete user by ID
