import crypto from "crypto";

const BILLPLZ_API_URL = process.env.BILLPLZ_SANDBOX === "true"
    ? "https://www.billplz-sandbox.com/api/v3"
    : "https://www.billplz.com/api/v3";

interface CreateBillParams {
    collectionId: string;
    email: string;
    mobile: string;
    name: string;
    amount: number; // in cents
    description: string;
    callbackUrl: string;
    redirectUrl: string;
    reference1?: string;
}

interface BillResponse {
    id: string;
    collection_id: string;
    paid: boolean;
    state: string;
    amount: number;
    paid_amount: number;
    due_at: string;
    email: string;
    mobile: string | null;
    name: string;
    url: string;
    redirect_url: string | null;
    callback_url: string;
    description: string;
}

export async function createBill(params: CreateBillParams): Promise<BillResponse> {
    const apiKey = process.env.BILLPLZ_API_KEY;
    if (!apiKey) {
        throw new Error("BILLPLZ_API_KEY is not configured");
    }

    const auth = Buffer.from(`${apiKey}:`).toString("base64");

    const response = await fetch(`${BILLPLZ_API_URL}/bills`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            collection_id: params.collectionId,
            email: params.email,
            mobile: params.mobile,
            name: params.name,
            amount: params.amount,
            description: params.description,
            callback_url: params.callbackUrl,
            redirect_url: params.redirectUrl,
            reference_1: params.reference1 || "",
            deliver: false,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Billplz API error: ${error}`);
    }

    return response.json();
}

export async function getBill(billId: string): Promise<BillResponse> {
    const apiKey = process.env.BILLPLZ_API_KEY;
    if (!apiKey) {
        throw new Error("BILLPLZ_API_KEY is not configured");
    }

    const auth = Buffer.from(`${apiKey}:`).toString("base64");

    const response = await fetch(`${BILLPLZ_API_URL}/bills/${billId}`, {
        method: "GET",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get bill");
    }

    return response.json();
}

export function verifyXSignature(
    data: Record<string, string>,
    xSignature: string
): boolean {
    const xSignatureKey = process.env.BILLPLZ_X_SIGNATURE;
    if (!xSignatureKey) {
        console.error("BILLPLZ_X_SIGNATURE is not configured");
        return false;
    }

    // Sort keys alphabetically and build the string
    const keys = Object.keys(data).filter(k => k !== "x_signature").sort();
    const sourceString = keys.map(k => `${k}${data[k]}`).join("|");

    const computedSignature = crypto
        .createHmac("sha256", xSignatureKey)
        .update(sourceString)
        .digest("hex");

    return computedSignature === xSignature;
}
