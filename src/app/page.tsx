import ProductFeed from "@domains/product/components/ProductFeed";
import PublicHeader from "@shared/components/PublicHeader";

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 py-6">
        <ProductFeed />
      </main>
    </>
  );
}
