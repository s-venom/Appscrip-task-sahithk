// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mettà muse - Discover Our Products",
  description: "Premium fashion with filters, fast shipping, and exclusive deals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "mettà muse Products",
              url: "https://your-plp.netlify.app",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}