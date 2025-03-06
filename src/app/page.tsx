import { Hero } from './_components/Hero/Hero';
import Navbar from './_components/Navbar/Navbar';
import Sobre from './_components/Sobre/Sobre';
import Produtos from './_components/Produtos/Produtos';

export default function Home() {
  return (
     <>
      <Navbar />
      <Hero />
      <Sobre />
      <Produtos/>
    </>
  );
}
