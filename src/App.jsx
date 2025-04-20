import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import router from "./helper/routes";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Login from "./components/Login";
import axios from "axios";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/me", {
        withCredentials: true,
      });
      if (res) {
        res.data.success ? setIsLoggedIn(true) : setIsLoggedIn(false);
      }
    };
    fetch();
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
