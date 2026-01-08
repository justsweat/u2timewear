"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import ColorSwatch from "@/components/ColorSwatch";
import styles from "./page.module.css";

interface Variation {
    id: string;
    colorName: string;
    colorHex: string;
    images: string;
    stock: number;
}

interface ProductDetailProps {
    product: {
        id: string;
        name: string;
        description: string;
        basePrice: number;
        variations: Variation[];
    };
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedVariation, setSelectedVariation] = useState(product.variations[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addItem } = useCart();

    const parseImages = (imagesJson: string): string[] => {
        try {
            return JSON.parse(imagesJson) || ["/images/placeholder.jpg"];
        } catch {
            return ["/images/placeholder.jpg"];
        }
    };

    const images = parseImages(selectedVariation.images);

    const handleAddToCart = () => {
        addItem({
            variationId: selectedVariation.id,
            productId: product.id,
            productName: product.name,
            colorName: selectedVariation.colorName,
            colorHex: selectedVariation.colorHex,
            price: product.basePrice,
            image: images[0],
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleVariationChange = (variation: Variation) => {
        setSelectedVariation(variation);
        setCurrentImageIndex(0);
    };

    return (
        <div className={`container ${styles.product}`}>
            <div className={styles.gallery}>
                <div className={styles.mainImage}>
                    <Image
                        src={images[currentImageIndex]}
                        alt={`${product.name} - ${selectedVariation.colorName}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={styles.image}
                        priority
                    />
                </div>
                {images.length > 1 && (
                    <div className={styles.thumbnails}>
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                className={`${styles.thumbnail} ${idx === currentImageIndex ? styles.active : ""}`}
                                onClick={() => setCurrentImageIndex(idx)}
                            >
                                <Image
                                    src={img}
                                    alt={`View ${idx + 1}`}
                                    fill
                                    sizes="80px"
                                    className={styles.thumbImage}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.info}>
                <h1 className={styles.name}>{product.name}</h1>

                <div className={styles.price}>
                    <span className={styles.currency}>RM</span>
                    {product.basePrice.toFixed(2)}
                </div>

                <div className={styles.colorSection}>
                    <p className={styles.colorLabel}>
                        Color: <strong>{selectedVariation.colorName}</strong>
                    </p>
                    <ColorSwatch
                        variations={product.variations}
                        selectedId={selectedVariation.id}
                        onSelect={handleVariationChange}
                        size="lg"
                    />
                </div>

                <div className={styles.stock}>
                    {selectedVariation.stock > 0 ? (
                        <span className={styles.inStock}>✓ In Stock</span>
                    ) : (
                        <span className={styles.outOfStock}>Out of Stock</span>
                    )}
                </div>

                <button
                    className={`btn btn-primary btn-lg ${styles.addBtn}`}
                    onClick={handleAddToCart}
                    disabled={selectedVariation.stock <= 0}
                >
                    {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
                </button>

                <div className={styles.shipping}>
                    <p>🚚 Free shipping on orders over RM200</p>
                    <p>📦 Flat rate RM7 shipping across Malaysia</p>
                </div>

                <div className={styles.description}>
                    <h3>Description</h3>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
}
