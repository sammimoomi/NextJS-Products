import Image from "next/image";
import Header from "./components/Header";
import ProductsData from "./components/Products";
export default function Home() {
  return (
    <>
      <Header />
      <ProductsData />
    </>
  );
}
