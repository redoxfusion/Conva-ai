"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
export default function Dashboard() {
  return (
    <div className={`${poppins.className} flex min-h-screen bg-gray-100 font-[Poppins] text-black`}>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold font-mono mb-6">Dashboard</h1>
        
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-blue-400 to-white shadow-lg rounded-xl p-8 flex items-center justify-between">
          <div className="text-white font-bold text-2xl">I AM HERE TO HELP YOU!!</div>
          <div className="flex flex-col items-center">
            <button className="bg-white p-4 rounded-full shadow-lg">
              🎤
            </button>
          </div>
          <img src="/charachter 1.png" alt="Assistant" className="w-48" />
        </div>
        
        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-b from-blue-400 to-white shadow-lg rounded-xl p-6 text-center">
            <p className="text-white text-xl font-bold">Analyze Your Document</p>
            <button className="mt-4 bg-white px-4 py-2 rounded-full shadow-lg">GO →</button>
          </div>
          <div className="bg-gradient-to-b from-blue-400 to-white shadow-lg rounded-xl p-6 text-center">
            <p className="text-white text-xl font-bold">Wanna Chat?</p>
            <button className="mt-4 bg-white px-4 py-2 rounded-full shadow-lg">GO →</button>
            <img src="/character 2.png" alt="Assistant" className="w-48" />
          </div>
        </div>
      </main>
    </div>
  );
}