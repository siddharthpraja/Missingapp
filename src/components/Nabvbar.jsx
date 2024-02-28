import Link from "next/link";
import React from "react";

const Nabvbar = () => {
  return (
    <div className="text-center flex justify-center z-40 ">
      <div className=" mt-2 w-max p-3 rounded-full bg-gray-50 space-x-2 items-center ">
        <Link href={"./"} className="hover:bg-gray-50 rounded-full p-2">
          Home
        </Link>
        <Link href={"./profiles"} className="hover:bg-gray-50 rounded-full p-2">
          Profiles
        </Link>
        <Link href={"./blog"} className="hover:bg-gray-50 rounded-full p-2">
          Blog
        </Link>
        <Link href={"./abou"} className="hover:bg-gray-50 rounded-full p-2">
          About
        </Link>
        <Link href={"./login"} className="bg-yellow-300 rounded-full p-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Nabvbar;
