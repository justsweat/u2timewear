"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/shipping";
import styles from "./page.module.css";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, shipping, total, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postcode: "",
    });

    if (items.length === 0) {
        return (
            <div className={`container ${styles.empty}`}>
                <h1>Checkout</h1>
                <p>Your cart is empty.</p>
                <Link href="/shop" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Create order
            const orderRes = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: form.name,
                    customerEmail: form.email,
                    customerPhone: form.phone,
                    shippingAddress: form.address,
                    city: form.city,
                    postcode: form.postcode,
                    items: items.map((item) => ({
                        variationId: item.variationId,
                        quantity: item.quantity,
                        price: item.price,
                        colorName: item.colorName,
                        productName: item.productName,
                    })),
                    subtotal,
                    shipping,
                    total,
                }),
            });

            if (!orderRes.ok) {
                throw new Error("Failed to create order");
            }

            const order = await orderRes.json();

            // Create Billplz bill
            const billRes = await fetch("/api/billplz/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: order.id,
                    email: form.email,
                    phone: form.phone,
                    name: form.name,
                    amount: total,
                    description: `U2timewear Order #${order.id.slice(-8).toUpperCase()}`,
                }),
            });

            if (!billRes.ok) {
                throw new Error("Failed to create payment");
            }

            const bill = await billRes.json();

            // Clear cart and redirect to Billplz
            clearCart();
            window.location.href = bill.url;
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`container ${styles.checkout}`}>
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit} className={styles.layout}>
                <div className={styles.form}>
                    <h2>Shipping Details</h2>

                    <div className={styles.field}>
                        <label className="label" htmlFor="name">Full Name *</label>
                        <input
                            className="input"
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className="label" htmlFor="email">Email *</label>
                            <input
                                className="input"
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label className="label" htmlFor="phone">Phone *</label>
                            <input
                                className="input"
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+60"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className="label" htmlFor="address">Address *</label>
                        <textarea
                            className="input"
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className="label" htmlFor="city">City *</label>
                            <input
                                className="input"
                                type="text"
                                id="city"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label className="label" htmlFor="postcode">Postcode *</label>
                            <input
                                className="input"
                                type="text"
                                id="postcode"
                                name="postcode"
                                value={form.postcode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <p className={styles.note}>
                        🇲🇾 We only ship within Malaysia.
                    </p>
                </div>

                <div className={styles.summary}>
                    <h2>Order Summary</h2>

                    <div className={styles.items}>
                        {items.map((item) => (
                            <div key={item.variationId} className={styles.item}>
                                <span className={styles.itemName}>
                                    {item.productName} ({item.colorName}) × {item.quantity}
                                </span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.totals}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>Shipping</span>
                            <span>
                                {shipping === 0 ? (
                                    <span className={styles.free}>FREE</span>
                                ) : (
                                    formatPrice(shipping)
                                )}
                            </span>
                        </div>
                        <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        className={`btn btn-primary btn-lg ${styles.payBtn}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Pay Now"}
                    </button>

                    <p className={styles.secure}>
                        🔒 Secure payment via Billplz (FPX / Card)
                    </p>
                </div>
            </form>
        </div>
    );
}
