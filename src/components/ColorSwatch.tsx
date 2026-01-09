"use client";

import styles from "./ColorSwatch.module.css";

export interface SwatchVariation {
    id: string;
    colorName: string;
    colorHex: string;
}

interface ColorSwatchProps<T extends SwatchVariation> {
    variations: T[];
    selectedId: string;
    onSelect: (variation: T) => void;
    size?: "sm" | "md" | "lg";
}

export default function ColorSwatch<T extends SwatchVariation>({
    variations,
    selectedId,
    onSelect,
    size = "md",
}: ColorSwatchProps<T>) {
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
