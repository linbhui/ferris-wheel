import {useRef, useEffect} from "react";
import {setDayNight} from "../utils/helpers";
import '../styles/Background.css'; 

function Background() {
    const sunRef = useRef(null);
    const moonRef = useRef(null);
    const cloudRef = useRef(null);
    const position = useRef(0);
    const targetPosition = useRef(0);
    
    useEffect(() => {

        const radius = 80;
        const initialAngle = Math.PI * 2;

        position.current = initialAngle;
        targetPosition.current = initialAngle;

        // Initial render
        const initialX = radius * Math.cos(initialAngle);
        const initialY = radius * Math.sin(initialAngle);

        if (sunRef.current && moonRef.current && moonRef.current) {
            sunRef.current.style.transform = `translate(${initialX}%, ${-initialY}%)`;
            moonRef.current.style.transform = `translate(${-initialX}%, ${initialY}%)`;
        }

        const handleWheel = (e) => {
            e.preventDefault();
            targetPosition.current += e.deltaY * 0.0006;
        };

        const animate = () => {
            position.current += (targetPosition.current - position.current) * 0.1;

            const radius = 80;
            const angle = position.current;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            if (angle - initialAngle >= Math.PI * 2) {
                position.current = initialAngle;
                targetPosition.current = initialAngle;
            }

            if (sunRef.current && moonRef.current) {
                sunRef.current.style.transform = `translate(${-x}%, ${-y}%)`;
                moonRef.current.style.transform = `translate(${x}%, ${y}%)`;
                let m, b;
                if (y >= 0) {
                    b = 100;
                    m = x >= 0 ? -0.25 : 0.25;
                } else {
                    b = 20;
                    m = x >= 0 ? 0.75 : -0.75;
                }
                cloudRef.current.style.opacity = `${m * x + b}%`;
                setDayNight(x, y, radius);
            }  

            requestAnimationFrame(animate);
        };
        
        window.addEventListener("wheel", handleWheel, {passive: false});
        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("wheel", handleWheel);
        }
    }, []);

    return (
        <div className="background-container">
            <div className="sky">
                <div className="sun" ref={sunRef}></div>
                <div className="moon" ref={moonRef}></div>
                    <div className="clouds-wrapper" ref={cloudRef}>
                        <div className="clouds">
                            <div className="big-cloud big-1">
                                <div className="cloud"></div>
                            </div>
                            <div className="middle-cloud middle-1">
                                <div className="cloud"></div>
                            </div>
                            <div className="small-cloud small-1">
                                <div className="cloud"></div>
                            </div>
                            <div className="tiny-cloud tiny-1">
                                <div className="cloud"></div>
                            </div>
                            <div className="big-cloud big-2">
                                <div className="cloud"></div>
                            </div>
                            <div className="middle-cloud middle-2">
                                <div className="cloud"></div>
                            </div>
                            <div className="small-cloud small-2">
                                <div className="cloud"></div>
                            </div>
                            <div className="tiny-cloud tiny-2">
                                <div className="cloud"></div>
                            </div>
                            <div className="big-cloud big-3">
                                <div className="cloud"></div>
                            </div>
                            <div className="middle-cloud middle-3">
                                <div className="cloud"></div>
                            </div>
                            <div className="small-cloud small-3">
                                <div className="cloud"></div>
                            </div>
                            <div className="tiny-cloud tiny-3">
                                <div className="cloud"></div>
                            </div>
                        </div>
                        <div className="clouds">
                            <div className="big-cloud big-1">
                                <div className="cloud"></div>
                            </div>
                            <div className="middle-cloud middle-1">
                                <div className="cloud"></div>
                            </div>
                            <div className="small-cloud small-1">
                                <div className="cloud"></div>
                            </div>
                            <div className="tiny-cloud tiny-1">
                                <div className="cloud"></div>
                            </div>
                            <div className="big-cloud big-2">
                                <div className="cloud"></div>
                            </div>
                            <div className="middle-cloud middle-2">
                                <div className="cloud"></div>
                            </div>
                            <div className="small-cloud small-2">
                                <div className="cloud"></div>
                            </div>
                            <div className="tiny-cloud tiny-2">
                                <div className="cloud"></div>
                            </div>
                            <div className="big-cloud big-3">
                                <div className="cloud"></div>
                            </div>
                            <div className="middle-cloud middle-3">
                                <div className="cloud"></div>
                            </div>
                            <div className="small-cloud small-3">
                                <div className="cloud"></div>
                            </div>
                            <div className="tiny-cloud tiny-3">
                                <div className="cloud"></div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="ground"></div>
        </div>
    );
};


export default Background;

/*

color1 = [[1, 2, 3], [], []]
color2 = [[4, 5, 6], [], []]

currentColor = [[], [], []]

*/