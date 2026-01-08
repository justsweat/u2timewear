import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetail from "./ProductDetail";

interface Props {
    params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
    const product = await prisma.product.findUnique({
        where: { id },
        include: { variations: true },
    });
    return product;
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) return { title: "Product Not Found" };
    return {
        title: `${product.name} | U2timewear`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <ProductDetail
            product={{
                id: product.id,
                name: product.name,
                description: product.description,
                basePrice: Number(product.basePrice),
                variations: product.variations.map((v) => ({
                    id: v.id,
                    colorName: v.colorName,
                    colorHex: v.colorHex,
                    images: v.images,
                    stock: v.stock,
                })),
            }}
        />
    );
}
