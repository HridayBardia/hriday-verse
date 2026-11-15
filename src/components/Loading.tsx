import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        import("./utils/initialFX").then((module) => {
          if (module.initialFX) {
            module.initialFX();
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 350);
        });
      }, 150);

      return () => clearTimeout(exitTimer);
    }
  }, [percent, setIsLoading]);

  return (
    <div className={`loading-screen ${isExiting ? "loading-fade-out" : ""}`}>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          HB<span>.</span>
        </a>
      </div>
      <div className="loading-center">
        <div className="loading-marquee">
          <Marquee speed={35} gradient={false}>
            <span> Hriday Bardia</span> <span>AI & ML Engineer</span>
            <span> Full-Stack Architect</span> <span>Creative Technologist</span>
          </Marquee>
        </div>
        <div className="loading-bar-wrap">
          <div className="loading-bar-fill" style={{ width: `${percent}%` }}></div>
        </div>
        <div className="loading-percent-text">
          Loading Experience <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  let isDone = false;

  let interval = setInterval(() => {
    if (!isDone && percent < 90) {
      percent += Math.floor(Math.random() * 8) + 6;
      if (percent >= 90) {
        percent = 90;
      }
      setLoading(percent);
    } else if (!isDone && percent >= 90 && percent < 99) {
      percent += 1;
      setLoading(percent);
    }
  }, 40);

  function clear() {
    isDone = true;
    clearInterval(interval);
    clearTimeout(fallbackTimer);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      isDone = true;
      clearInterval(interval);
      clearTimeout(fallbackTimer);
      setLoading(100);
      resolve(100);
    });
  }

  // Unbreakable safeguard: automatically unblock if any async asset takes > 2.2s
  const fallbackTimer = setTimeout(() => {
    if (!isDone) {
      loaded();
    }
  }, 2200);

  return { loaded, percent, clear };
};
