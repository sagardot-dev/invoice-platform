"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

export const Landing = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const image1 = theme === "dark" ? "/black1.png" : "/white.png";
  const image2 = theme === "dark" ? "/black2.png" : "/white1.png";

  return (
    <div className="relative md:min-h-140 min-h-70 w-full pt-21 perspective-distant transform-3d pr-8 p-2 md:p-4 ">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="perspective-[4000px] shadow-2xl"
      >
        <Image
          src={image1}
          alt="hero"
          width={1400}
          height={1900}
          className={cn(
            "absolute inset-0 rounded-2xl mask-r-from-10% mask-b-from-50% shadow-2xl"
          )}
          style={{ transform: "rotateY(30deg) rotateX(40deg) rotateZ(-15deg)" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: -10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="perspective-[4000px] translate-x-15 -translate-y-15 shadow-2xl rounded-2xl"
      >
        <Image
          src={image2}
          alt="hero"
          width={1400}
          height={1900}
          className={cn(
            "absolute inset-0 rounded-2xl mask-b-from-85% shadow-2xl border-8 border-accent dark:border-accent/70"
          )}
          style={{ transform: "rotateY(30deg) rotateX(40deg) rotateZ(-15deg)" }}
        />
      </motion.div>
    </div>
  );
};
