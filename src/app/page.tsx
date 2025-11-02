// app/page.tsx
import Hero from "./components/Hero";
import ProductListing from "./components/ProductListing";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductListing />
    </>
  );
}