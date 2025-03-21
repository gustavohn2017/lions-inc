import { Hero } from './_components/Hero/Hero';
import Navbar from './_components/Navbar/Navbar';
import Sobre from './_components/Sobre/Sobre';
import Produtos from './_components/Produtos/Produtos';
import Testmonial from './_components/Testmonial/Testmonial';
import ProductSection from './_components/ProductSection/ProductSection';
import Footer from './_components/Footer/Footer';
import Contato from './_components/Contato/Contato';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pt-16"> {/* Add pt-16 to account for fixed navbar */}
      <Navbar />
      <Hero />
      <Sobre />
      <Produtos/>
      <ProductSection/>
      <Testmonial/>
      <Contato/>
      <Footer/>
    </main>
  );
}
