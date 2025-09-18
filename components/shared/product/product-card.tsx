import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <Link href={`/product/${product.slug}`}>
        <CardHeader className="p-0 items-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority
          />
        </CardHeader>
        <CardContent className="p-4 grid gap-4">
          <div className="text-xs">{product.brand}</div>
          <h2 className="text-sm font-medium">{product.name}</h2>
          <div className="flex-between gap-4">
            <p>{product.rating} Stars</p>
            {product.stock > 0 ? (
              <ProductPrice value={Number(product.price)} />
            ) : (
              <p className="text-destructive">Out Of Stock</p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
