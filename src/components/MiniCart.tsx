"use client";

import { useCart } from "./CartProvider";
import Image from "next/image";
import Link from "next/link";
import styles from "./MiniCart.module.css";
import { useEffect } from "react";

export default function MiniCart() {
    const { items, removeItem, updateQuantity, subtotal, isCartOpen, toggleCart } = useCart();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className={styles.overlay} onClick={toggleCart}>
            <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Your Cart</h2>
                    <button className={styles.closeBtn} onClick={toggleCart}>
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
                </div>

                <div className={styles.items}>
                    {items.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Your cart is empty.</p>
                            <button className="btn btn-primary" onClick={toggleCart}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.variationId} className={styles.item}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={item.image}
                                        alt={item.productName}
                                        fill
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.details}>
                                    <div>
                                        <h3>{item.productName}</h3>
                                        <p className={styles.variant}>{item.colorName}</p>
                                    </div>
                                    <p className={styles.price}>RM {item.price.toFixed(2)}</p>
                                </div>
                                <div className={styles.controls}>
                                    <div className={styles.quantity}>
                                        <button onClick={() => updateQuantity(item.variationId, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.variationId, item.quantity + 1)}>+</button>
                                    </div>
                                    <button
                                        className={styles.remove}
                                        onClick={() => removeItem(item.variationId)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.subtotal}>
                            <span>Subtotal</span>
                            <span>RM {subtotal.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" className="btn btn-primary btn-full" onClick={toggleCart}>
                            Checkout Now
                        </Link>
                        <Link href="/cart" className={styles.viewCart} onClick={toggleCart}>
                            View Full Cart
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
