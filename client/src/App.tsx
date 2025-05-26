import React from 'react';
import { Dashboard } from './Pages/Dashboard';
import { SignUp } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import { SharedDashboard } from './Pages/SharedDashboard';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<FirstPage />} /> */}
      <Route path='/signin' element={<Signin />} />
      <Route path='/' element={<SignUp />} />
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/share/:shareId' element={<SharedDashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
