import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Home() {
  return (
    <div className={poppins.className}>
      <h1 className="text-3xl font-bold">Welcome to Next.js with Poppins Font</h1>
      <p>This text is using the Poppins font.</p>
    </div>
  );
}
