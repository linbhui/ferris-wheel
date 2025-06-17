import {useEffect, useRef} from "react";
import {changeColor} from "../utils/helpers";
import '../styles/styles.css';

const tools = ["html", "css", "js", "react", `lots of love`, "💗"]

function Tools({ notifyReady, notifyReverse}) {
  const position = useRef(0);
  const targetPosition = useRef(0);
  const animationRef = useRef(null);
  const isAnimating = useRef(0);
  const pauseTimeout = useRef(null);
  const hasNotified = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      targetPosition.current += e.deltaY * 0.01;

      if (!isAnimating.current) {
        isAnimating.current = true;
        requestAnimationFrame(animate);
      }

      clearTimeout(pauseTimeout.current);
      pauseTimeout.current = setTimeout(() => {
        isAnimating.current = false;
      }, 150);
    };

    const animate = () => {
      if (!isAnimating.current) return;

      position.current += (targetPosition.current - position.current) * 0.1;

      if (position.current >= 32  && !hasNotified.current) {
        position.current = 32;
        targetPosition.current = 32;
        notifyReady();
        hasNotified.current = true;
        return;
      } 
      
      if (position.current < 0 && !hasNotified.current) {
        position.current = 0;
        targetPosition.current = 0;
        notifyReady();
        notifyReverse();
        hasNotified.current = true;
        return;
      }

      const html = [[236, 61, 21], [250, 100, 40]];
      const css = [[1, 114, 213], [76, 176, 253]];
      const js = [[255, 179, 0], [255, 213, 0]];
      const react = [[3, 242, 206], [14, 24, 51]];
      const lol = [[206, 2, 97], [245, 107, 167]];
      const heart = [[84, 54, 111], [160, 106, 193]];
      const origin = [[181, 88, 113], [211, 124, 147]];

      const colorArray = [html, css, js, react, lol, heart];
      
      for (let tool = 1; tool <= tools.length; tool++) {
        const cabin = document.querySelector(`.cabin.cabin-${tools.length - tool + 1}`);
        const start = tool * 2;
        const end = tool * 3;
        const range = end - start;
        const restart = (tools.length + 1) * 3.5;
        const scrollPosition = position.current;

        let progress = 0;
        let newColor = origin;
        let scale = 1;
        let border = 1;
        let opacity = 100;

        if (scrollPosition >= start && scrollPosition <= end) {
          progress = (scrollPosition - start) / range;
          newColor = changeColor(origin, colorArray[tool - 1], progress);
          scale = 1 + 0.25 * progress; 
          border = 3;
          opacity = progress;
          const leftColor = `rgb(${newColor[0][0]}, ${newColor[0][1]}, ${newColor[0][2]})`;
          const rightColor = `rgb(${newColor[1][0]}, ${newColor[1][1]}, ${newColor[1][2]})`;
          cabin.style.background = `linear-gradient(90deg, ${leftColor} 5%, ${rightColor} 30%, ${leftColor})`;
          cabin.style.border = `${border}px solid ${leftColor};`;
          cabin.style.scale = `${scale}`;
        }
        else if (scrollPosition >= restart) {
          const restartProgress = Math.min((scrollPosition - restart) / 5, 1);
          newColor = changeColor(colorArray[tool - 1], origin, restartProgress);
          scale = 1.25 - 0.25 * restartProgress;
          border = 1 + 2 * (1 - restartProgress);
          const leftColor = `rgb(${newColor[0][0]}, ${newColor[0][1]}, ${newColor[0][2]})`;
          const rightColor = `rgb(${newColor[1][0]}, ${newColor[1][1]}, ${newColor[1][2]})`;
          cabin.style.background = `linear-gradient(90deg, ${leftColor} 5%, ${rightColor} 30%, ${leftColor})`;
          cabin.style.border = `${border}px solid ${leftColor};`;
          cabin.style.scale = `${scale}`;
          if (restartProgress > 1) {
            const currentLabel = cabin.querySelector(`.label-${tool}`);
            if (currentLabel) {
              cabin.removeChild(currentLabel);
            }
          }
        }
        
        let label = cabin.querySelector(`.label-${tool}`);

        if (scrollPosition > end && scrollPosition < restart){
          if (!label) {
            const label = document.createElement("div");
            label.className = `cabin-label label-${tool}`;
            label.textContent = tools[tool - 1].toUpperCase();
            cabin.appendChild(label);
          }  
        } else {
            const currentLabel = cabin.querySelector(`.label-${tool}`);
            if (currentLabel) {
              cabin.removeChild(currentLabel);
            }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("wheel", handleWheel, {passive: false});

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationRef.current);
      clearTimeout(pauseTimeout.current);
    }
  }, []);

  return;
}

export default Tools;
