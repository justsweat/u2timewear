import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

async function getAllProducts() {
    const products = await prisma.product.findMany({
        include: { variations: true },
        orderBy: { createdAt: "desc" },
    });
    return products;
}

export const metadata = {
    title: "Shop All Watches | U2timewear",
    description: "Browse our collection of unique watches for the expressive you.",
};

export default async function ShopPage() {
    const products = await getAllProducts();

    return (
        <div className={`container ${styles.shop}`}>
            <header className={styles.header}>
                <h1>All Watches</h1>
                <p className={styles.count}>{products.length} products</p>
            </header>

            {products.length > 0 ? (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            basePrice={Number(product.basePrice)}
                            variations={product.variations.map((v) => ({
                                id: v.id,
                                colorName: v.colorName,
                                colorHex: v.colorHex,
                                images: v.images,
                            }))}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <p>No products available yet.</p>
                    <p className={styles.hint}>Add products via the database to get started.</p>
                </div>
            )}
        </div>
    );
}
