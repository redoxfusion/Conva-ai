"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const AnnotationGenerator = () => {
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
    <div className="bg-white shadow-lg p-6 rounded-lg border border-blue-300 text-center max-w-3xl mx-auto">
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
      {annotation && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Generated Annotation:</h2>
          <div className="text-left text-gray-800"><ReactMarkdown>{annotation}</ReactMarkdown></div>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500 font-medium">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default AnnotationGenerator;
