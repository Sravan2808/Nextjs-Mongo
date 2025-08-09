"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const VerifyUserEmail = async () => {
    try {
      console.log("Attempting to verify with token:", token);
      const response = await axios.post("/api/users/verifyemail", {
        token,
      });
      console.log("Verification successful:", response.data);
      setVerified(true);
    } catch (error: any) {
      console.log("Verification failed:", error);
      setError(true);
      if (error.response?.data) {
        console.log("Error response:", error.response.data);
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    // Decode the URL-encoded token
    const decodedToken = urlToken ? decodeURIComponent(urlToken) : "";
    setToken(decodedToken);
    console.log("URL token:", urlToken);
    console.log("Decoded token:", decodedToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      VerifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link className="text-blue-500" href="/login">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
          <Link className="text-blue-500" href="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
