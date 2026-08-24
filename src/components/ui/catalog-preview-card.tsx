"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Check, Code2 } from "lucide-react";

interface CatalogPreviewCardProps {
  className?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  sku: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  rating: number;
  reviews: number;
  badges: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "ort-knee-pro",
    name: "Orteza Stabilizująca Kolano PRO",
    category: "medical",
    price: "289 PLN",
    sku: "REH4-KN-PRO-2024",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Czarny", hex: "#1a1a2e" },
      { name: "Granatowy", hex: "#16213e" },
      { name: "Szary", hex: "#495057" },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 142,
    badges: ["Bestseller", "CE Certified"],
  },
  {
    id: "brace-wrist",
    name: "Stabilizator Nadgarstka Active",
    category: "sport",
    price: "149 PLN",
    sku: "REH4-WR-ACT-2024",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Czarny", hex: "#0d1117" },
      { name: "Niebieski", hex: "#1d4ed8" },
    ],
    inStock: true,
    rating: 4.6,
    reviews: 89,
    badges: ["New 2024"],
  },
  {
    id: "belt-lumbar",
    name: "Pas Lędźwiowy Comfort Plus",
    category: "rehabilitation",
    price: "199 PLN",
    sku: "REH4-LB-CMP-2024",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Czarny", hex: "#111827" },
      { name: "Beżowy", hex: "#92400e" },
    ],
    inStock: false,
    rating: 4.9,
    reviews: 203,
    badges: ["Top Rated", "Medical Grade"],
  },
];

const CATEGORIES = [
  { id: "all", label: "Wszystkie", count: 3 },
  { id: "medical", label: "Ortezy Medyczne", count: 1 },
  { id: "sport", label: "Sport & Active", count: 1 },
  { id: "rehabilitation", label: "Rehabilitacja", count: 1 },
];

export function CatalogPreviewCard({ className = "" }: CatalogPreviewCardProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [showSchema, setShowSchema] = useState(false);

  const filteredProducts = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className={`rounded-2xl overflow-hidden ${className}`}>
      {/* ── Top Filter Bar ──────────────────────────────────── */}
      <div className="flex items-center gap-1.5 p-3 bg-slate-950/90 border-b border-white/[0.06] overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              const first = cat.id === "all" ? PRODUCTS[0] : PRODUCTS.find((p) => p.category === cat.id);
              if (first) setSelectedProduct(first);
            }}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 min-h-[320px]">
        {/* ── Product List (Left Rail) ─────────────────────── */}
        <div className="col-span-5 border-r border-white/[0.06] bg-slate-950/70 p-2.5 overflow-y-auto space-y-1.5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.button
                key={product.id}
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedSize("M");
                  setSelectedColorIdx(0);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${
                  selectedProduct.id === product.id
                    ? "bg-indigo-500/15 border border-indigo-500/40"
                    : "hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag size={12} className="text-indigo-400 shrink-0" />
                  <span className="text-[11px] font-bold text-white truncate">{product.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{product.price}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    product.inStock ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  }`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Product Detail (Right Panel) ────────────────── */}
        <div className="col-span-7 p-4 bg-slate-950/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Badges */}
              <div className="flex items-center gap-1.5 mb-3">
                {selectedProduct.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 tracking-wider"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Name & Price */}
              <h4 className="text-sm font-bold text-white tracking-tight mb-0.5">{selectedProduct.name}</h4>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-extrabold font-mono text-cyan-400">{selectedProduct.price}</span>
                <span className="text-[10px] font-mono text-slate-500">SKU: {selectedProduct.sku}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className={i < Math.floor(selectedProduct.rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedProduct.rating} ({selectedProduct.reviews} opinii)
                </span>
              </div>

              {/* Size Selector */}
              <div className="mb-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 block">Rozmiar:</span>
                <div className="flex items-center gap-1.5">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-8 h-8 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-indigo-600 text-white border border-indigo-400 shadow-sm"
                          : "bg-slate-800 text-slate-400 border border-white/[0.08] hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 block">
                  Kolor: {selectedProduct.colors[selectedColorIdx]?.name}
                </span>
                <div className="flex items-center gap-2">
                  {selectedProduct.colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIdx(i)}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColorIdx === i ? "border-cyan-400 scale-110" : "border-white/[0.15] hover:border-white/30"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColorIdx === i && (
                        <Check size={12} className="text-white mx-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schema.org Toggle */}
              <button
                onClick={() => setShowSchema(!showSchema)}
                className="w-full py-2 rounded-xl bg-slate-800 border border-white/[0.08] text-[10px] font-mono text-slate-300 hover:text-white hover:border-indigo-500/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Code2 size={11} className="text-indigo-400" />
                {showSchema ? "Hide" : "Show"} Schema.org Rich Snippet
              </button>

              <AnimatePresence>
                {showSchema && (
                  <motion.pre
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-3 rounded-xl bg-[#050810] text-[9px] font-mono text-cyan-300/80 overflow-x-auto border border-white/[0.06]"
                  >
{`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${selectedProduct.name}",
  "sku": "${selectedProduct.sku}",
  "offers": {
    "@type": "Offer",
    "price": "${selectedProduct.price.replace(/[^\d]/g, '')}",
    "priceCurrency": "PLN",
    "availability": "${selectedProduct.inStock ? "InStock" : "OutOfStock"}"
  },
  "aggregateRating": {
    "ratingValue": "${selectedProduct.rating}",
    "reviewCount": "${selectedProduct.reviews}"
  }
}`}
                  </motion.pre>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
