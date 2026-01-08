export const SHIPPING_FLAT = 7.0;
export const FREE_SHIPPING_THRESHOLD = 200.0;

export function calculateShipping(subtotal: number): number {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

export function formatPrice(amount: number): string {
    return `RM ${amount.toFixed(2)}`;
}
