export default function ShippingPage() {
    return (
        <div className="container py-3xl">
            <h1 className="mb-lg">Shipping Information</h1>
            <div className="card" style={{ padding: 'var(--space-2xl)' }}>
                <h3 className="mb-sm">Domestic Shipping (Malaysia) 🇲🇾</h3>
                <p>
                    We currently ship exclusively within Malaysia. We strive to process
                    and dispatch all orders within 1-2 business days.
                </p>

                <div className="mt-lg">
                    <h4>Shipping Rates</h4>
                    <ul style={{ paddingLeft: 'var(--space-xl)', marginTop: 'var(--space-sm)' }}>
                        <li><strong>Flat Rate:</strong> RM 7.00 for all orders within Malaysia.</li>
                        <li><strong>Free Shipping:</strong> Automatically applied to all orders above <strong>RM 200.00</strong>.</li>
                    </ul>
                </div>

                <div className="mt-lg" style={{ backgroundColor: 'var(--color-background)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                    <h4>Delivery Times</h4>
                    <p style={{ marginBottom: 0 }}>
                        • Peninsular Malaysia: 2-4 business days<br />
                        • East Malaysia (Sabah & Sarawak): 3-7 business days
                    </p>
                </div>

                <div className="mt-lg">
                    <h4>Tracking Your Order</h4>
                    <p>
                        Once your order is shipped, you will receive an email with your
                        tracking number. You can use this to monitor your delivery status.
                    </p>
                </div>
            </div>
        </div>
    );
}
