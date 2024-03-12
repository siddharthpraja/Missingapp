import React, { useState, useEffect } from "react";
import Link from "next/link";
import PocketBase from "pocketbase";
import { useRouter } from "next/router";

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await pb.authStore.model;
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
        console.error("Failed to fetch current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await pb.authStore.clear();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="text-center flex justify-center z-40 text-black ">
      <div className="mt-2 w-max text-sm md:text-md  px-3 py-2 rounded-full bg-gray-200 space-x-2 items-center ">
        <Link href={"./"} className="hover:bg-gray-50 rounded-full p-2">
          Home
        </Link>
        <Link href={"./profiles"} className="hover:bg-gray-50 rounded-full p-2">
          Profiles
        </Link>
        <Link href={"./blog"} className="hover:bg-gray-50 rounded-full p-2">
          Blog
        </Link>
        <Link href={"./about"} className="hover:bg-gray-50 rounded-full p-2">
          About
        </Link>
        <button className="bg-yellow-300 rounded-full p-2" onClick={currentUser ? handleLogout : handleLogin}>
          {currentUser ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
