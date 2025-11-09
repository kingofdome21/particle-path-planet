# 🪐 EcoPhysics

**EcoPhysics** is an **AI-powered educational web and Android application** that transforms complex scientific concepts into **interactive, visual learning experiences**.  
The platform bridges **quantum mechanics**, **atomic structure**, and **climate science** through **simulations, quizzes, and an integrated AI tutor**.

🌍 **Try it out now:** [https://ecophysics.vercel.app/](https://ecophysics.vercel.app/)

---

## 🚀 Features

- 🎮 **Interactive Simulations** – Explore quantum mechanics, build atoms, and visualize greenhouse gas effects in real-time.  
- 🤖 **AI Tutoring Chatbot** – Powered by **Google Gemini 2.5 Flash** via the **Lovable AI Gateway**, offering contextual explanations and real-time feedback.  
- 🏆 **Gamified Learning** – Section-based quizzes with instant scoring and adaptive feedback.  
- 📊 **Progress Tracking** – Real-time user progress, quiz scores, and achievements stored securely via **Supabase**.  
- 📱 **Cross-Platform Support** – Built as a **Progressive Web App (PWA)** for smooth performance on both **web and Android** devices.

---

## 🧠 What It Does

**EcoPhysics** simplifies difficult scientific theories and encourages **active learning** through four immersive modules:

1. ⚛️ **Quantum Particles** – Explore the fundamentals of quantum mechanics.  
2. 🔬 **Protons & Neutrons** – Understand nuclear physics and atomic structure.  
3. 🧩 **Atoms** – Build and visualize atomic models interactively.  
4. 🌡️ **Greenhouse Gases** – Connect atomic behavior to real-world climate science.  

Each module combines **interactive simulations**, **AI tutoring**, and **adaptive quizzes** to help learners gain a deeper understanding of how physics applies to the world around them.

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- React 18  
- TypeScript  
- Vite (build tool)  
- Tailwind CSS  
- shadcn/ui  
- TanStack Query  
- React Hook Form + Zod  

### 🗄️ Backend
- Supabase (via Lovable Cloud)
  - PostgreSQL database  
  - Authentication  
  - Row Level Security (RLS)  
  - Edge Functions for AI streaming  

### ☁️ AI & Cloud
- Google Gemini 2.5 Flash (via Lovable AI Gateway)  
- Lovable AI for development and integration  
- Vercel for hosting and continuous deployment  
- GitHub Actions for CI/CD automation  

---

## 🧩 Architecture Overview

```plaintext
Frontend (React + TypeScript)
        │
        ▼
Supabase (Database + Auth + RLS)
        │
        ▼
Edge Functions (AI Streaming via Lovable Gateway)
        │
        ▼
Google Gemini 2.5 Flash (AI Responses)
