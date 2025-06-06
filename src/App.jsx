import React, { use, useEffect } from 'react';

import Entrance from './routes/Entrance';
import AboutMe from './routes/AboutMe';
import Skills from './routes/Skills';
import Projects from './routes/Projects';

import LoadingScreen from './components/LoadingScreen';
import Recap from './components/Recap';
import HamburgerMenu from './components/HamburgerMenu';
import ScrollManager from './components/ScrollManager';

import './App.css';

function App() {
  // Management of loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false);
    }
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

  if (loading) {
    {/* Loading screen display */}
    return <LoadingScreen />;
  }

  // Management of navigation
  const navigate = useNavigate();
  const location = useLocation();

  const entranceRef = useRef(null);
  const aboutMeRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  const sectionMap = {
    '/': entranceRef,
    '/about-me': aboutMeRef,
    '/skills': skillsRef,
    '/projects': projectsRef,
  }

  useEffect(() => {
    const ref = sectionMap[location.pathname];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const handleScroll = () => {
    const scrollX = window.scrollX;
    const width = window.innerWidth;

    const index = Math.round(scrollX / width);
    const paths = ['/', '/about-me', '/skills', '/projects'];

    if (location.pathname !== paths[index]) {
      navigate(paths[index], { replace: true });
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  return (
    <>
    {/* Intro rewind animation when loaded */}
    <Recap />

    {/* Persistent UI elements */}
    <HamburgerMenu />
    <ScrollManager />

    {/* Main content routes */}
    <div className="horizontal-scroll-container">
      <section className="Section">
        <Entrance />
      </section>"
      <section className="Section">
        <AboutMe />
      </section>
      <section className="Section">
        <Skills />
      </section>
      <section className="Section">
        <Projects />
      </section>
    </div>

    <div style={{ padding: "2rem", fontSize: "1.5rem" }}>
      🚧 Site under construction...
    </div>
    </>
  )
}

export default App;