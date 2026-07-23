# Pharmaceutical QA AI Agent - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
</div>

<br>

This is the frontend client for the Pharmaceutical QA AI platform. It is a stunning, high-performance web application built with **React**, **Vite**, **Redux Toolkit**, and **Tailwind CSS**. 

## ✨ Key Features
- **Modern AI Chat Interface**: A beautiful, fluid chat interface to converse with the AI Copilot for extracting QA complaint data automatically.
- **Dynamic AI Analysis UI**: Features specialized modals to elegantly present complex AI Risk Assessments (Severity levels, Root Causes, Suggested Actions).
- **Responsive & Animated**: Crafted with deep attention to detail using Tailwind CSS, featuring subtle micro-animations, glassmorphism, and seamless responsive design across all screen sizes.
- **State Management**: Centralized application state management using Redux Toolkit for complex multi-step user flows (like drafting and reviewing complaints).
- **Client-Side Routing**: Smooth, SPA navigation powered by React Router.

## 🛠 Tech Stack
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## 🚀 Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   If needed, create a `.env.local` file to set your backend API URL (it defaults to `http://localhost:8000/api/v1` in the Axios configuration):
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will instantly start up at `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   ```
