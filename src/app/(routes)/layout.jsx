import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
export default function Layout({ children }) {
    return (
        
            <main className={`${poppins.className} flex min-h-screen bg-gray-100 font-[Poppins] text-black`}>
      <aside className="w-64 bg-white shadow-lg p-6 rounded-r-lg">
        <img src="/Conva Ai Logo no bg-02.png" alt="Conva AI Logo" className="w-32 mx-auto mb-6" />
        <nav className="space-y-2">
          <Link href="/" className="block p-3 rounded-lg text-black hover:bg-gray-200">Dashboard</Link>
          <Link href="/doc-analyzer" className="block p-3 rounded-lg hover:bg-gray-200">Document Analysis</Link>
          <Link href="/doc-annotator" className="block p-3 rounded-lg hover:bg-gray-200">Document Annotations</Link>
          <Link href="/chatBot" className="block p-3 rounded-lg hover:bg-gray-200">Chat with Assistant</Link>
          <Link href="/aiAssistent" className="block p-3 rounded-lg hover:bg-gray-200">Talk to Assistant</Link>
          
          <div className={`${poppins.className}flex justify-center object-top`}>
          <UserButton className={`${poppins.className}flex justify-center object-top`}/>
          </div>
          
        </nav>
      </aside>
      <div className="flex-1">
                {children}
                </div>
            </main>
        );
}