import Image from "next/image";
import React from "react";

const Blogpage = () => {
  return (
    <div>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 mx-2 lg:mx-[24%] gap-4 text-stone-800">
          {/* Render Latest post here */}
          <div className="bg-gray-100 py-4 rounded">
            <div className="mt-4 font-sans font-semibold text-xs">
              <span className=" text-slate-400 mt-4">
                BY{" "}
                <span className="text-stone-800 font-bold">
                  GAUTAM PRAJAPATI
                </span>{" "}
                IN <span className="text-orange-600 ">SOCIAL ISSUES</span> - 20
                MAR, 2024
              </span>
            </div>
            <h2 className="lg:text-6xl  text-4xl font-bold mt-4">
              How does the Groq's LPU work?
            </h2>
            <p className="mt-6 lg:text-xl text-xl">
              Each year, language models double in size and capabilities. To
              keep up, we need new specialized hardware architectures built from
              the ground up for AI workloads.
            </p>
            <Image
              src={"/test.jpg"}
              width={2000}
              height={2000}
              className="w-full h-max mt-6 object-contain"
              alt="Blog"
            />
          </div>
          <p className=" lg:mt-6 lg:text-xl text-lg">
            Artificial Intelligence is advancing at a blistering pace. One
            company delivering on that promise is Groq and their breakthrough
            Language Processing Unit (LPU). The LPU completely reimagines
            computing for machine learning, unlocking performance gains far
            beyond traditional GPUs.
          </p>
          <p className="mt-4 lg:mt-6 lg:text-xl text-lg">
            The Language Processing Unit (LPU) is a custom inference engine
            developed by Groq, specifically optimized for large language models.
            As language models like Llama2, Phi 2, and Mistral etc… continue to
            rapidly grow in size, there is a need for specialized hardware that
            can provide fast and efficient inference. Groq's LPU aims to fill
            this need and delivers major performance improvements over
            traditional GPU-based solutions.
          </p>
        </div>

        <footer className="py-4 mt-10 bg-gray-800 text-white text-center">
          Contact us on +91 8601480711
        </footer>
      </div>
    </div>
  );
};

export default Blogpage;
