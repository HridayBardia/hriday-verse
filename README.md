# Hriday Bardia — 3D Developer Portfolio (hriday-verse) 🚀

A high-performance interactive 3D portfolio featuring WebGL Three.js character animation, smooth scroll synchronization via Lenis & GSAP, and a Python Flask backend.

---

## 👨‍💻 About

**Hriday Bardia**  
B.Tech in Computer Science & Engineering (AI & ML) — Jain University  
Passionate about Artificial Intelligence, Machine Learning, Full-Stack Architecture, and Interactive 3D Web Experiences.

- **Email**: hridaybardia@gmail.com
- **LinkedIn**: [Hriday Bardia](https://www.linkedin.com/in/hriday-bardia-39130728b)
- **GitHub**: [HridayBardia](https://github.com/HridayBardia)

---

## ⚙️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D & Graphics**: Three.js, React Three Fiber, GLTF / Draco loaders, ACESFilmic Tone Mapping
- **Animation & Motion**: GSAP (ScrollTrigger), Lenis Smooth Scroll
- **Backend API**: Python 3, Flask, CORS, RESTful Endpoints (`/api/visitor-count`, `/api/contact`)
- **Styling**: CSS3, Responsive Grid / Flexbox, GPU Hardware Acceleration

---

## 🚀 Getting Started

### 1. Frontend Setup
```bash
npm install
npm run dev
```
The frontend dev server runs on `http://localhost:3000`.

To create an optimized production build:
```bash
npm run build
npm run preview
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
The Flask backend runs on `http://localhost:5000` with the following endpoints:
- `GET /api/visitor-count` — Real-time visitor counter with atomic persistence
- `POST /api/contact` — Secure contact message submission

---

## 📄 Credits & Inspiration

Originally inspired by Moncy Yohannan's creative portfolio architecture, customized and extended by Hriday Bardia with Python backend integration, real-time telemetry, and smooth scroll optimizations.
