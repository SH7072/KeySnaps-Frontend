import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import React from 'react';
import './App.css';
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";

function Root() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    ));

  return (
    <RouterProvider router={router} >
      <App />
    </RouterProvider >
  );
}

export default App;
