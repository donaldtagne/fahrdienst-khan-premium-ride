import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSlideshow({ images, interval = 5500 }: { images: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);
  // Per-slide tone-mapping so darker/high-contrast frames still show faces clearly.
  const filters = [
    "brightness(1) contrast(1) saturate(1)",
    "brightness(1.02) contrast(0.98) saturate(1)",
    "brightness(1.18) contrast(0.9) saturate(1.05)",
    "brightness(1.22) contrast(0.88) saturate(1.05)",
  ];
  return (
    <AnimatePresence mode="sync">
      <motion.img
        key={i}
        src={images[i]}
        alt="Fahrdienst Khan Toyota RAV4 Frankenthal"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1.12 }}
        exit={{ opacity: 0, scale: 1.16 }}
        transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: 8, ease: "linear" } }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ filter: filters[i] ?? filters[0] }}
        width={1920}
        height={1080}
        fetchPriority={i === 0 ? "high" : "low"}
      />
    </AnimatePresence>
  );
}