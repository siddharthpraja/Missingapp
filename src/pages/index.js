import Hero from "@/components/Hero";
import StationPhone from "@/components/Stationphone";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-[200vh]">
      <Hero/>
      <StationPhone/>
    </div>
  );
}
