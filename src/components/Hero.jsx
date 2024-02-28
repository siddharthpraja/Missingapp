import React from 'react';
import { motion } from 'framer-motion';

const CreativeHero = () => {
  return (
    <div className="h-[110vh] mt-[-10vh] z-1 overflow-hidden">
      <motion.div
        className="top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-500 to-orange-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Find Your Missing member with Search Soul</h1>
        <p className="text-lg lg:text-xl mb-8">We are currently in Mumbai Western-Railway just uplad details</p>
        <button className="bg-white text-yellow-700 px-8 py-3 rounded-full font-semibold uppercase tracking-wide shadow-md hover:bg-yellow-100 hover:text-yellow-900 transition duration-300">Explore Now</button>
      </div>
    </div>
  );
};

export default CreativeHero;
