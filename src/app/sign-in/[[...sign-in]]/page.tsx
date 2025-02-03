import { SignIn } from '@clerk/nextjs'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Page() {
  return (<div className={`${poppins.className} flex items-center justify-center h-screen`}><SignIn /></div>);
}