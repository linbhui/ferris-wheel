import {useEffect, useRef, useState, useCallback} from "react";
import {useNavigate, useLocation, Routes, Route} from "react-router-dom";

import Landing from "./Landing";
import AboutMe from "./AboutMe";
import Tools from "./Tools";

const routes = ["/", "/about-me", "/tools"];

function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [canNavigate, setCanNavigate] = useState(false);
  const reverse = useRef(false);

  const notifyReady = () => setCanNavigate(true);
  const notifyReverse = () => reverse.current = true;

  useEffect (() => {
    const handleWheel = (e) => {
      if (!canNavigate) return;

      const delta = e.deltaY * 0.01;
      const currentIndex = routes.indexOf(location.pathname);  
      if (delta > 0) {
        navigate(routes[(currentIndex + 1) % routes.length]);
        setCanNavigate(false);
      } else if (delta < 0) {
        navigate(routes[(currentIndex - 1 + routes.length) % routes.length]);
        setCanNavigate(false);
      }
    }
    window.addEventListener("wheel", handleWheel);

    return () => window.removeEventListener("wheel", handleWheel);
  }, [location.pathname, navigate, canNavigate]);

  
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing notifyReady={notifyReady} canNavigate={canNavigate} />}></Route>
      <Route path="/about-me" element={<AboutMe notifyReady={notifyReady} reverse={reverse} />}></Route>
      <Route path="/tools" element={<Tools notifyReady={notifyReady} notifyReverse={notifyReverse} />}></Route>
    </Routes>
    </>
  )
}

export default AppRouter;