import React, {useEffect, useRef} from "react";
import '../styles/styles.css';

function Landing({ notifyReady, canNavigate}) {
  const startRef = useRef(null);
  const position = useRef(0);
  const scrollPosition = useRef(0);
  const animationRef = useRef(null);
  const isAnimating = useRef(false);
  const canScroll = useRef(false);
  const hasNotified = useRef(false);

  const handleClick = (e) => {
      if (!isAnimating.current) {
        isAnimating.current = true;
        requestAnimationFrame(animate);
      }
    };

  const animate = () => {
    if(!isAnimating.current) return;
 
    position.current += 0.05;

    if (startRef.current) {
      startRef.current.style.opacity = Math.max(0, 1 - position.current);
    }

    if (position.current < 1) {
      requestAnimationFrame(animate);
    } else {
      isAnimating.current = false;
      canScroll.current = true;
    }
  }

  const handleWheel = (e) => {
    e.preventDefault();
    if (!canScroll.current) return;

    const delta = e.deltaY;

    if (delta < 0) {
      scrollPosition.current = 0;
      return;
    }
    if (delta > 0 && !hasNotified.current) {
      notifyReady();
      hasNotified.current = true;

      scrollPosition.current = delta * 0.1;
      if (scrollPosition.current > 100) {
        scrollPosition.current = 0;
      }
    } 
  }
    
  useEffect(() => {

    window.addEventListener("click", handleClick);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationRef.current);
    }
  }, []);  

  return (
    <div className="landing-container" ref={startRef}>
      <div className="dim-screen"></div>
      <h1>Tap to start... scroll to roll...</h1>
    </div>
  );
}

export default Landing;