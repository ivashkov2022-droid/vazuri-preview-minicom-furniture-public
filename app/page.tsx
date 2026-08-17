"use client";

import { FormEvent, useEffect, useState } from "react";

const categories = [
  { name: "Sofas & Seating", image: "/images/category-1.avif" },
  { name: "Kids & Nursery", image: "/images/category-2.avif" },
  { name: "Dining & Bar", image: "/images/category-3.avif" },
  { name: "Decor & Objects", image: "/images/category-4.avif" },
];

const products = [
  { name: "Handwoven Storage Vase", price: "$128.00", sale: "−11%", image: "/images/product-1.webp" },
  { name: "Wooden Cushion Sofa", price: "$980.00", sale: "−10%", image: "/images/product-2.webp" },
  { name: "Textured Lounge Chair", price: "$640.00", sale: "−15%", image: "/images/product-3.webp" },
  { name: "Sculptural Planter", price: "$174.00", sale: "NEW", image: "/images/product-4.webp" },
];

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [prompted, setPrompted] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const closeToEnd = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - window.innerHeight * .45;
      if (closeToEnd && !prompted) {
        setPrompted(true);
        setFormOpen(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prompted]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <section className="hero" id="top">
        <header className="topbar">
          <a className="brand" href="#top" aria-label="Modo home">
            <span className="brand-mark">⌂</span><b>MODO</b>
          </a>
          <button className="menu" aria-label="Open menu"><span>☰</span> MENU</button>
          <div className="search">
            <button>ALL CATEGORIES <span>⌄</span></button>
            <input aria-label="Search catalogue" placeholder="ENTER YOUR KEYWORD" />
            <button className="search-button" onClick={() => setFormOpen(true)}>SEARCH <span>⌕</span></button>
          </div>
          <nav className="account" aria-label="Account links">
            <button onClick={() => setFormOpen(true)}>♙ <span>Account</span></button>
            <a href="#collections">☆ <span>Wishlist</span></a>
            <a href="#collections">▱ <span>Cart</span></a>
          </nav>
        </header>

        <div className="hero-copy">
          <p><i /> HANDCRAFTED EXCELLENCE</p>
          <h1>Transform your home<br />with a wooden sofa</h1>
          <a href="#collections">LEARN MORE <span>↗</span></a>
        </div>
        <div className="hero-index"><button aria-label="Previous slide">‹</button><b>02</b><i /><span>03</span><button aria-label="Next slide">›</button></div>
      </section>

      <section className="collections" id="collections">
        <div className="benefits" aria-label="Store benefits">
          <p><b>⌘</b> FREE INSTALLATION</p>
          <p><b>▰</b> FREE DELIVERY ON ORDERS OVER $200</p>
          <p><b>↻</b> 30 DAY MONEY BACK GUARANTEE</p>
        </div>
        <div className="collection-head"><p>EXPLORE BY ROOM</p><span>CURATED FOR THE WAY YOU LIVE</span></div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <article className="category-card" key={category.name}>
              <img src={category.image} alt={category.name} />
              <div><small>0{index + 1}</small><h2>{category.name}</h2><button onClick={() => setFormOpen(true)}>SHOP NOW ↗</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="products">
        <header className="products-head">
          <div><h2>Handpicked elegance</h2><i /></div>
          <p>TIMELESS DESIGN FOR YOUR HOME</p>
          <div className="product-nav"><button aria-label="Previous products">←</button><b /><i /><i /><i /><button aria-label="Next products">→</button></div>
        </header>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product" key={product.name}>
              <div className="product-image">
                <span>{product.sale}</span>
                <button aria-label={`Save ${product.name}`}>☆</button>
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-meta"><div><h3>{product.name}</h3><p>{product.price}</p></div><button onClick={() => setFormOpen(true)}>＋</button></div>
            </article>
          ))}
        </div>
        <div className="catalogue-cta" id="contact"><p>Need help choosing the right piece?</p><button onClick={() => setFormOpen(true)}>GET THE FULL CATALOGUE ↗</button></div>
      </section>

      {formOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
          <button className="modal-backdrop" onClick={() => setFormOpen(false)} aria-label="Close form" />
          <div className="form-card">
            <button className="modal-close" onClick={() => setFormOpen(false)} aria-label="Close form">×</button>
            <div className="form-visual"><span>MODO / 2026</span><h2>Objects for<br />a quieter home.</h2><p>Private catalogue · 48 selected pieces</p></div>
            <form onSubmit={submit}>
              {sent ? (
                <div className="success"><span>✓</span><h2>Thank you.</h2><p>The catalogue request is ready. Our stylist will contact you shortly.</p><button type="button" onClick={() => setFormOpen(false)}>RETURN TO COLLECTION</button></div>
              ) : (
                <>
                  <p className="eyebrow">PERSONAL SELECTION</p>
                  <h2 id="form-title">Get the full<br />MODO catalogue</h2>
                  <p>Leave your details and we’ll send the complete collection with prices and availability.</p>
                  <label>YOUR NAME<input name="name" required placeholder="Name" /></label>
                  <label>PHONE OR EMAIL<input name="contact" required placeholder="Contact" /></label>
                  <button type="submit">SEND MY CATALOGUE <span>↗</span></button>
                  <small>By sending, you agree to be contacted about this collection.</small>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
