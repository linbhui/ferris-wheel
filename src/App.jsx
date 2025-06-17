import { useEffect, useState, useRef } from 'react';
import {Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';

import FerrisWheel from './components/FerrisWheel';
import Background from './components/Background';
import AppRouter from './components/AppRouter';


import './styles/App.css';

function App() {
  return (
  <>
    <div className="foreground">
      <AppRouter />
      <FerrisWheel />
    </div>
    <Background />
  </>
  );
}

export default App;