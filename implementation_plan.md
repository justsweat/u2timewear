# U2timewear Implementation Plan

Single-brand watch store for Malaysia (18-25 year olds) with Billplz payment.

---

## Confirmed Details

| Item | Value |
|------|-------|
| Brand | **U2timewear** |
| Products | 5 watches, each with 1-5 color variations |
| Shipping | RM7 flat rate, **free over RM200** |
| Payment | Billplz (API key provided) |
| Target | Young adults 18-25, seeking uniqueness |
| Design | Dark luxury minimalism with color swatches |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | CSS (dark theme, swatch components) |
| Database | MySQL via Prisma ORM |
| Payment | Billplz V3 REST API |
| Hosting | Hostinger Cloud Business |

---

## Database Schema

#### [NEW] `prisma/schema.prisma`

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String   @db.Text
  basePrice   Decimal  @db.Decimal(10, 2)
  category    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  variations  ProductVariation[]
}

model ProductVariation {
  id          String   @id @default(cuid())
  productId   String
  colorName   String                    // e.g., "Midnight Black"
  colorHex    String                    // e.g., "#1A1A1A"
  images      String   @db.Text         // JSON array of image URLs
  stock       Int      @default(0)
  sku         String   @unique
  product     Product  @relation(fields: [productId], references: [id])
  orderItems  OrderItem[]
}

model Order {
  id              String      @id @default(cuid())
  customerName    String
  customerEmail   String
  customerPhone   String
  shippingAddress String      @db.Text
  city            String
  postcode        String
  status          OrderStatus @default(PENDING)
  subtotal        Decimal     @db.Decimal(10, 2)
  shipping        Decimal     @db.Decimal(10, 2)  // 7.00 or 0.00
  total           Decimal     @db.Decimal(10, 2)
  billplzBillId   String?
  billplzUrl      String?
  paidAt          DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  items           OrderItem[]
}

model OrderItem {
  id          String            @id @default(cuid())
  orderId     String
  variationId String
  quantity    Int
  price       Decimal           @db.Decimal(10, 2)
  order       Order             @relation(fields: [orderId], references: [id])
  variation   ProductVariation  @relation(fields: [variationId], references: [id])
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

## Key Features

### Color Swatches

**Shop Page**: Product cards show swatch dots, clicking changes preview thumbnail.

**Product Page**: Swatches trigger full gallery swap with ring selection indicator.

```
┌─────────────────────────────────────┐
│  ● ● ● ● ●   (clickable swatches)  │
│  ─────         (active underline)  │
└─────────────────────────────────────┘
```

### Shipping Logic

```typescript
const SHIPPING_FLAT = 7.00;
const FREE_SHIPPING_THRESHOLD = 200.00;

function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}
```

---

## Billplz Integration

### Create Bill (Checkout)

```typescript
// POST /api/billplz/create
const response = await fetch('https://www.billplz.com/api/v3/bills', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(BILLPLZ_API_KEY + ':').toString('base64')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    collection_id: BILLPLZ_COLLECTION_ID,
    email: order.customerEmail,
    mobile: order.customerPhone,
    name: order.customerName,
    amount: Math.round(order.total * 100), // in cents
    description: `U2timewear Order #${order.id}`,
    callback_url: `${BASE_URL}/api/billplz/callback`,
    redirect_url: `${BASE_URL}/order/success?id=${order.id}`
  })
});
```

### Webhook Handler

```typescript
// POST /api/billplz/callback
// Verify x_signature using HMAC-SHA256
// Update order status to PAID if paid=true && state=paid
```

---

## Project Structure

```
watch-store/
├── app/
│   ├── page.tsx                    # Hero + featured products
│   ├── shop/page.tsx               # All products with swatches
│   ├── product/[id]/page.tsx       # Detail with variation selector
│   ├── cart/page.tsx               # Cart summary
│   ├── checkout/page.tsx           # Customer details + payment
│   ├── order/success/page.tsx      # Confirmation
│   └── api/
│       ├── products/route.ts
│       ├── orders/route.ts
│       └── billplz/
│           ├── create/route.ts
│           └── callback/route.ts
├── components/
│   ├── ColorSwatch.tsx
│   ├── ProductCard.tsx
│   ├── CartProvider.tsx
│   └── Header.tsx
├── lib/
│   ├── prisma.ts
│   ├── billplz.ts
│   └── shipping.ts
└── prisma/schema.prisma
```

---

## Environment Variables

```env
DATABASE_URL="mysql://user:pass@localhost:3306/u2timewear"

BILLPLZ_API_KEY="e87302fe-8124-41bb-b275-6d02a7beddfc"
BILLPLZ_COLLECTION_ID="your-collection-id"
BILLPLZ_X_SIGNATURE="your-x-signature-key"
BILLPLZ_SANDBOX=true

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

> [!WARNING]
> You still need the **Collection ID** and **X-Signature Key** from your Billplz dashboard.

---

## Verification Plan

1. Create test products with multiple color variations
2. Add to cart, verify swatch selection persists
3. Checkout with subtotal < RM200, confirm RM7 shipping
4. Checkout with subtotal ≥ RM200, confirm free shipping
5. Complete Billplz sandbox payment
6. Verify webhook updates order to PAID

---

## Next Steps

1. [ ] You fill out [brand_guideline.md](file:///C:/Users/mgsxf/.gemini/antigravity/brain/c71c4783-aa20-44f8-8303-ae06d04bd069/brand_guideline.md) (or approve my default dark theme)
2. [ ] You provide Billplz Collection ID + X-Signature Key
3. [ ] I initialize the Next.js project and build
