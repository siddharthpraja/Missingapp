import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useVerified";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

const CreateBlog = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    content: "",
    topic: "",
    time_to_read: "",
    coverImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, coverImage: file });

    const reader = new FileReader();
    reader.onload = function (event) {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const validationErrors = {};
    if (!blog.title) {
      validationErrors.title = "Title is required";
    }
    if (!blog.description) {
      validationErrors.description = "Description is required";
    }
    if (!blog.content) {
      validationErrors.content = "Content is required";
    }
    if (!blog.topic) {
      validationErrors.topic = "Topic is required";
    }
    if (!blog.time_to_read) {
      validationErrors.time_to_read = "Time to Read is required";
    }
    // Add validation for other fields as needed

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(blog).forEach((key) => {
        formData.append(key, blog[key]);
      });

      const record = await pb.collection("blog").create(formData);
      console.log("Record created:", record);

      router.push("/blog");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 ">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Create blog
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={blog.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="content" className="text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={blog.content}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
            />
            {errors.content && <p className="text-red-500">{errors.content}</p>}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="topic" className="text-gray-700">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={blog.topic}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
            />
            {errors.topic && <p className="text-red-500">{errors.topic}</p>}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="time_to_read" className="text-gray-700">
              Time to Read (minutes)
            </label>
            <input
              type="number"
              id="time_to_read"
              name="time_to_read"
              value={blog.time_to_read}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
            />
            {errors.time_to_read && (
              <p className="text-red-500">{errors.time_to_read}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="coverImage" className="text-gray-700">
              Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-orange-600 w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Cover Preview"
                className="mt-2 rounded-md"
                style={{ maxWidth: "100%" }}
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-orange-600 w-max text-white py-3 px-6 rounded-md hover:bg-orange-700 mt-4 focus:outline-none focus:bg-orange-700"
          >
            Create blog
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/blog" passHref>
            <button className="text-sm w-max text-gray-600 hover:text-gray-900">
              Back to blog
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
