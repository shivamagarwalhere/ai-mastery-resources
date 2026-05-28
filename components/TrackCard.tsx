"use client";
import { motion } from "framer-motion";
import { DATA } from "@/lib/data";

type TrackCardItem = (typeof DATA.curriculum)[number];

export default function TrackCard({ track, index }: { track: TrackCardItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -5 }}
      className="relative p-6 rounded-3xl border border-border bg-surface overflow-hidden cursor-pointer group"
    >
      <div 
        className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-50 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: track.accent }}
      />
      <div className="font-mono text-muted text-xs mb-4">0{index + 1} / {DATA.curriculum.length}</div>
      <h3 className="text-xl font-semibold mb-2 tracking-tight">{track.track}</h3>
      <p className="text-sm text-muted leading-relaxed mb-8">{track.goal}</p>

      <div className="mt-auto">
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>{track.topics.length} topics</span>
          <span>0%</span>
        </div>
        <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-aqua rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "0%" }}
          />
        </div>
      </div>
    </motion.div>
  );
}