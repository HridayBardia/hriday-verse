import gsap from "gsap";

export function initialFX() {
  if (typeof window !== "undefined") {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }
  document.body.style.overflowY = "auto";
  const main = document.querySelector(".main-body");
  if (main) main.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.4,
  });

  gsap.fromTo(
    [".landing-intro h2", ".landing-intro h1", ".landing-info h3"],
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.05,
    }
  );

  gsap.fromTo(
    [".landing-info-h2", ".landing-info h2"],
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.25,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.7,
      ease: "power1.out",
      delay: 0.15,
    }
  );
}
