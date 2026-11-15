import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Project {
  num: string;
  name: string;
  category: string;
  tools: string;
  image: string;
}

const projects: Project[] = [
  {
    num: "01",
    name: "FestOS",
    category: "IIM Indore Epinoia 2026",
    tools: "Next.js, TypeScript, Supabase, PostgreSQL, Tailwind",
    image: "/images/placeholder.webp",
  },
  {
    num: "02",
    name: "PrivMed",
    category: "NIT Surathkal Hackathon",
    tools: "React, Python, FastAPI, Zero-Knowledge Proofs, Web3",
    image: "/images/placeholder.webp",
  },
  {
    num: "03",
    name: "JanSetu",
    category: "Smart India Hackathon (SIH)",
    tools: "Next.js, Python, NLP / LLM, PostgreSQL, Tailwind",
    image: "/images/placeholder.webp",
  },
  {
    num: "04",
    name: "ChronoLens",
    category: "Bio-Cryptography & RAG",
    tools: "Python, DNA Steganography, Vector DB, LangChain",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return;
      const workContainer = document.querySelector(".work-container");
      if (!workContainer) return;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${translateX > 0 ? translateX : 1000}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -(translateX > 0 ? translateX : 0),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Key <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
