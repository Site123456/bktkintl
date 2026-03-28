"use client";

import { useEffect, useRef, useState, TouchEvent, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Search,
  Play,
  Pause,
  MapPin,
  Star,
  Navigation,
} from "lucide-react";
import { useRouter } from "next/navigation";

const rawProducts = [
  { name: "Wai Wai / RARA (30 pcs)", price: 10, old: 20, image: "/products/waiwai.jpg" },
  { name: "Kodo ko pitho 1kg", price: 2.5, old: 5, image: "/products/kodo.jpg" },
  { name: "Phapar ko pitho 1kg", price: 3.5, old: 7, image: "/products/phapar.jpg" },
  { name: "Kuteko Meat Masala 100g", price: 2, old: 4, image: "/products/meat-masala.jpg" },
  { name: "Century Meat Masala 50g", price: 1, old: 2, image: "/products/century-masala.jpg" },
  { name: "MoMo Masala 500g", price: 6.5, old: 13, image: "/products/momo.jpg" },
];

const captions = [
  "🔥 Offre spéciale cette semaine",
  "⚡ Produits népalais authentiques",
  "📦 Disponible immédiatement",
  "🎯 Prix fixes TTC",
];

const AUTO_DELAY = 4000;

export default function Page() {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [popup, setPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isPlayingRef = useRef(true);
  const touchStartY = useRef<number | null>(null);

  // 🧠 SORT
  const products = useMemo(() => {
    return [...rawProducts].sort((a, b) => b.price - a.price);
  }, []);

  const current = products[index % products.length];

  const discount = Math.round(((current.old - current.price) / current.old) * 100);

  // ⏳ GLOBAL TIMER (jusqu’au 30 mars 2026)
  useEffect(() => {
    const target = new Date("2026-03-30T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Expiré");
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft(`${d}j ${h}h ${m}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => goTo(index + 1, 1), AUTO_DELAY);
    return () => clearTimeout(t);
  }, [index, playing]);

  // CAPTIONS
  useEffect(() => {
    const t = setInterval(() => {
      setCaptionIndex((c) => (c + 1) % captions.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // POPUP
  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const goTo = (i: number, dir: number) => {
    const total = products.length;
    const next = (i + total) % total;
    setDirection(dir);
    setIndex(next);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlayingRef.current) {
      videoRef.current.pause();
      isPlayingRef.current = false;
      setPlaying(false);
    } else {
      const p = videoRef.current.play();
      if (p !== undefined) p.catch(() => {});
      isPlayingRef.current = true;
      setPlaying(true);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStartY.current) return;
    const diff = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diff) > 50) {
      goTo(index + (diff < 0 ? 1 : -1), diff < 0 ? 1 : -1);
    }

    touchStartY.current = null;
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-black text-white relative">

      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/videos/bktk-promo.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />

      {/* PROGRESS BAR */}
      <motion.div
        key={index}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
        className="absolute top-0 left-0 h-[3px] bg-red-500 z-40"
      />

      {/* HEADER */}
      <header className="absolute top-0 left-0 right-0 z-40 p-4 flex justify-between items-center text-xs">
        <div>
          <div className="font-bold flex items-center gap-1">
            BKTK INTERNATIONAL <Star size={12} /> 5/5
          </div>
          <div className="opacity-60 flex items-center gap-1">
            <MapPin size={12} /> Le Bourget
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push("/search")}
            className="bg-white/10 p-2 rounded-full"
          >
            <Search size={16} />
          </button>

          <button
            onClick={togglePlay}
            className="bg-white/10 p-2 rounded-full"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <section
        className="absolute inset-0 flex items-end"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.name}
            custom={direction}
            initial={{ y: direction === 1 ? 120 : -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction === 1 ? -120 : 120, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col justify-end p-6 pb-28"
          >
            <div className="text-red-400 text-sm mb-2">
              {captions[captionIndex]}
            </div>

            <div className="flex gap-2 mb-2">
              <span className="bg-red-600 px-2 py-1 rounded-full text-xs">
                -{discount}%
              </span>
              <span className="bg-white/10 px-2 py-1 rounded-full text-xs">
                🔥 Derniers stocks
              </span>
            </div>

            <h1 className="text-3xl font-bold">{current.name}</h1>

            <div className="text-4xl text-red-500 font-black">
              {current.price}€
            </div>

            <div className="text-xs opacity-60 mt-1">
              ⏳ {timeLeft}
            </div>

            <div className="flex gap-3 mt-4">
              <a href="tel:+33745481119" className="flex-1 bg-red-600 py-3 rounded-xl text-center font-bold flex items-center justify-center gap-2">
                <Phone size={18} /> Appeler
              </a>

              <a
                href="https://www.google.com/maps?q=2+Rue+Jean+Moulin+93350+Le+Bourget"
                target="_blank"
                className="bg-white/10 px-4 rounded-xl flex items-center justify-center"
              >
                <Navigation size={18} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

    </main>
  );
}