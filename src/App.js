import {Login}  from './Components/Login'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import About from './Components/About';

// JSX.Element -> when no props are passed
// React.FC -> when props are passed

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
