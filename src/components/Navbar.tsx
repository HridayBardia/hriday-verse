import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import VisitorCounter from "./VisitorCounter";
import "./styles/Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        const section = element.getAttribute("data-href");
        if (section) {
          const target = document.querySelector(section);
          if (target) {
            const lenis = (window as any).lenis;
            if (lenis) {
              lenis.scrollTo(target, { duration: 1.2 });
            } else {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <div className="navbar-left">
          <a href="/#" className="navbar-title" data-cursor="disable">
            HB<span>.</span>
          </a>
          <div className="navbar-visitor-wrap">
            <VisitorCounter variant="pill" />
          </div>
        </div>

        <a
          href="mailto:hridaybardia@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          hridaybardia@gmail.com
        </a>

        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#career" href="#career">
              <HoverLinks text="CAREER" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
