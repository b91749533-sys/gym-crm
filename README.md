# Gym CRM & Management System — Apex SaaS

A commercial-grade, full-stack **Gym CRM & Management System** built with **Next.js 16 (App Router)**, **React 18/19**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **Framer Motion**, **Recharts**, and **Google Gemini AI**.

---

## 🌟 Key Features & Capabilities

### 1. 📊 Executive Operations Dashboard
- Live KPI Counters (Active Members, Monthly Revenue, Today's Attendance, Churn Rate, Pending Debits).
- **Recharts** interactive data visualizations for revenue growth, subscription vs POS breakdown, and hourly facility peak loads.
- Quick Actions Bar for QR Check-in Terminal and instant Member Registration.

### 2. 👥 Member CRM & Digital Passes
- Datagrid & Card Registry with status filters (Active, Expired, Suspended) and instant search.
- Interactive Member Profile Drawer with emergency contact, medical notes, body stat tracker, and subscription history.
- **Digital Member Pass & QR Code Generator**.

### 3. 💳 Membership Tiers & Discount Engine
- Flexible Plan Builder (Monthly, Quarterly, Annual VIP, Personal Training Bundles).
- Dynamic Coupon Engine with instant percentage discount calculation (`APEX20`).

### 4. 📱 Attendance & QR Scanner Terminal
- Hardware QR Code Scanner Simulator with instant access validation.
- Reception Desk Manual Check-in lookup and real-time check-in stream logs.

### 5. 🏋️ Interactive Workout Builder & AI Generator
- Drag-and-drop / set-rep-rest exercise builder.
- **Google Gemini AI Workout Plan Generator** for tailored splits based on goals, level, and equipment.

### 6. 🥗 Nutrition & Macro Meal Planner
- Calorie & Macro (Protein, Carbs, Fats) target trackers with progress gauges.
- **Google Gemini AI Diet Generator** by target daily calories and dietary style.

### 7. 💵 Payments, Invoicing & POS
- Financial transaction ledger.
- Printable PDF Invoice Generator with branded Apex header.
- Cash / Card POS checkout counter for supplements and memberships.

### 8. 📦 Pro Shop Inventory & Stock Control
- Product catalog (Supplements, Energy Drinks, Gym Gear, Merchandise).
- Stock level monitors with automated Low-Stock Alerts (< 5 units).

### 9. 🛡️ Staff Management & Security Audit Logs
- Role-Based Access Control (RBAC) supporting **Admin**, **Manager**, **Trainer**, **Receptionist**, and **Member** roles.
- Security Audit Trail logging user actions, entities, and IP addresses.

### 10. 🤖 APEX Gemini AI Power Suite
- Interactive AI Fitness Assistant Chatbot.
- Predictive Churn Risk Modeling & Strategic Business Revenue Forecast.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client & Database
```bash
npx prisma generate
npx prisma db push
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Production Deployment

To run with containerized PostgreSQL database:

```bash
docker-compose up --build -d
```

Built for commercial fitness clubs and SaaS gym management.
