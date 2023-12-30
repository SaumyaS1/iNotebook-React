import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import React, {useState} from 'react';

function App() {
  const [alert, setAlert]= useState(null);

  const showAlert= (message,type) =>{
    setAlert({
      msg: message,
      type:type,
    })
    setTimeout(()=>{
      setAlert(null);
    },3000);

  }

  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
        <Route exact path ="/" element={<Home showAlert={showAlert} />}/>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login showAlert={showAlert} heading="user logged in" />} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert} heading="User is rgistered" />} />
      </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
