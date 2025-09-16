import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="w-full max-w-sm">
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
          <div className="felx-between gap-4">
            <p>{product.rating} Stars</p>
            {product.stock > 0 ? (
              <p className="font-bold">{product.price}</p>
            ) : (
              <p className="text-destructive">Out Of Stock</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
