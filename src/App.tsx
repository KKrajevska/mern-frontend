import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Users } from "user/pages/Users";
import { NewPlace } from "places/pages/NewPlace";
import { MainNavigation } from "shared/components/Navigation/MainNavigation";
import { UserPlaces } from "places/pages/UserPlaces";
import { UpdatePlace } from "places/pages/UpdatePlace";
import { Auth } from "user/pages/Auth";
import { AuthContext } from "shared/context/authContext";
import { useAuth } from "shared/hooks/authHook";

function App() {
  const { token, login, logout, userId } = useAuth();

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
