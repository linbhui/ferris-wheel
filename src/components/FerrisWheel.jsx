import {useRef, useEffect} from "react";
import '../styles/FerrisWheel.css';

function FerrisWheel( {onRefReady}) {
    const wheelRef = useRef(null);
    const cabinRefs = useRef([]);
    cabinRefs.current = [];
    const rotation = useRef(0);
    const targetRotation = useRef(0);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            targetRotation.current += e.deltaY * 0.15;
            };

            const animate = () => {
            rotation.current += (targetRotation.current - rotation.current) * 0.1;   
            
            const degree = rotation.current % 360;

            if (wheelRef.current) {
                wheelRef.current.style.transform = `rotate(${degree}deg)`;
            }

            cabinRefs.current.forEach((cabin) => {
                if (cabin) {
                    cabin.style.transform = `rotate(${-degree}deg)`;
                }
            });
            requestAnimationFrame(animate);
        };
        
        window.addEventListener("wheel", handleWheel, { passive: false });
        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    useEffect(() => {
        if (onRefReady) {
            onRefReady(cabinRefs);
        }
    }, [onRefReady]);

    return (
        <div className="ferris-wheel">
            <div className="base">
                <div className="base-leg left"></div>
                <div className="base-leg right"></div>
            </div>
            <div className="wheel" ref={wheelRef}>
                <div className="base-circle"></div>
                <div className="name-plate">
                    <h1 className="name">Linh Bui</h1>
                </div>
                <div className="stick stick-1"></div>
                <div className="stick stick-2"></div>
                <div className="stick stick-3"></div>

                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`cabin cabin-${i + 1}`} ref={(el) => cabinRefs.current[i] = el}>
                        <div className="cabin-window left"></div>
                        <div className="cabin-window right"></div>
                        <div className="light-bulb"></div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default FerrisWheel;