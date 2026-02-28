# 🚀 Zerodha Clone – Full Stack Trading Platform

A full-stack stock trading web application inspired by Zerodha.

Built using:

- ⚙️ Node.js + Express
- 🗄 MongoDB + Mongoose
- ⚛️ React.js
- 📊 Chart.js
- 🔌 Socket.io (Real-time stock updates)
- 💰 Yahoo Finance API (Live Market Data)

---

## ✨ Features

### 📊 Dashboard
- Portfolio Summary
- Total Invested
- Current Value
- Live P&L Calculation
- Wallet Balance
- Holdings Count

### 📈 Real-Time Stock Prices
- Live price updates every 5 seconds
- Socket.io integration
- Real-time Holdings & Positions updates

### 💼 Holdings
- CNC (Delivery) positions
- Live P&L calculation
- Dynamic stock price updates
- Portfolio value tracking

### ⚡ Intraday (MIS)
- 20% margin trading logic
- Live P&L tracking
- Close position functionality
- Margin refund + P&L adjustment

### 🧾 Orders
- Full trade history
- Buy / Sell / MIS / MIS-CLOSE
- Timestamped order log

### 💰 Wallet System
- Add funds
- Withdraw funds
- Auto balance deduction
- Margin management
- Profit credit on sell

### 📊 Trade Analytics
- Total trades
- Total buy value
- Total sell value
- Realized P&L
- Best performing stock
- Worst performing stock

### 📊 Charts
- Holdings Bar Graph
- Portfolio visualization
- Dynamic updates

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- Yahoo Finance API

### Frontend
- React.js
- Axios
- Chart.js
- Bootstrap

---

## 📂 Project Structure

```
Zerodha Clone
│
├── backend2
│   ├── model
│   ├── schemas
│   ├── middleware
│   └── index.js
│
├── dashboard
│   └── src/components
│
├── frontend
│   └── landing page
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd Zerodha-clone
```

---

### 2️⃣ Backend Setup

```bash
cd backend2
npm install
```

Create `.env` file:

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

Server runs on:
```
http://localhost:3001
```

---

### 3️⃣ Dashboard Setup

```bash
cd dashboard
npm install
npm start
```

Runs on:
```
http://localhost:3000
```

---

## 🔄 Real-Time Architecture

- Yahoo Finance API fetches stock data
- Server updates every 5 seconds
- Socket.io broadcasts to frontend
- Holdings & Positions auto-update

---

## 💡 Key Engineering Highlights

- Margin trading logic implemented manually
- Weighted average price calculation
- Real-time P&L engine
- Wallet + trade engine integration
- Intraday position closing system
- Live portfolio summary auto-refresh

---



---

## 🎯 Why This Project Is Strong

This project demonstrates:

- Backend business logic design
- Financial calculations
- Real-time systems
- State management
- API integration
- Full-stack architecture
- Database modeling
- Margin trading logic

---

## 🚀 Future Improvements

- User authentication system
- Multi-user support
- Role-based accounts
- Deployment on AWS / Render
- Performance optimizations
- Unit testing

---

## 👨‍💻 Author

**SARBJOT SINGH**

Built for learning, scaling, and mastering full-stack trading systems.

---

## 📜 License

MIT License
