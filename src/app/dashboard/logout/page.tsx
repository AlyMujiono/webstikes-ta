'use client'
import firebase_app from "@/components/firebase/config";
import { CircularProgress } from "@nextui-org/react";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";

const auth = getAuth(firebase_app);

function Logout() {
  function logOut() {
    return auth.signOut();
  }
  useEffect(() => {
    logOut();
  }, []);

  return <CircularProgress aria-label="Loading..." />;
}

export default Logout;
