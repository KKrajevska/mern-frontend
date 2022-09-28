import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Users } from "user/pages/Users";
import { NewPlace } from "places/pages/NewPlace";
import { MainNavigation } from "shared/components/Navigation/MainNavigation";
import { UserPlaces } from "places/pages/UserPlaces";
import { UpdatePlace } from "places/pages/UpdatePlace";
import { Auth } from "user/pages/Auth";
import { AuthContext } from "shared/context/authContext";

function App() {
  const [token, settoken] = useState<string | null>(null);
  const [userId, setuserId] = useState<string | null>(null);

  const login = useCallback((uid: string, token: string) => {
    settoken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
    setuserId(uid);
  }, []);

  const logout = useCallback(() => {
    settoken(null);
    setuserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const localStg = localStorage.getItem("userData");
    if (localStg) {
      const storedData: { userId: string; token: string } =
        JSON.parse(localStg);
      if (storedData && storedData.token) {
        login(storedData.userId, storedData.token);
      }
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main style={{ marginTop: "5rem" }}>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
