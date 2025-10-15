"use client";

import { useToast } from "@/hooks/use-toast";
import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { InsertProductInput, Product, UpdateProductInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";

type ProductFormValues = InsertProductInput | UpdateProductInput;

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const schema = type === "Update" ? updateProductSchema : insertProductSchema;

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(schema) as unknown as Resolver<ProductFormValues>,
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-col gap-5 md:flex-row ">
          {/* Name */}
          {/* Slug */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row ">
          {/* Category */}
          {/* Brand */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row ">
          {/* Price */}
          {/* Stock */}
        </div>
        <div className="upload-field flex flex-col gap-5 md:flex-row ">
          {/* Images */}
        </div>
        <div className="upload-field">{/* featured */}</div>
        <div>{/* description */}</div>
        <div>{/* Submit */}</div>
      </form>
    </Form>
  );
};

export default ProductForm;
