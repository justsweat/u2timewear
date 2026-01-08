import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateShipping } from "@/lib/shipping";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            city,
            postcode,
            items,
            subtotal,
            shipping,
            total,
        } = body;

        // Validate required fields
        if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !city || !postcode) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        // Verify shipping calculation
        const calculatedShipping = calculateShipping(subtotal);
        if (calculatedShipping !== shipping) {
            return NextResponse.json(
                { error: "Invalid shipping amount" },
                { status: 400 }
            );
        }

        // Create order with items
        const order = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                customerPhone,
                shippingAddress,
                city,
                postcode,
                subtotal,
                shipping,
                total,
                status: "PENDING",
                items: {
                    create: items.map((item: {
                        variationId: string;
                        quantity: number;
                        price: number;
                        colorName: string;
                        productName: string;
                    }) => ({
                        variationId: item.variationId,
                        quantity: item.quantity,
                        price: item.price,
                        colorName: item.colorName,
                        productName: item.productName,
                    })),
                },
            },
            include: { items: true },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(order);
    }

    return NextResponse.json({ error: "Order ID required" }, { status: 400 });
}
