import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyXSignature } from "@/lib/billplz";

export async function POST(request: NextRequest) {
    try {
        // Parse form data (Billplz sends application/x-www-form-urlencoded)
        const formData = await request.formData();
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        console.log("Billplz callback received:", data);

        const {
            id: billId,
            paid,
            state,
            x_signature,
        } = data;

        // Verify x_signature
        if (x_signature && !verifyXSignature(data, x_signature)) {
            console.error("Invalid x_signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // Find order by billplz bill ID
        const order = await prisma.order.findFirst({
            where: { billplzBillId: billId },
        });

        if (!order) {
            console.error("Order not found for bill:", billId);
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Update order status if paid
        if (paid === "true" && state === "paid") {
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "PAID",
                    paidAt: new Date(),
                },
            });
            console.log("Order marked as PAID:", order.id);
        }

        // Billplz expects 200 OK
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Billplz callback error:", error);
        return NextResponse.json({ error: "Callback failed" }, { status: 500 });
    }
}
