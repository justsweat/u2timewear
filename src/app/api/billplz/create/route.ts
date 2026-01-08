import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createBill } from "@/lib/billplz";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderId, email, phone, name, amount, description } = body;

        // Validate required fields
        if (!orderId || !email || !name || !amount) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const collectionId = process.env.BILLPLZ_COLLECTION_ID;
        if (!collectionId) {
            return NextResponse.json(
                { error: "Billplz not configured" },
                { status: 500 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        // Create Billplz bill
        const bill = await createBill({
            collectionId,
            email,
            mobile: phone || "",
            name,
            amount: Math.round(amount * 100), // Convert to cents
            description: description || `Order #${orderId}`,
            callbackUrl: `${baseUrl}/api/billplz/callback`,
            redirectUrl: `${baseUrl}/order/success?id=${orderId}`,
            reference1: orderId,
        });

        // Update order with Billplz bill ID
        await prisma.order.update({
            where: { id: orderId },
            data: {
                billplzBillId: bill.id,
                billplzUrl: bill.url,
            },
        });

        return NextResponse.json({ url: bill.url, billId: bill.id });
    } catch (error) {
        console.error("Error creating Billplz bill:", error);
        return NextResponse.json(
            { error: "Failed to create payment" },
            { status: 500 }
        );
    }
}
