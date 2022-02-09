import React from 'react';
import './App.css';
import {Register} from "./ui/auth/Register/Register";
import {Login} from "./ui/auth/Login/Login";
import {ForgotPass} from "./ui/auth/ForgotPass/ForgotPass";
import {PasswordRecovery} from "./ui/auth/ForgotPass/passwordRecovery";
import {Routes, Route} from "react-router-dom"

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/forgotpassword" element={<ForgotPass/>}/>
              <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
          </Routes>
      </div>
  );
}

export default App;
