"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { HomeIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, MicrophoneIcon, DocumentCheckIcon } from "@heroicons/react/24/outline"; // Importing icons

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Layout({ children }) {
  return (
    <main className={`${poppins.className} flex min-h-screen bg-gray-100 font-[Poppins] text-black pl-6`}>
      {/* Sidebar with Rounded Corners */}
      <aside className="w-64 bg-white shadow-lg p-6 rounded-xl flex flex-col justify-between mt-6 mb-6">
        <div>
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/Conva Ai Logo no bg-02.png" alt="Conva AI Logo" className="w-32 mb-6" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link href="/" className="flex items-center p-3 rounded-lg text-black hover:bg-gray-200">
              <HomeIcon className="w-5 h-5 mr-2" /> Dashboard
            </Link>
            <Link href="/doc-analyzer" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
              <DocumentTextIcon className="w-5 h-5 mr-2" /> Document Analysis
            </Link>
            <Link href="/doc-annotator" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
              <DocumentCheckIcon className="w-5 h-5 mr-2" /> Document Annotations
            </Link>
            <Link href="/chatBot" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" /> Chat with Assistant
            </Link>
            <Link href="/aiAssistent" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
              <MicrophoneIcon className="w-5 h-5 mr-2" /> Talk to Assistant
            </Link>
          </nav>
        </div>

        {/* User Button at Bottom */}
        <div className="flex justify-center mt-auto">
          <UserButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </main>
  );
}
