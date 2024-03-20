import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { handleLogin, handleProfile } from "@/hooks/useNavbar";
import useCurrentUser from "@/hooks/useVerified";

const Navbar = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser()

  const handleLoginClick = () => {
    handleLogin(router);
  };


  const handleProfileClick = () => {
    handleProfile(router);
  };

  return (
    <div className="text-center flex justify-center z-40 text-black ">
      <div className="mt-2 w-max text-sm md:text-md  px-3 py-2 rounded-full bg-gray-200 space-x-2 items-center ">
        <Link href={"./"} className="hover:bg-gray-50 rounded-full p-2">
          Home
        </Link>
        <Link href={"./profile"} className="hover:bg-gray-50 rounded-full p-2">
          Profiles
        </Link>
        <Link href={"./blog"} className="hover:bg-gray-50 rounded-full p-2">
          Blog
        </Link>
        <Link href={"./about"} className="hover:bg-gray-50 rounded-full p-2">
          About
        </Link>
        <button
          className="bg-yellow-300 rounded-full p-2"
          onClick={currentUser ? handleProfileClick : handleLoginClick}
        >
          {currentUser ? "Profile"  : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
