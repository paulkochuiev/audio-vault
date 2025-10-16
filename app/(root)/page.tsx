import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={8} />
    </>
  );
};

export default Homepage;
