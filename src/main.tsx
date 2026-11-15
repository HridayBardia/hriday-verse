import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App.tsx";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

// 🚀 Performance Optimizations for GSAP
gsap.config({
  force3D: true, // Forces GPU hardware acceleration on animated elements
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
