import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import "./globals.css";
export const metadata = {
  title: "Conva AI",
  description: "talking Laywer",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" >
      <body>{children}</body>
    </html>
    </ClerkProvider>
  );
}
