import React from 'react';
import './App.css';
import {Register} from "./ui/auth/Register/Register";
import {Login} from "./ui/auth/Login/Login";
import {ForgotPass} from "./ui/auth/ForgotPass/ForgotPass";
import {Route, Routes} from "react-router-dom"

function App() {
  return (
      <div className={'container'}>
          {/*<ForgotPass/>*/}
          <Routes>
              <Route path="/" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/forgotpassword" element={<ForgotPass/>}/>
          </Routes>
      </div>
  );
}

export default App;
