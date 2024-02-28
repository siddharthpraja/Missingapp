import React, { useState, useEffect } from "react";
import Link from "next/link";

const Profiles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://vigilant-quoll.pikapod.net/api/collections/profile/records");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData.items);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://vigilant-quoll.pikapod.net/api/collections/profile/records/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }
      // Remove the deleted profile from the state
      setData(data.filter(profile => profile.id !== id));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div>
      <h2 className="m-10 font-bold text-3xl">Profile page</h2>
      <div className="text-end">
        <Link href="/profiles/createprofile">
          <button className="p-4 bg-yellow-400 text-yellow-100 rounded-full mr-4">
            Add Profile
          </button>
        </Link>
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          data.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-lg border-2 p-6 mt-3"
            >
              <Link href={`/profiles/view/${profile.id}`}>
              <img
                src={`https://vigilant-quoll.pikapod.net/api/files/profile/${profile.id}/${profile.img}`}
                alt="Profile Image"
                className="w-full rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2">
                {profile.fName} {profile.lName}
              </h2>
              </Link>
              <p className="text-gray-600 mb-4">{profile.place}</p>
              <div className="mt-4">
                <Link href={`/profiles/edit/${profile.id}`}>
                  <button className="text-blue-500">Edit Profile</button>
                </Link>
                <button onClick={() => handleDelete(profile.id)} className="text-red-500 ml-2">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profiles;
