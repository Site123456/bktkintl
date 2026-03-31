"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Phone, Pause, Play } from "lucide-react";
import PdfFullHeight from "@/components/PdfFullHeight";
const PROMO_END = new Date("2026-03-31T23:59:59");
const SLIDE_DURATION = 4000;
const PROMOS = [
  {
    name: "Wai Wai veg/chicken & RARA (30 pcs)",
    price: 10,
    old: 14,
    image: "/products/waiwai.jpg",
  },
  {
    name: "Kodo ko pitho 1kg",
    price: 2.5,
    old: 5,
    image: "/products/kodo.jpg",
  },
  {
    name: "Phapar ko pitho 1kg",
    price: 3.5,
    old: 7,
    image: "/products/phapar.jpg",
  },
  {
    name: "Kuteko Meat Masala Mix 100g",
    price: 2,
    old: 4,
    image: "/products/meat-masala.jpg",
  },
  {
    name: "Century Meat Masala 50g",
    price: 1,
    old: 2,
    image: "/products/century-masala.jpg",
  },
  {
    name: "Spicy DalbMoth 300g",
    price: 2.5,
    old: 5,
    image: "/products/dalbmoth.jpg",
  },
  {
    name: "Timur Whole 50g",
    price: 2,
    old: 4,
    image: "/products/timur.jpg",
  },
  {
    name: "Kuteko Chicken Masala 100g",
    price: 2,
    old: 4,
    image: "/products/chicken-masala.jpg",
  },
  {
    name: "Century MoMo Masala 500g",
    price: 6.5,
    old: 13,
    image: "/products/momo.jpg",
  },
  {
    name: "Kuteko MoMo Masala Mix 100g",
    price: 2,
    old: 4,
    image: "/products/kuteko-momo.jpg",
  },
  {
    name: "Kuteko Besar Dhulo 100g",
    price: 1,
    old: 2,
    image: "/products/besar.jpg",
  },
  {
    name: "Century Pani Puri Masala 50g",
    price: 1,
    old: 2,
    image: "/products/panipuri.jpg",
  },
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const current = PROMOS[index % PROMOS.length];

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = PROMO_END.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown("Terminé");
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      setCountdown(`${d}j ${h}h ${m}m`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!playing) return;
    let start = performance.now();
    let frame: number;
    const loop = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(ratio);
      if (ratio >= 1) {
        next();
        start = performance.now();
        setProgress(0);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [playing, index]);

  const videos = ["/promovideo.mp4", "/promo1.mp4", "/promo2.mp4"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % videos.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);

  const discount = current.old
    ? Math.round(((current.old - current.price) / current.old) * 100)
    : null;

  const radius = 14;
  const circumference = 2 * Math.PI * radius;

  return (
    <main className="w-full min-h-screen bg-black text-white">
      <section className="relative h-screen md:h-[70vh] w-full overflow-hidden">

        {/* VIDEO CAROUSEL */}
        <div className="absolute inset-0">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <video
              src={videos[currentIndex]}
              muted
              autoPlay
              loop
              playsInline
              className="h-full w-full object-cover"
            />

            {/* VIGNETTE */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_40%,rgba(0,0,0,0.55)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
          </motion.div>
        </div>

        {/* TOP LEFT BADGE */}
        <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 backdrop-blur-md shadow-lg ring-1 ring-white/30">
            <Image
              src="/logo.jpg"
              width={400}
              height={400}
              alt="BKTK Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-3 py-2 rounded-full bg-white/15 backdrop-blur-md shadow-xl">
            <span className="text-white text-sm font-semibold tracking-wide">
              Promo Spéciale • Produits Népalais
            </span>
          </div>
        </div>

        {/* DISCOUNT BADGE */}
        {discount && (
          <div className="absolute top-24 right-6 z-20">
            <div className="bg-red-600 text-white px-6 py-2 rounded-full text-3xl font-bold shadow-xl">
              -{discount}%
            </div>
          </div>
        )}

        {/* COUNTDOWN + PLAY/PAUSE */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
          <div className="bg-red-600/20 backdrop-blur px-4 py-1.5 rounded-full text-white text-sm font-semibold shadow-lg">
            ⏳ Promo Ends in {countdown}
          </div>

          <button
            onClick={() => setPlaying((p) => !p)}
            className="relative h-10 w-10 rounded-full bg-white/15 flex items-center justify-center text-white shadow-lg"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>

        {/* PRODUCT INFO */}
        <div className="absolute bottom-28 left-6 text-white drop-shadow-xl z-20">
          <h1 className="text-4xl font-bold mb-2">{current.name}</h1>
          <div className="flex items-center gap-3">
            {current.old && (
              <span className="line-through opacity-70 text-xl">{current.old}€</span>
            )}
            <span className="text-red-400 text-5xl font-bold">{current.price}€</span>
          </div>
        </div>

        {/* CALL BUTTON */}
        <a
          href="tel:+33141506271"
          className="absolute bottom-28 right-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2 z-20"
        >
          <Phone size={18} />
          +33 1 41 50 62 71
        </a>

        {/* ADDRESS */}
        <div className="absolute bottom-4 left-4 text-white text-xs bg-black/40 px-3 py-2 rounded-md backdrop-blur-sm z-20">
          <p className="font-semibold">Adresse: BKTK INTERNATIONAL</p>
          <p>2 Rue Jean Moulin, 93350 Le Bourget Local: A5</p>
          <p>1 Avenue Louis Blériot, 93120 La Courneuve Local: A22</p>
        </div>

        {/* CAROUSEL CONTROLS */}
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-6 z-30">
          <button
            onClick={prev}
            className="h-12 w-12 flex items-center justify-center bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={next}
            className="h-12 w-12 flex items-center justify-center bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
      <section className="w-full bg-white">
        <PdfFullHeight src="/2026 BKTK CATALOGUE.pdf" />
      </section>
    </main>
  );
}
