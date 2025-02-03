"use client";

import AnnotationGenerator from "./_components/AnnotationGenerator";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const Home = () => {
  return (
    <div className={`${poppins.className} bg-gray-50 min-h-screen text-black flex font-poppins`}>
      
      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">DOCUMENT ANNOTATIONS</h1>
        </div>
        
        {/* Annotation Generator Component */}
        <div className="mt-10">
          <AnnotationGenerator />
        </div>
        
        {/* Generated Content */}
        <h2 className="text-xl font-bold mt-10 mb-4">GENERATED CONTENT</h2>
        <div className="bg-white shadow-lg p-6 rounded-lg border border-blue-300 text-center max-w-3xl mx-auto">
          <p className="text-2xl"><img src="/userNotFound.png" alt="Empty" className="mx-auto w-24 h-24" /></p>
          <p className="text-gray-600 font-medium">Nothing to show.....</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
