import React, {useEffect, useRef} from "react";
import '../styles/styles.css';

function AboutMe({ notifyReady, reverse}) {
  const text = `Hello there! My name is Linh, welcome to my "Wheel of Skills".
  I am currently a student yearning to become a creative developer...
  Let's look at what this site is made of hehe >~<`;
  const chars = text.split("");

  const textRef = useRef(null);
  const lastCharRef = useRef(null);
  const position = useRef(0);
  const targetPosition = useRef(0)
  const animationRef = useRef(null);
  const isAnimating = useRef(false);
  const pauseTimeout = useRef(null);
  const hasNotified = useRef(false);

  const animate = () => {
      if(!isAnimating.current) return;
      if(!textRef.current) return;

      position.current += (targetPosition.current - position.current) * 0.25;

      let x = -position.current;
      const a = -window.innerWidth * 1.9;
      const b = window.innerHeight * 0.2;
      const wordSpans = textRef.current.querySelectorAll(".scroll-char");
      wordSpans.forEach((word, i) => {
        const width = word.offsetWidth + 10 || 25;
        const angle = (x / a) * Math.PI + 0.7;
        const y = -b * Math.sin(angle);
        word.style.transform = `translate(${x}px, ${y}px)`;
        x += width + 2;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

  useEffect(() => {
    if (reverse?.current) {
      reverse.current = false;

      targetPosition.current = window.innerWidth * 4;
      position.current = targetPosition.current;

      
      isAnimating.current = true;

      requestAnimationFrame(animate);
    }
  }, [reverse]);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (!lastCharRef.current) return;

      const lastchar = lastCharRef.current.getBoundingClientRect();

      if (position.current <= 0 && e.deltaY < 0) {
        position.current = 0;
        targetPosition.current = 0;
        notifyReady();
        hasNotified.current = true;
        return;
      }

      if (lastchar.left < -100 && e.deltaY > 0 && !hasNotified.current) {
        notifyReady();
        hasNotified.current = true;
        return;
      }

      targetPosition.current += e.deltaY * 0.7;

      if (!isAnimating.current) {
        isAnimating.current = true;
        requestAnimationFrame(animate);
      }
      
      clearTimeout(pauseTimeout.current);
      pauseTimeout.current = setTimeout(() => {
        isAnimating.current = false;
      }, 150);
    };

    window.addEventListener("wheel", handleWheel, {passive: false});

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationRef.current);
      clearTimeout(pauseTimeout);
    }
  }, []);


  return (
    <div className="container">
      <div className="hello-text" ref={textRef}>
        {chars.map((char, i) => {
          let span;
          if (i === chars.length - 1) {
            span = (<span key={i} className="scroll-char" style={{ '--i': i }} ref={lastCharRef}>
              {char}
            </span>);
          } 
          else {
            span = (<span key={i} className="scroll-char" style={{ '--i': i }}>
              {char}
            </span>);
          }
          return span;
        }
             
        )
        }
      </div>
    </div>
  );
}

export default AboutMe;
