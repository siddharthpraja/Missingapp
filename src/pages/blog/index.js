import Link from "next/link";
import React, { useState, useEffect } from "react";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const Blog = () => {
  const [firstBlog, setFirstBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/collections/blog/records?sort=-created,id`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const blogs = data.items;
        setFirstBlog(blogs[0]); // Set the first blog post
        setOtherBlogs(blogs.slice(1)); // Set other blog posts except the first one
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {/* Render the first blog post */}
          {firstBlog && (
            <div className="container mx-auto mt-8" key={firstBlog.id}>
              <div className="grid grid-cols-1 lg:mx-[10%] gap-4 text-stone-800">
                {/* Wrap content with Link component */}
                <Link href={`/blog/view/${firstBlog.id}`}>
                  <div className="bg-white p-4 rounded">
                    <p className="text-sm text-orange-600 mt-4">
                      LATEST - {formatDate(firstBlog.created)}
                    </p>
                    <h2 className="lg:text-7xl text-4xl font-bold mt-4">
                      {firstBlog.title}
                    </h2>
                    <p className="mt-6 lg:text-3xl text-xl lg:w-[80%]">
                      {firstBlog.description}
                    </p>
                    <p className="text-xs text-slate-400 mt-4">
                      {firstBlog.time_to_read} MIN READ
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Render other blog posts */}
          {otherBlogs.map((blog) => (
            <div className="container mx-auto mt-8" key={blog.id}>
              <div className="grid grid-cols-1 lg:ml-[10%] lg:mr-[40%] gap-4">
                {/* Render blog posts here */}
                <div className="bg-white p-4 rounded">
                  <p className="text-xs text-stone-950 font-semibold mt-4">
                    MORE POSTS
                  </p>
                  {/* Wrap content with Link component */}
                  <Link href={`/blog/view/${blog.id}`}>
                    <h2 className="lg:text-4xl text-3xl font-bold  mt-4">
                      {blog.title}
                    </h2>
                    <p className="mt-6 lg:text-xl text-lg ">
                      {blog.description}
                    </p>
                    <div className="mt-4">
                      <span className="text-xs text-orange-600">
                        LATEST - {formatDate(blog.created)}
                      </span>
                      <span className="text-xs text-slate-400 mt-4 ml-2">
                        • {blog.time_to_read} MIN READ
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
