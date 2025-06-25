<<<<<<< Updated upstream
import ImovelFeed from "@domains/imovel/components/ImovelFeed";
import PublicHeader from "@shared/components/PublicHeader";
=======
'use client';

import ProductFeed from "@domains/product/components/ProductFeed";
import ThemeLayout from "./themes/ThemeLayout";
>>>>>>> Stashed changes

export default function Home() {
  return (
    <ThemeLayout>
      <main className="container mx-auto px-4 py-6">
        <ImovelFeed />
      </main>
    </ThemeLayout>
  );
}
