// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "mettà muse | Premium Fashion Discovery",
  description:
    "Explore curated collections of premium clothing and accessories. Filter by occasion, fabric, and more. Fast shipping. Free over $50.",
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
              url: "https://appscrip-task-yourname.netlify.app",
            }),
          }}
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}