"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ColorSwatch from "./ColorSwatch";
import styles from "./ProductCard.module.css";

interface Variation {
    id: string;
    colorName: string;
    colorHex: string;
    images: string;
}

interface ProductCardProps {
    id: string;
    name: string;
    basePrice: number;
    variations: Variation[];
}

export default function ProductCard({
    id,
    name,
    basePrice,
    variations,
}: ProductCardProps) {
    const [selectedVariation, setSelectedVariation] = useState(variations[0]);

    // Parse images JSON safely
    const getFirstImage = (imagesJson: string): string => {
        try {
            const images = JSON.parse(imagesJson);
            return images[0] || "/images/placeholder.jpg";
        } catch {
            return "/images/placeholder.jpg";
        }
    };

    const currentImage = getFirstImage(selectedVariation.images);

    return (
        <div className={styles.card}>
            <Link href={`/product/${id}`} className={styles.imageLink}>
                <div className={styles.imageContainer}>
                    <Image
                        src={currentImage}
                        alt={`${name} - ${selectedVariation.colorName}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 280px"
                        className={styles.image}
                    />
                </div>
            </Link>

            <div className={styles.content}>
                <Link href={`/product/${id}`} className={styles.name}>
                    {name}
                </Link>

                <div className={styles.swatches}>
                    <ColorSwatch
                        variations={variations}
                        selectedId={selectedVariation.id}
                        onSelect={setSelectedVariation}
                        size="sm"
                    />
                </div>

                <div className={styles.priceRow}>
                    <span className={styles.price}>
                        <span className={styles.currency}>RM</span>
                        {basePrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}
