#  GUID

### AI-Powered Resume Analysis Platform

> End-to-end resume intelligence — from PDF parsing to AI-driven insights, delivering structured feedback through a production-ready full-stack system.

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
## Overview

GUID is a full-stack platform that accepts a resume PDF and job description, processes them through a Node.js/Express REST API, invokes Gemini AI for deep analysis, and returns structured feedback across multiple dimensions — rendered in a responsive multi-tab React dashboard. The entire system is containerized and deployed, reflecting real production engineering practices.

```
User (PDF + JD) → React Frontend → Express REST API → PDF Parser + Gemini AI → MongoDB → Analysis Report
```

---

## What Was Built

**REST API (Node.js/Express)**
Designed and built scalable endpoints following microservices principles — handling PDF ingestion, job description analysis, and AI report generation. Each concern is isolated into its own route and service layer.

**Gemini Integration**
Integrated Gemini API for multi-dimensional resume evaluation — including ATS scoring, skill gap detection, and rewrite suggestions. Prompt engineering was iterated to produce structured, schema-consistent JSON outputs consumed directly by the frontend.

**Backend Architecture**
Implemented JWT-based authentication, MongoDB data modeling for user sessions and report persistence, and structured API response contracts — ensuring the React frontend could reliably consume and render analysis data across tabs.

**React Frontend**
Built a mobile-responsive, multi-tab dashboard with a collapsible sidebar, tabbed report panels, and a draggable 3D icosphere visualization (Canvas API). Integrated a ResumeBoosterButton with Claude API and HTML-to-PDF export via html2canvas/jsPDF.

**Docker + Render**
Orchestrated a Docker Compose setup with environment isolation for frontend and backend services. Multi-stage frontend build (Vite → Nginx) reduces final image size. Both services deployed on Render with `restart: always` for reliability.

**SDLC Ownership**
Maintained end-to-end development ownership: feature scoping, modular code structure, endpoint testing with Postman, and incremental shipping — closely mirroring professional engineering workflows.

---

## Project Structure

```
project-root/
├── Client/          # React + Vite — multi-tab dashboard, Canvas 3D, PDF export
│   ├── Dockerfile   # multi-stage: Vite build → Nginx serve
│   └── src/
├── Server/          # Node.js/Express — REST API, auth, AI orchestration
│   ├── Dockerfile
│   ├── routes/      # resume, auth, report endpoints
│   ├── services/    # PDF parser, Gemini client, MongoDB models
│   └── .env
├── docker-compose.yml
└── README.md
```

---

## Docker Architecture

### Frontend container
Multi-stage build: Node 20 Alpine compiles the Vite bundle, then Nginx Alpine serves the `/dist` folder. Final image contains zero dev dependencies.

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend container
Node 20 Alpine with `--production` install. Environment secrets injected via `env_file` — never baked into the image. Auto-restarts on crash.

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: "3.9"

services:
  backend:
    build: ./Server
    container_name: guid-backend
    ports:
      - "5000:5000"
    env_file:
      - ./Server/.env
    restart: always

  frontend:
    build: ./Client
    container_name: guid-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: always
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check — confirms the API is live |
| `POST` | `/auth/register` | Create account, returns JWT |
| `POST` | `/auth/login` | Authenticate user, returns JWT |
| `POST` | `/resume/analyze` | Upload PDF + JD → triggers Gemini analysis, persists report |
| `GET` | `/resume/reports` | Fetch all saved analysis reports for the authenticated user |

---

## Running Locally

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

## Environment Variables

Create `.env` inside `/Server`:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never commit `.env` to version control.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React / Vite |
| Backend | Node.js / Express |
| Database | MongoDB |
| AI | Gemini API |
| Static server | Nginx |
| Containers | Docker Compose |
| Deployment | Render |
| Auth | JWT |

---

## Roadmap

- [ ] VulnScout integration — AI-WAF signal as a resume security-scoring dimension
- [ ] Resume diff view — track changes across multiple uploaded versions
- [ ] CI/CD pipeline via GitHub Actions with automated Render deploys
- [ ] Kubernetes migration for horizontal scaling

---

## Author

**Parv Raj Chauhan**
IIIT Nagpur · CS Pre-final year

- GitHub: [your-link]
- LinkedIn: [your-link]
- Email: [your-email]

---

## License

MIT License
