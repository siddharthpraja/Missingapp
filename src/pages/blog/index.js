import React from "react";

const Blog = () => {
  return (
    <div>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 lg:mx-[10%] gap-4 text-stone-800">
          {/* Render Latest post here */}
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm text-orange-600  mt-4">
              LATEST - 05 Mar, 2024
            </p>
            <h2 className="lg:text-7xl  text-4xl font-bold mt-4">
              How does the Groq's LPU work?
            </h2>
            <p className="mt-6 lg:text-3xl text-xl lg:w-[80%]">
              Each year, language models double in size and capabilities. To
              keep up, we need new specialized hardware architectures built from
              the ground up for AI workloads.
            </p>
            <p className="text-xs text-slate-400 mt-4">9 MIN READ</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 lg:ml-[10%] lg:mr-[40%] gap-4">
          {/* Render blog posts here */}
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-xs text-stone-950 font-semibold mt-4">
              MORE POSTS 
            </p>

            <h2 className="lg:text-4xl text-3xl font-bold  mt-4">
              Why You Should Use Vectorization Instead of Loops in Python?
            </h2>
            <p className="mt-6 lg:text-xl text-lg ">
              Vectorization in Python, particularly with libraries like NumPy,
              is an advanced technique that significantly enhances the
              performance of data operations.
            </p>
            <div className="mt-4">
              <span className="text-xs text-orange-600">
                LATEST - 05 Mar, 2024
              </span>
              <span className="text-xs text-slate-400 mt-4 ml-2">
                • 9 MIN READ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

