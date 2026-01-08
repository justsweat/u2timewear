"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/shipping";
import styles from "./page.module.css";

export default function CartPage() {
    const { items, updateQuantity, removeItem, subtotal, shipping, total } = useCart();

    if (items.length === 0) {
        return (
            <div className={`container ${styles.empty}`}>
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
                <Link href="/shop" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className={`container ${styles.cart}`}>
            <h1>Your Cart</h1>

            <div className={styles.layout}>
                <div className={styles.items}>
                    {items.map((item) => (
                        <div key={item.variationId} className={styles.item}>
                            <div className={styles.itemImage}>
                                <Image
                                    src={item.image}
                                    alt={item.productName}
                                    fill
                                    sizes="100px"
                                    className={styles.image}
                                />
                            </div>

                            <div className={styles.itemInfo}>
                                <h3 className={styles.itemName}>{item.productName}</h3>
                                <div className={styles.itemColor}>
                                    <span
                                        className={styles.colorDot}
                                        style={{ backgroundColor: item.colorHex }}
                                    />
                                    {item.colorName}
                                </div>
                                <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                            </div>

                            <div className={styles.itemQuantity}>
                                <button
                                    className={styles.qtyBtn}
                                    onClick={() => updateQuantity(item.variationId, item.quantity - 1)}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className={styles.qty}>{item.quantity}</span>
                                <button
                                    className={styles.qtyBtn}
                                    onClick={() => updateQuantity(item.variationId, item.quantity + 1)}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <div className={styles.itemTotal}>
                                {formatPrice(item.price * item.quantity)}
                            </div>

                            <button
                                className={styles.removeBtn}
                                onClick={() => removeItem(item.variationId)}
                                aria-label="Remove item"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <h2>Order Summary</h2>

                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>
                            {shipping === 0 ? (
                                <span className={styles.freeShipping}>FREE</span>
                            ) : (
                                formatPrice(shipping)
                            )}
                        </span>
                    </div>

                    {subtotal < 200 && (
                        <p className={styles.shippingHint}>
                            Add {formatPrice(200 - subtotal)} more for free shipping!
                        </p>
                    )}

                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>

                    <Link href="/checkout" className={`btn btn-primary btn-lg ${styles.checkoutBtn}`}>
                        Proceed to Checkout
                    </Link>

                    <Link href="/shop" className={styles.continueLink}>
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
