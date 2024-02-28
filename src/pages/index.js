import Hero from "@/components/Hero";
import StationsPage from "@/components/Stations";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-[200vh]">
      <Hero/>
      <StationsPage/>
    </div>
  );
}
