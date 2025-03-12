import { Hero } from './_components/Hero/Hero';
import Navbar from './_components/Navbar/Navbar';
import Sobre from './_components/Sobre/Sobre';
import Produtos from './_components/Produtos/Produtos';
import Testmonial from './_components/Testmonial/Testmonial';
import ProductSection from './_components/ProductSection/ProductSection';
import Footer from './_components/Footer/Footer';

export default function Home() {
  return (
     <>
      <Navbar />
      <Hero />
      <Sobre />
      <Produtos/>
      <ProductSection/>
      <Testmonial/>
      <Footer/>
    </>

    
  );
}
