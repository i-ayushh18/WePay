# WePay - Payment App

A digital wallet application inspired by Paytm, enabling users to send, receive, and manage money efficiently.

## 🚀 Features
- **Instant Money Transfers**: Secure peer-to-peer (P2P) digital wallet for seamless transactions.
- **Transaction History**: Track and manage transactions with detailed statements.
- **User Authentication**: Secure authentication system to verify users and track login history.

## 🛠️ Tech Stack
- **Frontend**: ReactJS, NextJS for both client and server-side rendering, Tailwind CSS for responsiveness.
- **State Management**: Recoil for efficient state management.
- **Backend**: Node.js, Express.js, NextAuth for authentication.
- **Database**: PostgreSQL with Prisma ORM and Aiven, combining open-choice services to rapidly stream, store, and serve data across major cloud providers.
- **Monorepo Management**: Turborepo for handling multi-package repositories.
- **Containerization**: Docker for efficient deployment and scaling.

## 📌 Why Prisma ORM?
Prisma is a next-generation ORM that simplifies database management and enhances developer productivity. It provides:

- **Type-Safety**: Auto-generated TypeScript types for database queries.
- **Schema Management**: Easy schema migrations and version control.
- **Optimized Query Performance**: Efficient database queries with optimized SQL execution.
- **Database Abstraction**: Works seamlessly with PostgreSQL, MySQL, SQLite, and more.
- **Developer-Friendly API**: Intuitive query syntax and support for raw SQL when needed.

With Prisma, integrating PostgreSQL into the wallet app ensures efficient, scalable, and maintainable database operations.

## 📦 Installation
### Prerequisites
✔️ Ensure Node.js, PostgreSQL, and Docker are installed on your machine.
✔️ Install VS Code for easy development and debugging.
✔️ Install necessary VS Code extensions (e.g., ESLint, Prettier, Prisma, Docker).

### Setup
1️⃣ Clone the repository:
```bash
git clone https://github.com/i-ayushh18/WePay.git
cd WePay
```

2️⃣ Set up the backend and frontend:
```sh
# Bank Webhook Service
cd apps/bank-webhook
npm install
npm run dev

# User App
cd ../user-app
npm install
npm run dev
```

3️⃣ Set up the database ORM:
```sh
cd ../packages/db
npx prisma migrate dev
```

4️⃣ Set up environment variables:

- Create a `.env` file in `../user-app` and add:
```env
JWT_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

- Create a `.env` file in `../packages/db` and add:
```env
DATABASE_URL="postgres://user:password@db.example.com:3000/mydatabase?sslmode=require"
```

5️⃣ Access the app in your browser at [http://localhost:3000](http://localhost:3000).

## 🚧 Development Status
This application is in active development. New features will be added progressively based on user feedback.

## 📌 Usage
- 🔄 Add money to your wallet via bank transfer or UPI.
- 💸 Send and receive money instantly.

---
🚀 Contributions are welcome! Feel free to fork the repository and submit pull requests.



