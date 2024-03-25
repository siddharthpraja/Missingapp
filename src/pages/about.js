// pages/about.js

import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-6xl font-extrabold tracking-tight text-gray-900">
            Shedding Light on Missing Persons in Mumbai
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            At Search Soul, we are dedicated to shedding light on the
            often-overlooked issue of missing persons in Mumbai. Our platform
            serves as a beacon of awareness, aiming to educate, advocate, and
            initiate conversations surrounding this pressing humanitarian
            concern.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600">
                Our mission is simple yet profound: to amplify the voices of the
                missing and their families, to advocate for systemic change, and
                to mobilize communities towards proactive solutions. We believe
                that every missing person's story deserves to be heard, and
                every family deserves closure and support in their search for
                their loved ones.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
              <Image src="/image1.jpg" alt="Image 1" width={500} height={350} />
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex  items-center">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
              <Image src="/image2.jpg" alt="Image 2" width={500} height={350} />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                What Drives Us
              </h3>
              <p className="text-lg text-gray-600">
                Behind our commitment lies a deep-seated empathy for those
                affected by the anguish of separation. We are driven by the
                belief that by shining a spotlight on missing persons, we can
                inspire action, foster solidarity, and pave the way for a more
                compassionate society.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Approach
              </h3>
              <p className="text-lg text-gray-600">
                At Search Soul, we adopt a holistic approach to addressing the
                complexities of missing persons cases. Through comprehensive
                analysis of data, insightful commentary, and compassionate
                storytelling, we strive to unravel the layers of this
                multifaceted issue. Moreover, we collaborate with experts,
                organizations, and communities to foster collective efforts
                towards prevention, intervention, and support for those
                impacted.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
              <Image src="/image3.jpg" alt="Image 3" width={500} height={350} />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Us</h3>
          <p className="text-lg text-gray-600">
            We invite you to join us on this journey of advocacy and awareness.
            Whether you're a concerned citizen, a passionate advocate, or
            someone directly impacted by the issue, your voice matters.
            Together, we can make a difference, one story, one conversation, and
            one initiative at a time.
          </p>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
          <p className="text-lg text-gray-600">
            Have a story to share, a question to ask, or a partnership
            opportunity to explore? We welcome your feedback, inquiries, and
            collaboration proposals. Reach out to us at +91 8601480711 and let's work together towards a future where no one
            goes missing without a trace.
          </p>
        </div>
        <div className="text-center mt-10">
          <p className="text-lg text-gray-600">
            Together, let's illuminate the path towards hope, healing, and
            resolution for missing persons and their families across Mumbai.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
