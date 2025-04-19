# 🎷 Podcast Platform – Clean Architecture API (Next.js + MongoDB + Prisma)

A **powerful and scalable backend API** for a full-featured Podcast Platform built with **Next.js 15 App Router** (as an API server), **Prisma ORM**, and **MongoDB**.

This project is designed using **Clean Architecture principles**, making it highly **maintainable**, **testable**, and **scalable**.

---

## 📚 Features

- 🔐 **Authentication System** (Register, Login, Reset Password)  
- 🧑‍💻 **User Profiles** (With avatars, bios, and birthdates)  
- 🌍 **Cities Database** (for user location tracking)  
- ✍️ **Blog System** (with categories, slugs, and featured support)  
- 💬 **Commenting System** (for blogs)  
- ❤️ **Likes on Comments** (1 like per user per comment)  
- 🎷 **Podcast Management** (audio, video, cover image)  
- 📌 **Featured Podcasts**  
- ⭐ **Favorites System** (for podcasts)  

---

## 🧱 Tech Stack

- **Next.js 15** (App Router used **only** as an API server)  
- **TypeScript**  
- **Prisma ORM**  
- **MongoDB**  
- **Clean Architecture principles**  

---

## 🧠 Architecture Overview

The project is based on **Clean Architecture**, separating concerns into multiple layers:

```
├── app                  # Next.js API endpoints (App Router)
├── node_modules         # Node.js packages
├── prisma               # Prisma ORM config
├── public               # Static files
├── src
│   ├── core             # Core business logic
│   │   ├── domain       # Domain models and entities
│   │   ├── dtos         # Data Transfer Objects
│   │   └── useCases     # Application use cases
│   ├── infrastructure   # DB, external services, and mappings
│   │   ├── database     # MongoDB/Prisma configurations
│   │   ├── mappers      # Data transformation mappers
│   │   ├── repositories # Data access implementations
│   │   └── services     # External services (mail, uploads, etc.)
│   └── interfaces       # Interface layer (API interaction)
│       ├── controllers  # Route logic
│       ├── middlewares # API middlewares
│       └── validators   # Input validation
```

🧼 This structure provides:

- 🔁 **Decoupling** between framework and logic  
- 🔍 **Testability** at every layer  
- 🔐 **Security** and scalability in design  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/JamalMohafil/Podcast-Platform-Clean-Architecture-Next.js.git
cd Podcast-Platform-Clean-Architecture-Next.js
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Prisma & MongoDB

🧪 Install Prisma CLI (if you don’t have it):

```bash
npm install prisma --save-dev
npx prisma
```

📄 Configure `.env` file:  
Create a `.env` file in the root directory and paste the following inside:

```env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRES_IN=30d
API_URL=http://localhost:3000
```

✅ Replace `your_mongodb_connection_string` with your actual MongoDB URI.

🔄 Push the Prisma schema:

```bash
npx prisma db push
```

This will sync your Prisma schema with MongoDB.

---

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Then open:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 📂 Folder Overview

| Folder        | Description                                               |
|---------------|-----------------------------------------------------------|
| `app`         | Next.js App Router API endpoints (acts like Controllers) |
| `core`        | Pure business logic: use-cases and domain entities        |
| `infrastructure` | Prisma ORM, MongoDB connection, and service implementations |
| `interfaces`  | Controllers, middlewares, and validators                  |
| `prisma`      | Prisma ORM schema and client                             |
| `public`      | Static files like images and audio                       |
| `node_modules`| Installed NPM packages                                   |

---

## 🔐 Notes

This repository includes only the backend API using Next.js App Router.  
**No frontend UI is included in this repository.**

---

## 👨‍💼 About the Developer

I’m **Jamal Mohafil**, a passionate backend developer building modern, clean backend systems using Next.js, Express.js, and NestJS.  
Currently building powerful tools to level up the Arabic tech ecosystem.

---

## 🔗 Follow Me

- **Instagram:** [@jamal_mohafil](https://www.instagram.com/jamal_mohafil)
- **GitHub:** [JamalMohafil](https://github.com/JamalMohafil)
- **Twitter:** [Jamal Mohafil](https://x.com/Jamal_Mohafil)
- **Youtube:** [JamalMohafil](https://www.youtube.com/@JamalMohafil)
- **LinkedIn:** [Jamal Mohafil](https://www.linkedin.com/in/jamal-mohafil/)

 
---

## ⭐ Support

If you like this project and find it useful, give it a **star 🌟 on GitHub** to show your support!
# Podcast-Platform-Clean-Architecture-Next.js
