import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePrivate from "./usePrivate";
// import privateValue, { usePrivate } from "./usePrivate";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const newValue = usePrivate();

  console.log("newValue = " + newValue);

  useEffect(() => {
    if (!newValue) {
      navigate("/login", { replace: true });
    }
  }, [navigate, newValue]);

  return children;
}
