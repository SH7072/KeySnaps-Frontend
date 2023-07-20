import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import React, { useEffect } from 'react';
import './App.css';
import Login from "./pages/Components/Login";
import Signup from "./pages/Components/Signup";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        
        
      </Route>
    ));

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
