import React from "react";
import Hero from "@/components/Hero"; // Assuming Hero component is correctly located
import StationPhone from "@/components/Stationphone"; // Assuming StationPhone component is correctly located

export default function Home() {
  return (
    <div className="h-[200vh]">
      <Hero />
      <StationPhone />
    </div>
  );
}
