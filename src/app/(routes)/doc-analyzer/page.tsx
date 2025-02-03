"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import ReactMarkdown from "react-markdown";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function DocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setSummary('');

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Document analysis failed');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error('Error during analysis:', err);
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${poppins.className} flex min-h-screen bg-gray-100 text-black font-poppins`}>
      
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">DOCUMENT ANALYSIS</h1>
        <div className="bg-white shadow-md p-6 rounded-lg border border-blue-300">
          <form onSubmit={handleSubmit} className="space-y-4 text-center">
            <label className="block text-xl font-bold">Select File</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="block w-full p-2 border rounded-lg mx-auto cursor-pointer" />
            <button 
              type="submit" 
              disabled={loading || !file}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            >
              {loading ? 'Analyzing...' : 'Generate Summery'}
            </button>
          </form>
        </div>
        
        {/* Summary Output */}
        <h2 className="text-xl font-bold mt-10 mb-4">GENERATED SUMMARY</h2>
        <div className="bg-white shadow-md p-6 rounded-lg border border-blue-300 text-center">
          {error && <p className="text-red-500">{error}</p>}
          {summary ? (
            <div className="text-black text-xl"><ReactMarkdown>{summary}</ReactMarkdown></div>
          ) : (
            <div className="text-black">
              <img src="/userNotFound.png" alt="No Data" className="mx-auto w-24 h-24" />
              <p className="text-black">Nothing to show.....</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
