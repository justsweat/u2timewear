"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
    variationId: string;
    productId: string;
    productName: string;
    colorName: string;
    colorHex: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (variationId: string) => void;
    updateQuantity: (variationId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
    shipping: number;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING_FLAT = 7.0;
const FREE_SHIPPING_THRESHOLD = 200.0;

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("u2timewear-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart:", e);
            }
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem("u2timewear-cart", JSON.stringify(items));
        }
    }, [items, isHydrated]);

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.variationId === newItem.variationId);
            if (existing) {
                return prev.map((item) =>
                    item.variationId === newItem.variationId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
    };

    const removeItem = (variationId: string) => {
        setItems((prev) => prev.filter((item) => item.variationId !== variationId));
    };

    const updateQuantity = (variationId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(variationId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.variationId === variationId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    const total = subtotal + shipping;

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
                shipping,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
