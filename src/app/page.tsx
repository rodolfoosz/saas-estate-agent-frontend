'use client';
        
import ProductFeed from "@domains/product/components/ProductFeed";
import ThemeLayout from "./themes/ThemeLayout";

export default function Home() {
  return (
    <ThemeLayout>
      <main className="container mx-auto px-4 py-6">
        <ProductFeed />
      </main>
    </ThemeLayout>
  );
}
