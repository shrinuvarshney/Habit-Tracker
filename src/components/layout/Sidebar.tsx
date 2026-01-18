"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CheckSquare,
    BarChart2,
    Trophy,
    Settings,
    LogOut
} from "lucide-react";
import { LevelProgress } from "@/components/gamification/LevelProgress";
import { cn } from "@/lib/utils";
import { useSaaS } from "@/lib/SaaSContext";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { PricingModal } from "@/components/saas/PricingModal";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "My Habits", href: "/habits", icon: CheckSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Challenges", href: "/challenges", icon: Trophy },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { tier } = useSaaS();
    const [showPricing, setShowPricing] = useState(false);

    return (
        <aside className="w-64 bg-card hidden md:flex flex-col border-r border-border h-full fixed left-0 top-0 z-10 shadow-sm transition-colors duration-300">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Habit Tracker
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                {tier === "free" ? (
                    <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-4 rounded-xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles size={40} />
                        </div>
                        <p className="text-sm font-bold mb-1 flex items-center gap-2">
                            <Sparkles size={14} className="text-yellow-300" />
                            Go Premium
                        </p>
                        <p className="text-xs text-white/80 mb-3">Unlock AI Insights & Cloud Sync.</p>
                        <button
                            onClick={() => setShowPricing(true)}
                            className="w-full py-2 bg-white text-violet-600 text-xs font-bold rounded-lg hover:bg-white/90 transition-colors shadow-sm"
                        >
                            Upgrade Now
                        </button>
                    </div>
                ) : (
                    <div className="bg-primary/10 p-4 rounded-xl">
                        <p className="text-sm font-medium text-primary flex items-center gap-2">
                            <Sparkles size={14} />
                            Premium Active
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Thanks for your support!</p>
                    </div>
                )}
            </div>

            <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
            <div className="p-4 border-t border-border">
                <LevelProgress />
            </div>
        </aside>
    );
}
