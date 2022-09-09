import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Users } from "user/pages/Users";
import { NewPlace } from "places/pages/NewPlace";
import { MainNavigation } from "shared/components/Navigation/MainNavigation";
import { UserPlaces } from "places/pages/UserPlaces";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main style={{ marginTop: "5rem" }}>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="places/new" element={<NewPlace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
