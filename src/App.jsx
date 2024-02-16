import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import EditBooks from "./pages/EditBooks";
import DeleteBooks from "./pages/DeleteBooks";
import ShowBooks from "./pages/ShowBooks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./protectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBooks />} />
        <Route path="/books/details/:id" element={<ShowBooks />} />
        <Route path="/books/edit/:id" element={<EditBooks />} />
        <Route path="/books/delete/:id" element={<DeleteBooks />} />
      </Route>
    </Routes>
  );
};

export default App;
