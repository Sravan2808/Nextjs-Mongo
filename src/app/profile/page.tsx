"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("User details response:", res.data);
      setData(res.data.data._id);
      toast.success("User details loaded successfully");
    } catch (error: any) {
      console.log("Error getting user details:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to get user details";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="text-gray-600">Welcome to your profile!</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <br />
      <button
        onClick={logout}
        className="p-2 border bg-blue-500 hover:bg-blue-700 border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="p-2 border bg-green-800 hover:bg-blue-700 border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        GetUserDetails
      </button>
    </div>
  );
}
