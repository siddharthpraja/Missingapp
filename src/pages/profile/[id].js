import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://tangerine-panda.pikapod.net");

const Profilepage = () => {
  const [currentUser, setCurrentUser] = useState(null);

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

  return (
    <div className="flex justify-center h-[110vh] mt-[-10vh]  z-1 overflow-hidden bg-gradient-to-r from-orange-500  to-yellow-400">
      <div className="bg-white h-max rounded-lg shadow-lg mt-[15vh] p-8 m-4 w-3/4 max-w-lg">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                currentUser
                  ? currentUser.photo || "/profile.webp"
                  : "/train.webp"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Edit
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            {currentUser ? currentUser.username : "User"}
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            {currentUser
              ? currentUser.bio || "No bio available"
              : "No bio available"}
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-yellow-400">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
