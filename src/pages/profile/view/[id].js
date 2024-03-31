import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) {
        setLoading(false);
        return; // Exit early if id is not available
      }

      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            `/api/collections/profile/records/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profileData = await response.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("An error occurred while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Profile not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/profile"
        className=" bg-yellow-300 w-max p-3 rounded-full inline-block mb-4"
      >
        Back to Profile
      </Link>
      <div className="bg-white rounded-lg shadow-lg border-2 p-6 mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <img
              src={
                process.env.NEXT_PUBLIC_API_URL +
                `/api/files/profile/${profile.id}/${profile.img}`
              }
              alt="Profile Image"
              className="w-full rounded-lg mb-4"
            />
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <div>
              <h2 className="text-xl font-bold mb-2">
                {profile.fName} {profile.lName}
              </h2>
              <p className="text-gray-600 mb-4">Place: {profile.place}</p>
              <p className="text-gray-600 mb-4">Age: {profile.age}</p>
              <p className="text-gray-600 mb-4">Phone: {profile.phone}</p>
            </div>
          </div>
          <div className="col-span-3 md:col-span-3">
            <p className="text-gray-600 mb-4">
              Description: {profile.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
