import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Clear existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productVariation.deleteMany();
    await prisma.product.deleteMany();

    // Create 5 sample products with variations
    const products = [
        {
            name: "Aurora Classic",
            description: "A timeless classic with a modern twist. The Aurora Classic features a minimalist dial with elegant rose gold accents, perfect for those who appreciate subtle sophistication. Water-resistant up to 30m with a genuine leather strap.",
            basePrice: 189.00,
            featured: true,
            variations: [
                { colorName: "Midnight Black", colorHex: "#1A1A1A", sku: "AUR-BLK-001", stock: 10 },
                { colorName: "Rose Gold", colorHex: "#B76E79", sku: "AUR-RSG-001", stock: 8 },
                { colorName: "Silver Moon", colorHex: "#C0C0C0", sku: "AUR-SLV-001", stock: 12 },
            ],
        },
        {
            name: "Luna Petite",
            description: "Delicate and feminine, the Luna Petite is designed for the modern woman who values elegance. Features a slim 28mm case, sapphire crystal, and interchangeable straps. Perfect for both everyday wear and special occasions.",
            basePrice: 159.00,
            featured: true,
            variations: [
                { colorName: "Blush Pink", colorHex: "#FFB6C1", sku: "LUN-PNK-001", stock: 15 },
                { colorName: "Pearl White", colorHex: "#F5F5F5", sku: "LUN-WHT-001", stock: 10 },
                { colorName: "Lavender Dream", colorHex: "#E6E6FA", sku: "LUN-LAV-001", stock: 7 },
                { colorName: "Champagne", colorHex: "#F7E7CE", sku: "LUN-CHP-001", stock: 9 },
            ],
        },
        {
            name: "Nova Bold",
            description: "Make a statement with the Nova Bold. Featuring a striking 38mm case with a textured dial and vibrant color options. Built for those who aren't afraid to stand out. Japanese quartz movement with 2-year warranty.",
            basePrice: 219.00,
            featured: true,
            variations: [
                { colorName: "Ocean Teal", colorHex: "#008080", sku: "NOV-TEL-001", stock: 6 },
                { colorName: "Coral Sunset", colorHex: "#FF6F61", sku: "NOV-COR-001", stock: 8 },
                { colorName: "Forest Green", colorHex: "#228B22", sku: "NOV-GRN-001", stock: 5 },
                { colorName: "Midnight Blue", colorHex: "#191970", sku: "NOV-BLU-001", stock: 10 },
                { colorName: "Burgundy Wine", colorHex: "#722F37", sku: "NOV-BRG-001", stock: 4 },
            ],
        },
        {
            name: "Stellar Mesh",
            description: "Contemporary style meets comfort. The Stellar Mesh features a sleek stainless steel mesh band and sunburst dial. Lightweight yet durable, it's the perfect everyday companion for the style-conscious individual.",
            basePrice: 249.00,
            featured: true,
            variations: [
                { colorName: "Silver Steel", colorHex: "#C0C0C0", sku: "STL-SLV-001", stock: 12 },
                { colorName: "Gold Gleam", colorHex: "#FFD700", sku: "STL-GLD-001", stock: 7 },
                { colorName: "Rose Blush", colorHex: "#E0BFB8", sku: "STL-RSE-001", stock: 9 },
            ],
        },
        {
            name: "Cosmos Minimal",
            description: "Less is more. The Cosmos Minimal embodies pure simplicity with its clean lines and uncluttered dial. Featuring a 32mm case, Swiss movement, and premium leather strap. For those who appreciate understated elegance.",
            basePrice: 179.00,
            featured: false,
            variations: [
                { colorName: "Pure White", colorHex: "#FFFFFF", sku: "COS-WHT-001", stock: 15 },
                { colorName: "Charcoal Gray", colorHex: "#36454F", sku: "COS-GRY-001", stock: 11 },
            ],
        },
    ];

    for (const product of products) {
        const { variations, ...productData } = product;

        await prisma.product.create({
            data: {
                ...productData,
                variations: {
                    create: variations.map((v) => ({
                        ...v,
                        images: JSON.stringify(["/images/placeholder.jpg"]),
                    })),
                },
            },
        });
    }

    console.log("Seeded 5 products with variations!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
