"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "./CartProvider";
import MiniCart from "./MiniCart";
import styles from "./Header.module.css";

export default function Header() {
    const { totalItems, toggleCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContent}`}>
                {/* Mobile Hamburger */}
                <button
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    aria-label="Open Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                <Link href="/" className={styles.logo}>
                    U2timewear
                </Link>

                {/* Desktop Nav */}
                <nav className={`${styles.nav} ${styles.desktopNav}`}>
                    <Link href="/shop" className={styles.navLink}>
                        Shop
                    </Link>
                    <Link href="/about" className={styles.navLink}>
                        About
                    </Link>
                </nav>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <>
                        <div className={styles.menuOverlay} onClick={toggleMenu} />
                        <nav className={styles.mobileNav}>
                            <button className={styles.closeMenu} onClick={toggleMenu}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                            <Link href="/" className={styles.mobileNavLink} onClick={toggleMenu}>
                                Home
                            </Link>
                            <Link href="/shop" className={styles.mobileNavLink} onClick={toggleMenu}>
                                Shop
                            </Link>
                            <Link href="/about" className={styles.mobileNavLink} onClick={toggleMenu}>
                                About
                            </Link>
                            <Link href="/shipping" className={styles.mobileNavLink} onClick={toggleMenu}>
                                Shipping Info
                            </Link>
                        </nav>
                    </>
                )}

                <button className={styles.cartBtn} onClick={toggleCart} aria-label="Open Cart">
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
                </button>
            </div>
            <MiniCart />
        </header>
    );
}
