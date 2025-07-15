# 🚨 Emergency Response System: 3D UI/UX with Real-time Operations

## ✨ Overview

The **Emergency Response System** is a cutting-edge full-stack application built to transform emergency incident handling through real-time coordination, immersive 3D UI/UX, and integration of modern Web APIs. Designed to reduce average emergency response time by **30%**, this system supports ultra-fast incident reporting, live dispatcher tracking, and responsive visualization with a focus on performance, aesthetics, and reliability.

---

## 🌟 Features

### 🌐 Immersive 3D UI/UX

* **Interactive 3D Map**: Rotate, zoom, and pan through a realistic environment
* **Emergency Spheres**: Glowing incident markers with real-time status rings
* **Animated Units**: 3D models for ambulances, police cars, and fire trucks
* **Dynamic Lighting & Hover Effects**: Beautiful atmospheric UI using Three.js

### 🚑 Real-Time Emergency Features

* **1-Click Emergency Reporting**: Super-fast, frictionless form submission
* **Real-Time Dispatcher Tracking**: Movement and status of units shown live
* **Precise Geolocation**: Show user and unit coordinates on a dynamic canvas
* **Live Network Monitoring**: Detect weak networks with auto UI feedback

### 📊 3D Dashboard Stats

* **Incident Overview**: Total, active, resolved incidents
* **Unit Overview**: Availability, location, crew assignment
* **Smooth Stat Cards**: Animated updates with React Spring + Framer Motion

---

## 🔧 Technologies Used

### Frontend

* **React.js**: Core SPA framework
* **Three.js + @react-three/fiber/drei**: Immersive 3D rendering
* **Framer Motion + React Spring**: Smooth, expressive animations
* **Tailwind CSS**: Utility-first styling framework
* **Axios**: HTTP client for REST API communication
* **Lucide & Heroicons**: Clean, modern iconography
* **Craco**: Webpack overrides and customizations

### Backend

* **FastAPI**: Modern, fast Python API framework
* **Python 3.8+**: Backend language
* **MongoDB + Motor**: Async NoSQL DB
* **WebSockets**: Bi-directional live updates
* **Pydantic**: Schema validation
* **Dotenv**: Secure config and secrets handling

---

## 🚀 Integrated Web APIs

* **Geolocation API**: Real-time user/unit location tracking
* **Canvas API**: Dynamic 3D rendering surface (via WebGL)
* **Network Information API**: Detect 3G/4G/5G changes and UI alerts
* **Background Tasks API**: Efficient location syncing every 10s
* **Intersection Observer API**: Scroll-aware lazy loading and card animations

---

## 🚧 Setup Instructions

### ✅ Prerequisites

* Node.js (16+ recommended)
* Python 3.8+
* MongoDB (Local or Atlas)

### 💻 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

#### 🔒 .env Configuration

```dotenv
# backend/.env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="emergency_db"
```

### 🏛️ Seed Database (Optional)

```bash
python seed_db.py
```

---

### 🛠️ Frontend Setup

```bash
cd frontend
cp .env.example .env  # or manually create .env
```

#### 🔒 .env Configuration

```dotenv
# frontend/.env
REACT_APP_BACKEND_URL="http://localhost:8000"
```

Install dependencies:

```bash
yarn install  # or npm install
```

---

## 🔪 Craco Config

```js
// frontend/craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: [/node_modules[\\/]@mediapipe[\\/]tasks-vision/],
      });
      return webpackConfig;
    },
  },
};
```

---

## ▶️ Running the App

### Start Backend:

```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

### Start Frontend:

```bash
cd frontend
yarn start  # or npm start
```

### Access:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📂 API Overview

| Method | Endpoint                 | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| POST   | `/api/incidents`         | Create a new emergency incident         |
| GET    | `/api/incidents`         | Fetch all incidents                     |
| GET    | `/api/incidents/{id}`    | Get details of one incident             |
| PUT    | `/api/incidents/{id}`    | Update incident status or unit assigned |
| POST   | `/api/units`             | Register new emergency unit             |
| GET    | `/api/units`             | List all units                          |
| GET    | `/api/units/{id}`        | View one unit detail                    |
| PUT    | `/api/units/{id}`        | Update unit location/availability       |
| GET    | `/api/dashboard/stats`   | Dashboard analytics overview            |
| WS     | `ws://localhost:8000/ws` | WebSocket for live updates              |

---

## 🏆 Highlights

* **Zero UI Lag** with requestIdleCallback + optimized background updates
* **Beautiful UX** with modern animations, glassmorphism, and responsive layouts
* **Real-Time Tracking** with geolocation + canvas + WebSocket fusion
* **Offline Resilience** via Background Tasks & Network Info APIs
* **Modular Codebase** for easy extension and clean separation

---

## 💼 License

MIT — Free to use, modify, and distribute.

---


## ✨ Inspiration

Built for a real-world scenario to improve emergency infrastructure with technology. Imagine this helping cities reduce fatalities and enhance public safety — that's the impact this system aims for.

---
