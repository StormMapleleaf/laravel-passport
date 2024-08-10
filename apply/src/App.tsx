import React from 'react';
import './App.css';
import Apply from './Apply';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Apply />} />
          </Routes>
      </Router>
  );
};

export default App;
