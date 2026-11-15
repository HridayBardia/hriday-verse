import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hardware-accelerated 120fps cursor tracking with zero CPU lag
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power2.out" });

    let isHover = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isHover) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (!target) return;
      const type = target.dataset.cursor;
      if (type === "icons") {
        cursor.classList.add("cursor-icons");
        const rect = target.getBoundingClientRect();
        xTo(rect.left);
        yTo(rect.top);
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        isHover = true;
      } else if (type === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (!target) return;
      cursor.classList.remove("cursor-disable", "cursor-icons");
      isHover = false;
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
