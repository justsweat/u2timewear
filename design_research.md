# U2timewear Design Research

Target: Young adults aged 18-25 seeking watches that express their uniqueness.

---

## Gen Z Shopping Behavior

| Insight | Design Implication |
|---------|-------------------|
| 74% shop on mobile | **Mobile-first** design, thumb-friendly navigation |
| Value authenticity | Show brand story, avoid stock imagery |
| Demand speed | Fast load times, streamlined checkout |
| Visual-first discovery | High-impact hero images, video backgrounds |
| Seek uniqueness | Emphasize limited editions, personalization |

---

## Recommended Visual Direction

### **Dark Luxury Minimalism**

Perfect for young adults who want something premium but not "old luxury."

```
┌─────────────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓                                               ▓  │
│  ▓    U2TIMEWEAR          [Shop] [About] [Cart] ▓  │
│  ▓                                               ▓  │
│  ▓         ╭──────────────────╮                  ▓  │
│  ▓         │   ⌚ WATCH       │     YOUR TIME.   ▓  │
│  ▓         │   HERO IMAGE    │     YOUR WAY.    ▓  │
│  ▓         │                 │                  ▓  │
│  ▓         ╰──────────────────╯     [SHOP NOW]  ▓  │
│  ▓                                               ▓  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│                                                     │
│  ○ Black   ○ Silver   ○ Rose Gold   ○ Blue          │
│  (Color swatches with subtle hover glow)            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Color Direction

| Element | Suggestion | Hex |
|---------|-----------|-----|
| Background | Deep charcoal | `#0D0D0D` |
| Surface | Dark gray | `#1A1A1A` |
| Accent | Champagne gold | `#C9A962` |
| Text | Off-white | `#F5F5F5` |
| Muted | Gray | `#6B6B6B` |

### Typography Direction

| Element | Font | Vibe |
|---------|------|------|
| Logo/Headings | **Space Grotesk** | Modern, geometric, bold |
| Body | **Inter** | Clean, highly readable |

---

## Key Layout Patterns

### Homepage
- Full-screen hero with watch close-up
- Floating navigation (transparent → solid on scroll)
- Product grid with color swatch previews
- Sticky "Add to Cart" on mobile

### Product Page
- Large product image gallery (swipe on mobile)
- **Color swatches** with immediate image switch
- Sticky price + CTA bar
- Accordion for specs/shipping

### Checkout
- Single-page checkout
- Progress indicator (3 steps max)
- Payment icons visible early (trust signals)

---

## Swatch Implementation

For color variations, swatches should:

```
┌─────────────────────────────────────────────┐
│                                             │
│    ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│    │ ●  │ │ ●  │ │ ●  │ │ ●  │ │ ●  │       │
│    └────┘ └────┘ └────┘ └────┘ └────┘       │
│   Black  Silver  Gold  Navy  Burgundy       │
│    ────                                     │
│   (selected = underline + ring effect)      │
│                                             │
└─────────────────────────────────────────────┘
```

- Show on shop page (preview thumbnails)
- Show on product page (full image swap)
- Persist selection through add-to-cart

---

## Inspiration References

| Brand | Why |
|-------|-----|
| **MVMT Watches** | Clean, dark aesthetic, young audience |
| **Daniel Wellington** | Minimalist product photography |
| **Braun (watches)** | Bauhaus simplicity |
| **Apple Watch Studio** | Color picker UX for variations |

---

## Mobile Priorities

1. **Thumb zone navigation** - CTA buttons in easy reach
2. **Swipeable galleries** - Image carousels for products
3. **Bottom sheet cart** - Quick add without leaving page
4. **Sticky checkout bar** - Always visible on product pages
