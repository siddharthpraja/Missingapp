import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Blog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/collections/blog/records/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const blogData = await response.json();
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("An error occurred while fetching blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>
        <div className="container mx-4 mt-8">
          <div className="grid grid-cols-1 mx-2 lg:mx-[24%] gap-4 text-stone-800">
            {/* Render Latest post here */}
            {blog && ( // Check if blog is not null before accessing its properties
              <div className="bg-white py-4 rounded">
                <div className="mt-4 font-sans font-semibold text-xs">
                  <span className=" text-slate-400 mt-4">
                    BY{" "}
                    <span className="text-stone-800 font-bold">
                    {blog.user ? blog.user : "Siddharth Praja"}
                    </span>{" "}
                    IN <span className="text-orange-600 ">{blog.topic}</span> -{" "}
                    {blog.created}
                  </span>
                </div>
                <h2 className="lg:text-6xl  text-4xl font-bold mt-4">
                  {blog.title}
                </h2>
                <p className="mt-6 lg:text-xl text-xl">{blog.description}</p>
                <img
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    `/api/files/blog/${blog.id}/${blog.coverImage}`
                  }
                  className="w-full h-max mt-6 object-contain"
                  alt="Blog"
                />
              </div>
            )}
            {blog && ( // Check if blog is not null before accessing its content
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
