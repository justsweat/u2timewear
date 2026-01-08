import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/shipping";
import styles from "./page.module.css";

interface Props {
    searchParams: Promise<{ id?: string }>;
}

async function getOrder(id: string) {
    const order = await prisma.order.findUnique({
        where: { id },
        include: { items: true },
    });
    return order;
}

export const metadata = {
    title: "Order Confirmed | U2timewear",
};

export default async function OrderSuccessPage({ searchParams }: Props) {
    const { id } = await searchParams;

    if (!id) {
        return (
            <div className={`container ${styles.error}`}>
                <h1>Order Not Found</h1>
                <p>We couldn't find your order.</p>
                <Link href="/shop" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const order = await getOrder(id);

    if (!order) {
        return (
            <div className={`container ${styles.error}`}>
                <h1>Order Not Found</h1>
                <p>We couldn't find your order.</p>
                <Link href="/shop" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const isPaid = order.status === "PAID";

    return (
        <div className={`container ${styles.success}`}>
            <div className={styles.icon}>
                {isPaid ? "✓" : "⏳"}
            </div>

            <h1>{isPaid ? "Thank You!" : "Payment Pending"}</h1>

            <p className={styles.message}>
                {isPaid
                    ? "Your order has been confirmed and is being processed."
                    : "Your payment is being verified. We'll update you shortly."}
            </p>

            <div className={styles.orderInfo}>
                <p>
                    <strong>Order ID:</strong>{" "}
                    <span className={styles.orderId}>#{order.id.slice(-8).toUpperCase()}</span>
                </p>
                <p>
                    <strong>Status:</strong>{" "}
                    <span className={isPaid ? styles.paid : styles.pending}>
                        {order.status}
                    </span>
                </p>
            </div>

            <div className={styles.details}>
                <h2>Order Details</h2>

                <div className={styles.items}>
                    {order.items.map((item: any) => (
                        <div key={item.id} className={styles.item}>
                            <span>
                                {item.productName} ({item.colorName}) × {item.quantity}
                            </span>
                            <span>{formatPrice(Number(item.price) * item.quantity)}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <div className={styles.row}>
                        <span>Subtotal</span>
                        <span>{formatPrice(Number(order.subtotal))}</span>
                    </div>
                    <div className={styles.row}>
                        <span>Shipping</span>
                        <span>
                            {Number(order.shipping) === 0
                                ? "FREE"
                                : formatPrice(Number(order.shipping))}
                        </span>
                    </div>
                    <div className={`${styles.row} ${styles.total}`}>
                        <span>Total</span>
                        <span>{formatPrice(Number(order.total))}</span>
                    </div>
                </div>

                <div className={styles.shipping}>
                    <h3>Shipping To</h3>
                    <p>{order.customerName}</p>
                    <p>{order.shippingAddress}</p>
                    <p>{order.city}, {order.postcode}</p>
                    <p>{order.customerEmail}</p>
                </div>
            </div>

            <Link href="/shop" className="btn btn-primary">
                Continue Shopping
            </Link>
        </div>
    );
}
