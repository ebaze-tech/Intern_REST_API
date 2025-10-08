# **In**-memory REST **API** (**TypeScript**)

This project is a **ready**-**to****-run** *Express + TypeScript REST API* that stores data **in** **memory** (no database). 

## **Features**

- *CRUD* for Users and **Blogs**
- Input validation **with** **`express-validator`**
- TypeScript types and strict **mode**

## Run locally

**1.** *Install dependencies:*

**npm install**

**2.** ***Start** **in** dev mode (**auto**-**reload**):*

**npm run dev**

**3.** *API endpoints*

- **`POST /users`** **create user**
- **`GET /users`** **list users**
- **`GET /users/:id`** **get user**
- **`DELETE /users/:id`** **delete** user
- **`POST /blogs`** **create blog**
- **`GET /blogs`** **list blogs**
- **`GET /blogs/:id`** **get blog**
- **`PUT /blogs/:id`** **update blog**
- **`DELETE /blogs/:id`** **delete** **blog**

---

# **Notes**

- Data is **ephemeral** (**stored** **in** **Maps**). **Restarting** server clears **data**.
