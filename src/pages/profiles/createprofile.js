import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CreateProfile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    fName: "",
    lName: "",
    place: "",
    age: "",
    phone: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(profile).forEach((key) => {
        formData.append(key, profile[key]);
      });
      if (imageFile) {
        formData.append("img", imageFile);
      }

      const response = await fetch(
        "https://vigilant-quoll.pikapod.net/api/collections/profile/records",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      // Redirect to the profile page after successful creation
      router.push("/profiles");
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div>
      <h2 className="m-10 font-bold text-3xl text-start">Create Profile</h2>
      <div className="text-end">
        <Link href="/profiles" className="bg-yellow-300 w-max p-3 rounded-full">
          Back to Profile
        </Link>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3">
          <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fName">First Name:</label>
                  <input
                    type="text"
                    id="fName"
                    name="fName"
                    value={profile.fName}
                    onChange={handleInputChange}
                    className="border border-gray-400 rounded px-2 py-1 mt-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="lName">Last Name:</label>
                  <input
                    type="text"
                    id="lName"
                    name="lName"
                    value={profile.lName}
                    onChange={handleInputChange}
                    className="border border-gray-400 rounded px-2 py-1 mt-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="place">Place:</label>
                  <input
                    type="text"
                    id="place"
                    name="place"
                    value={profile.place}
                    onChange={handleInputChange}
                    className="border border-gray-400 rounded px-2 py-1 mt-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="age">Age:</label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={profile.age}
                    onChange={handleInputChange}
                    className="border border-gray-400 rounded px-2 py-1 mt-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="border border-gray-400 rounded px-2 py-1 mt-2 w-full"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={profile.description}
                    onChange={handleInputChange}
                    className="border border-gray-400 rounded px-2 py-1 mt-2 w-full"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="img">Profile Image:</label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={handleImageChange}
                    className="border border-gray-400 rounded px-2 py-1 mt-2 w-full"
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
                className="bg-yellow-400 w-max p-3 rounded-full"
              >
                Create Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
