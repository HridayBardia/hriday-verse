import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  if (typeof window === "undefined" || window.innerWidth < 900) return;

  const paras = document.querySelectorAll(".para");
  const titles = document.querySelectorAll(".title");

  paras.forEach((para) => {
    gsap.fromTo(
      para,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: para,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  });

  titles.forEach((title) => {
    gsap.fromTo(
      title,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  });
}
