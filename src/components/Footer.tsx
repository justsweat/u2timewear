import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContent}`}>
                <div className={styles.brand}>
                    <span className={styles.logo}>U2timewear</span>
                    <p className={styles.tagline}>Uniquely You</p>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Shop</h4>
                        <Link href="/shop" className={styles.link}>All Watches</Link>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Help</h4>
                        <Link href="/shipping" className={styles.link}>Shipping</Link>
                        <Link href="/contact" className={styles.link}>Contact</Link>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} U2timewear. All rights reserved.
                    </p>
                    <p className={styles.shipping}>
                        Free shipping on orders over RM200 🇲🇾
                    </p>
                </div>
            </div>
        </footer>
    );
}
