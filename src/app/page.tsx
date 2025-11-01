// src/app/page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductListing from "@/components/ProductListing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <Hero />
        <ProductListing />
      </div>
      <Footer />
    </>
  );
}