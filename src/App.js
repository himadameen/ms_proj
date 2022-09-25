import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from './components/Login';
import Task from './Pages/Task';
import Progress from './Pages/Progress';
import Complete from './Pages/Complete';
import NewProcess from './Pages/NewProcess';
import Download from './Pages/Download';
import Menu from './components/Menu';

const App = () => {


  return (
    <>
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/task' element={<Task />} />
          <Route path='/newProcess' element={<NewProcess />} />
          <Route path='/complete' element={<Complete />} />
          <Route path='/progress' element={<Progress />} />
          <Route path='/download' element={<Download />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App