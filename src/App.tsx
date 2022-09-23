import React, { useCallback, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setuserId] = useState<string | null>(null);

  const login = useCallback((uid: string) => {
    setIsLoggedIn(true);
    setuserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
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
        isLoggedIn: isLoggedIn,
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
