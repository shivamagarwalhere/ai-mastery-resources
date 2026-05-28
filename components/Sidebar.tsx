"use client";
import { LayoutDashboard, Target, BookOpen, Route } from "lucide-react";

const navItems = [
  { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tracks", label: "Tracks", icon: Target },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "roadmap", label: "Roadmap", icon: Route },
];

export default function Sidebar() {
  return (
    <aside className="w-72 fixed top-0 left-0 h-screen border-r border-border bg-background/50 backdrop-blur-xl p-6 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold to-aqua flex items-center justify-center text-background font-black text-lg">
          S
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight">The Enterprise AI Engineering Framework</h1>
          <p className="text-muted text-xs">Standardize Your Production AI Stack.</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">Navigate</div>
        {navItems.map((item, i) => (
          <button
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-surface text-sm ${i === 0 ? "bg-surface text-white border border-border" : "text-muted hover:text-white"}`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}