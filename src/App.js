import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import React, { useEffect } from 'react';
import './App.css';
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { MantineProvider } from "@mantine/core";
import Practice from "./Components/Practice/Practice";
import Home from "./Components/Home/Home";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import CreateLobby from "./Components/Multiplayer/CreateLobby/CreateLobby";
import JoinLobby from "./Components/Multiplayer/JoinLobby/JoinLobby";
import UserInfo from "./Components/UserInfo/UserInfo";
import Lobby from "./Components/Lobby/Lobby";
import Profile from "./Components/Profile/Profile";
import Multiplayer from "./Components/Multiplayer/Multiplayer";


function Root() {

  useEffect(() => {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    console.log(typeof (isLoggedIn));
    if (isLoggedIn === null || isLoggedIn === false) {
      sessionStorage.setItem('isLoggedIn', false);
    }




  }, []);




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
        <Route path="register" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="userInfo" element={<UserInfo />} />
        <Route path="practice" element={<Practice />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="lobby" element={<Multiplayer />} />
        <Route path="createlobby" element={<CreateLobby />} />
        <Route path="joinlobby" element={<JoinLobby />} />
        <Route path='lobby/:lobbyCode' element={<Lobby />} />
        <Route path='profile' element={<Profile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route >
    )
  );

  return (
    <RouterProvider router={router} >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          colors: {
            primarybrand: ['#02d96e'],
            secondaryBrand: ['#cce5ff'],
            accentBrand: ['#02fd80'],
            darkBrand: ['#000'],
            lightBrand: ['#fff'],
            darkSecondaryBrand: ["#001933"],
            darkAccentBrand: ["#67feb3"],
            text: ["#050505"],
            background: ["#fafafa"],
            darkText: ["#fafafa"],
            darkBackground: ["#050505"],
          },
          primaryColor: 'primarybrand',
          secondaryColor: 'secondaryBrand',
          accentColor: 'accentBrand',

          shadows: {
            md: '1px 1px 3px rgba(0, 0, 0, .25)',
            xl: '5px 5px 3px rgba(0, 0, 0, .25)',
          },

          headings: {
            fontFamily: 'Roboto Mono, Roboto, sans-serif',
            sizes: {
              h1: { fontSize: '2rem' },
            },
          },
        }}
      >
        <App />
      </MantineProvider>
    </RouterProvider >
  );
}

export default App;
