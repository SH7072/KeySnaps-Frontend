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
import { MantineProvider } from "@mantine/core";
import Practice from "./Components/Practice/Practice";
import Home from "./Components/Home/Home";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import Lobby from "./Components/Multiplayer/Lobby";
import CreateLobby from "./Components/Multiplayer/CreateLobby/CreateLobby";
import JoinLobby from "./Components/Multiplayer/JoinLobby/JoinLobby";
import UserInfo from "./Components/UserInfo/UserInfo";

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
        <Route path="register" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="userInfo" element={<UserInfo />} />
        <Route path="practice" element={<Practice />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    ));

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
