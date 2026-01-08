"use client";

import styles from "./ColorSwatch.module.css";

interface Variation {
    id: string;
    colorName: string;
    colorHex: string;
}

interface ColorSwatchProps {
    variations: Variation[];
    selectedId: string;
    onSelect: (variation: Variation) => void;
    size?: "sm" | "md" | "lg";
}

export default function ColorSwatch({
    variations,
    selectedId,
    onSelect,
    size = "md",
}: ColorSwatchProps) {
    return (
        <div className={styles.container}>
            {variations.map((variation) => (
                <button
                    key={variation.id}
                    className={`${styles.swatch} ${styles[size]} ${selectedId === variation.id ? styles.active : ""
                        }`}
                    style={{ backgroundColor: variation.colorHex }}
                    onClick={() => onSelect(variation)}
                    aria-label={variation.colorName}
                    title={variation.colorName}
                />
            ))}
        </div>
    );
}
