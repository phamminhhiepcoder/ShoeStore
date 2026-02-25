# 👟 AI-Powered Shoe Store Platform  

A full-stack e-commerce shoe store built with React & Node.js, featuring AI-powered product recommendations, real-time stock filtering, online payment integration, and intelligent order processing.

---

## 🚀 Features

### 🛍 Admin Management System
- Manage users
- Manage categories
- Manage products
- Manage customers
- Manage orders
- Manage blogs

Full CRUD operations with role-based access control.

---

### 🤖 Real-Time In-Stock Shoe Recommendations (Grok AI + Database)

AI-powered recommendation engine that suggests suitable products based on:

- Shoe size
- Color preference
- Product description
- User input keywords

The system:
1. Receives user input
2. Queries database for available stock
3. Sends context to Grok AI
4. Returns intelligent, real-time product suggestions

---

### 🖼 Image Upload & Order Processing

- Product images uploaded and stored via GitHub Repository
- Secure image management using GitHub Token
- Automated order handling system
- Order status tracking (Pending, Confirmed, Shipping, Completed)

---

### 📧 Email Notification System

Integrated with Google Email Service for:
- Order confirmation
- Account verification
- Payment notification
- Order status updates

---

### 💳 VNPay Payment Integration

- Secure online payments
- VNPay payment gateway integration
- Transaction verification
- Premium checkout experience

---

## 🏗 System Architecture

```
Client (React)
      ↓
Node.js REST API
      ↓
Database (MySQL)
      ↓
├── Grok AI (Product Recommendation)
├── GitHub API (Image Storage)
├── Google Email Service
└── VNPay Payment Gateway
```

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios

### Backend
- Node.js
- Express.js
- RESTful API

### Database
- MySQL

### AI Integration
- Grok AI (Real-time recommendation engine)

### External Services
- GitHub Repository API (Image Upload)
- Google Email Service (SMTP)
- VNPay Payment Gateway

---

## ⚙ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/phamminhhiepcoder/Nutgrow.git
cd ShoeStore
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in backend folder:

```
MONGO_URI=mongodb://127.0.0.1:27017/shoestore
PORT=3000

GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=
GITHUB_BRANCH=

VNP_TMNCODE=
VNP_HASHSECRET=
VNP_PAYURL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_RETURNURL=http://localhost:8000/vnpay/return
GROQ_API_KEY=
```

---

## 🛒 Core Business Flow

1. User browses products
2. AI recommends suitable shoes in real-time
3. User adds product to cart
4. Checkout via VNPay
5. System verifies payment
6. Order confirmation email sent automatically
7. Admin processes order

---

## 📊 Future Improvements

- Advanced AI personalization
- Customer behavior analytics
- Inventory auto-sync
- Mobile application version
- Multi-language support

---

## 👨‍💻 Author

Developed by Pham Minh Hiep  
