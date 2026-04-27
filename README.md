#  GUID

### AI-Powered Resume Analysis Platform

> End-to-end resume intelligence  from PDF parsing to AI-driven insights, delivering structured feedback through a production-ready full-stack system.

---

## 🧰 Tech Stack

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker)
![Render](https://img.shields.io/badge/Render-Deployment-000000?logo=render)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange)

---

## 🌐 Deployed Link

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=render)](https://guid-1.onrender.com/)

---

## 🔗 DEMO
<video src="https://github.com/user-attachments/assets/f77f4a92-5349-4eee-b9a4-15e290ea7199" controls width="100%"></video>

---
## 📌  Overview

GUID is a fullstack platform that accepts a resume PDF and job description, processes them through a Node.js/Express REST API, invokes Gemini AI for deep analysis, and returns structured feedback across multiple dimensions rendered in a responsive multitab React dashboard. The entire system is containerized and deployed, reflecting real production engineering practices.

```
User (PDF + JD) → React Frontend → Express REST API → PDF Parser + Gemini AI → MongoDB → Analysis Report
```

---

## ✨What Was Built

**REST API**
Designed and built modular, scalable endpoints following clean architecture principles. Responsibilities are separated into dedicated routers (auth, report), middleware (authentication, file upload), and controller layers. The system handles user authentication, PDF resume ingestion, AI-powered analysis, and report generation.

**Gemini Integration**
Integrated Gemini API for multidimensional resume evaluation including ATS scoring, skill gap detection, and rewrite suggestions. Prompt engineering was iterated to produce structured, schemaconsistent JSON outputs consumed directly by the frontend.

**Backend Architecture**
Implemented JWT based authentication, MongoDB data modeling for user sessions and report persistence, and structured API response contracts ensuring the React frontend could reliably consume and render analysis data across tabs.

**React Frontend**
Built a mobileresponsive, multi-tab dashboard with a collapsible sidebar, tabbed report panels, and a draggable 3D icosphere visualization (Canvas API). Integrated a ResumeBoosterButton with Gemini API with HTML response and HTMLtoPDF export via html2canvas.

**Docker + Render**
Orchestrated a Docker Compose setup with environment isolation for frontend and backend services. Multi-stage frontend build (Vite → Nginx) reduces final image size. Both services deployed on Render with `restart: always` for reliability.

**SDLC Ownership**
Maintained endtoend development ownership: feature scoping, modular code structure, endpoint testing with Postman, and incremental shipping closely mirroring professional engineering workflows.

---

## 🏗️ Project Structure

```
GUID/
├── Client/
│ ├── src/
│ │ ├── features/
│ │ │ ├── auth/
│ │ │ │ ├── components/
│ │ │ │ ├── hooks/
│ │ │ │ ├── pages/
│ │ │ │ ├── service/
│ │ │ │ └── auth.context.jsx
│ │ │ ├── report/
│ │ │ │ ├── components/
│ │ │ │ ├── hooks/
│ │ │ │ ├── pages/
│ │ │ │ ├── service/
│ │ │ │ └── report.context.jsx
│ │ │ └── utils/
│ │ ├── App.jsx
│ │ ├── app.routes.jsx
│ │ └── main.jsx
│
├── Server/
│ ├── src/
│ │ ├── controller/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routers/
│ │ ├── services/
│ │ ├── db/
│ │ └── app.js
│ └── server.js
│
└── docker-compose.yml
```
---

## 📡 API Reference

| Method | Endpoint                           | Description                                             |
| ------ | ---------------------------------- | ------------------------------------------------------- |
| `GET`  | `/`                                | Health check confirms the API is live                 |
| `POST` | `/api/auth/register`               | Register a new user                                     |
| `POST` | `/api/auth/login`                  | Authenticate user                                       |
| `POST` | `/api/auth/logout`                 | Logout user                                             |
| `GET`  | `/api/auth/profile`                | Get authenticated user profile                          |
| `POST` | `/api/report/`                     | Upload resume PDF → triggers analysis & report creation |
| `GET`  | `/api/report/getall`               | Fetch all reports for the authenticated user            |
| `GET`  | `/api/report/:reportId`            | Fetch a specific report by ID                           |
| `POST` | `/api/report/resume/pdf/:reportId` | Generate/download PDF for a report                      |

---

## ⚙️Running Locally

### With Docker (recommended)

```bash
git clone <repo-url>
cd project-root
cp Server/.env.example Server/.env
# Fill in your env vars
docker-compose up --build
```

- Frontend → http://localhost:3000
- API → http://localhost:5000

### Without Docker

```bash
# Backend
cd Server
npm install
node server.js

# Frontend
cd Client
npm install
npm run dev
```

---

## 🧪Environment Variables

### Backend (`/Server/.env`)

```
env
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_api_key
JWT_SECRET=your_jwt_secret
```

### Frontend (`/Client/.env`)
```
VITE_API_URL=your_backend_api_url
```
---
## 🛠 Tech Stack

| Layer        | Technology                |
|--------------|--------------------------|
| Frontend     | React + Vite             |
| Backend      | Node.js + Express        |
| Database     | MongoDB (Mongoose)       |
| AI           | Gemini API (@google/genai) |
| Auth         | JWT + bcrypt             |
| File Handling| Multer + PDF-Parse       |
| Validation   | Zod                      |
| Styling      | Tailwind CSS             |
| Containers   | Docker Compose           |
| Deployment   | Render                   |


## Author

**Parv Raj Chauhan**
IIIT Nagpur · CS Pre-final year
