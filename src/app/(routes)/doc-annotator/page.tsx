"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const Home = () => {
  const [annotation, setAnnotation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await fetch("/api/document-annotator", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setAnnotation(result.annotation);
        setError(null);
      } else {
        setAnnotation(null);
        setError(result.error || "An error occurred");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className={`${poppins.className} bg-gray-50 min-h-screen text-black flex font-poppins`}>
      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">DOCUMENT ANNOTATIONS</h1>
        </div>

        {/* Annotation Generator Component */}
        <div className="mt-10 bg-white shadow-lg p-6 rounded-lg border border-blue-300 text-center max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input type="file" name="document" required className="mt-2 p-2 border rounded-lg w-full" />
            </div>
            <div>
              <label className="block text-lg font-medium">Annotation Type:</label>
              <select name="annotationType" required className="mt-2 p-2 border rounded-lg w-full">
                <option value="highlight">Highlights</option>
                <option value="key-points">Key Points</option>
              </select>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-md">
              Generate Annotation
            </button>
          </form>
          {error && (
            <div className="mt-4 text-red-500 font-medium">
              <p>Error: {error}</p>
            </div>
          )}
        </div>

        {/* Generated Content */}
        <h2 className="text-xl font-bold mt-10 mb-4">GENERATED CONTENT</h2>
        <div className="bg-white shadow-lg p-6 rounded-lg border border-blue-300 text-center max-w-3xl mx-auto">
          {annotation ? (
            <div className="text-left text-gray-800">
              <ReactMarkdown>{annotation}</ReactMarkdown>
            </div>
          ) : (
            <>
              <p className="text-2xl">
                <img src="/userNotFound.png" alt="Empty" className="mx-auto w-24 h-24" />
              </p>
              <p className="text-gray-600 font-medium">Nothing to show.....</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
