import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { ContactPage } from "../contact/pages/ContactPage";
import { ContactsContext } from "../context/ContactsContext";

export const AppRouter = () => {

  const { token } = useContext(ContactsContext);

  return (
    <Routes>
        {
          !token ? 
          <>
            <Route path="/auth/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<Navigate to={ "/auth/login"} /> } />
          </>
          :
          <>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/*" element={ <Navigate to="/contact"/> } />
          </>
        }

    </Routes>
  );
};
