import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import router from "./helper/routes";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Login from "./components/Login";
import axios from "axios";

const meUrl = `${import.meta.env.VITE_BASE_URL}/me`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(meUrl, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoggedIn(false);
      }
    };

    fetchSession();
  }, []);

  return isLoggedIn ? (
    <div>
      <Header />
      <Routes>
        {router.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
      <Sidebar />
    </div>
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} />
  );
};

export default App;
