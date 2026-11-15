import { useEffect, useState } from "react";
import "./styles/VisitorCounter.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

let sharedCountPromise: Promise<number> | null = null;

const getSharedVisitorCount = async (): Promise<number> => {
  if (!sharedCountPromise) {
    sharedCountPromise = fetch(`${API_BASE}/api/visitor-count`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then((data) => data.count);
  }
  return sharedCountPromise;
};

interface VisitorCounterProps {
  variant?: "pill" | "badge" | "card";
}

const VisitorCounter = ({ variant = "pill" }: VisitorCounterProps) => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    getSharedVisitorCount()
      .then((val) => {
        if (isMounted) {
          setCount(val);
          setError(false);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
          setCount(100);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={`visitor-counter-container visitor-${variant}`} data-cursor="disable">
      <div className="visitor-status-indicator">
        <span className={`pulse-dot ${error ? "dot-warning" : "dot-active"}`}></span>
      </div>
      <div className="visitor-label">
        <span className="visitor-title">LIVE VISITORS</span>
        <span className="visitor-count">
          {loading && count === null ? (
            <span className="counter-shimmer">...</span>
          ) : (
            <span>{count?.toLocaleString()}</span>
          )}
        </span>
      </div>
      <div className="visitor-backend-tag">Flask API</div>
    </div>
  );
};

export default VisitorCounter;

