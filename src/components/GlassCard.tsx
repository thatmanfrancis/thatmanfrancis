"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type GlassCardProps = {
  href: string;
  children: React.ReactNode;
};

export default function GlassCard({ href, children }: GlassCardProps) {
  return (
    <Link href={href} className="group relative block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="glass p-5 md:p-6 flex flex-col justify-between h-full rounded-2xl overflow-hidden"
      >
        {children}
      </motion.div>
    </Link>
  );
}
