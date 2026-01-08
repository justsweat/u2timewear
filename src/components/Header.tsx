"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import styles from "./Header.module.css";

export default function Header() {
    const { totalItems } = useCart();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContent}`}>
                <Link href="/" className={styles.logo}>
                    U2timewear
                </Link>

                <nav className={styles.nav}>
                    <Link href="/shop" className={styles.navLink}>
                        Shop
                    </Link>
                    <Link href="/about" className={styles.navLink}>
                        About
                    </Link>
                </nav>

                <Link href="/cart" className={styles.cartLink}>
                    <svg
                        className={styles.cartIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M6 6h15l-1.5 9h-12z" />
                        <circle cx="9" cy="20" r="1" />
                        <circle cx="18" cy="20" r="1" />
                        <path d="M6 6L5 3H2" />
                    </svg>
                    {totalItems > 0 && (
                        <span className={styles.cartBadge}>{totalItems}</span>
                    )}
                </Link>
            </div>
        </header>
    );
}
