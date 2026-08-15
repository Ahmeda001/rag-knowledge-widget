import "./globals.css";
import React from "react";

export const metadata = {
  title: "AI Knowledge Widget SaaS",
  description: "Embed custom RAG chatbots on your website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900 bg-gray-50">
        {/* Next.js automatically injects page.tsx content into {children} */}
        {children}
      </body>
    </html>
  );
}