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
    e.preventDefault();
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    // Check if file size exceeds 100KB
    if (file.size > 100 * 1024) {
      alert("Error: Maximum file size exceeded (100KB)");
      // Reset the input field
      e.target.value = null;
      return;
    }

    // Read the file to get its dimensions
    const reader = new FileReader();
    reader.onload = function (event) {
      const image = new Image();
      image.src = event.target.result;
      image.onload = function () {
        const width = this.width;
        const height = this.height;
        // Check if dimensions exceed 300x300 pixels
        if (width > 300 || height > 300) {
          alert("Error: Image dimensions exceed 300x300 pixels");
          // Reset the input field
          e.target.value = null;
          return;
        }
        // If conditions are met, set the image file and preview
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDateChange = (e) => {
    // Calculate age from the selected date
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < selectedDate.getDate())
    ) {
      setProfile({ ...profile, age: age - 1 }); // Subtract 1 if birthday hasn't occurred yet this year
    } else {
      setProfile({ ...profile, age });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    const emptyFields = Object.values(profile).some((value) => value === "");
    if (emptyFields) {
      alert("Error: All fields are mandatory");
      return;
    }

    // Check phone number format
    if (!/^\d{10}$/.test(profile.phone)) {
      alert("Error: Phone number must be 10 digits");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(profile).forEach((key) => {
        formData.append(key, profile[key]);
      });
      if (imageFile) {
        formData.append("img", imageFile);
      }

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/collections/profile/records",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      // Redirect to the profile page after successful creation
      router.push("/profile");
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div className="min-h-screen  w-full flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center w-full">
          Create Profile
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fName" className="text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="fName"
                name="fName"
                value={profile.fName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
              />
            </div>
            <div>
              <label htmlFor="lName" className="text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lName"
                name="lName"
                value={profile.lName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
              />
            </div>
            <div>
              <label htmlFor="place" className="text-gray-700">
                Place
              </label>
              <input
                type="text"
                id="place"
                name="place"
                value={profile.place}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
              />
            </div>
            <div>
              <label htmlFor="dob" className="text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                onChange={handleDateChange}
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="phone" className="text-gray-700">
                Phone
              </label>
              <div className="flex mt-2">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={profile.countryCode}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-orange-600"
                >
                  <option value="+91">+91</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-orange-600"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="img" className="text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="mt-2 rounded-md"
                  style={{ maxWidth: "100%" }}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 mt-4 focus:outline-none focus:bg-orange-700"
          >
            Create Profile
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/profile" passHref>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Back to Profiles
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
