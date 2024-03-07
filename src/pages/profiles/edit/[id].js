import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const EditProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL +  `/api/collections/profile/records/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profileData = await response.json();
        setProfile(profileData);
        setPhone(profileData.phone); // Set phone number
        setDescription(profileData.description); // Set description
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("An error occurred while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  const handleInputChange = (e) => {
    if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // Create preview URL for the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fName", profile.fName);
      formData.append("lName", profile.lName);
      formData.append("place", profile.place);
      formData.append("phone", phone); // Append phone number to form data
      formData.append("description", description); // Append description to form data
      if (imageFile) {
        formData.append("img", imageFile);
      }

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/collections/profile/records/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      router.push("/profiles");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
    <div>
      <h2 className="m-10 font-bold text-3xl text-start">Edit Profile</h2>
      <div className="text-end">
        <Link
          href="/profiles"
          className="bg-yellow-300 w-max p-3 mb-3 rounded-full"
        >
          Back to Profile
        </Link>
      </div>
      <div className="flex justify-center mt-2 items-center h-full">
        <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <p className="text-gray-600 mb-2">ID: {profile.id}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fName"
                  className="inline text-gray-700 text-sm font-bold mb-2"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="fName"
                  name="fName"
                  value={profile.fName}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="lName"
                  className="inline text-gray-700 text-sm font-bold mb-2"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lName"
                  name="lName"
                  value={profile.lName}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="place"
                  className="inline text-gray-700 text-sm font-bold mb-2"
                >
                  Place:
                </label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  value={profile.place}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="inline text-gray-700 text-sm font-bold mb-2"
                >
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-2 w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="inline text-gray-700 text-sm font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-2 w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="img"
                  className="inline text-gray-700 text-sm font-bold mb-2"
                >
                  Profile Image:
                </label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={handleImageChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-2 w-full"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="mt-2"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-max bg-yellow-400 text-white rounded-full p-3 mt-4"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
