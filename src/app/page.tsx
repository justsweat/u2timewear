import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { variations: true },
    take: 4,
  });
  return products;
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Your Time.<br />
            <span className={styles.heroAccent}>Your Way.</span>
          </h1>
          <p className={styles.heroText}>
            Express yourself with watches made for those who embrace their individuality.
          </p>
          <Link href="/shop" className={`btn btn-primary btn-lg ${styles.heroBtn}`}>
            Shop Now
          </Link>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.heroImagePlaceholder}>
            {/* Replace with actual hero image */}
            <span>⌚</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`container ${styles.features}`}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🇲🇾</span>
          <h3>Malaysia Only</h3>
          <p>Fast delivery across Malaysia</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🚚</span>
          <h3>Free Shipping</h3>
          <p>On orders over RM200</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>💳</span>
          <h3>Secure Payment</h3>
          <p>FPX & card via Billplz</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`container ${styles.featured}`}>
        <div className={styles.sectionHeader}>
          <h2>Featured Watches</h2>
          <Link href="/shop" className={styles.viewAll}>
            View All →
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                basePrice={Number(product.basePrice)}
                variations={product.variations.map((v) => ({
                  id: v.id,
                  colorName: v.colorName,
                  colorHex: v.colorHex,
                  images: v.images,
                }))}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No featured products yet. Add products to get started!</p>
            <Link href="/shop" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Uniquely You</h2>
          <p>Find a watch that speaks to who you are.</p>
          <Link href="/shop" className="btn btn-accent btn-lg">
            Explore Collection
          </Link>
        </div>
      </section>
    </>
  );
}
