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
    <main className="flex min-h-screen flex-col">
      <Navbar />
      {/* Adicione um padding-top para compensar o navbar fixo */}
      <div className="pt-16 md:pt-20">
        <section id="home" className="scroll-mt-16 md:scroll-mt-20">
          <Hero />
        </section>
        <section id="sobre" className="scroll-mt-16 md:scroll-mt-20">
          <Sobre />
        </section>
        <section id="produtos" className="scroll-mt-16 md:scroll-mt-20">
          <Produtos/>
        </section>
        <section id="product-section">
          <ProductSection/>
        </section>
        <section id="testimonial" className="scroll-mt-16 md:scroll-mt-20">
          <Testmonial/>
        </section>
        <section id="contato" className="scroll-mt-16 md:scroll-mt-20">
          <Contato/>
        </section>
        <Footer/>
      </div>
    </main>
  );
}
