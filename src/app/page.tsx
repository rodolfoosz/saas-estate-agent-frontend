import ImovelFeed from "@domains/imovel/components/ImovelFeed";
import PublicHeader from "@shared/components/PublicHeader";

export default function Home() {
<<<<<<< Updated upstream
  redirect("/login");
=======
  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 py-6">
        <ImovelFeed />
      </main>
    </>
  );
>>>>>>> Stashed changes
}
