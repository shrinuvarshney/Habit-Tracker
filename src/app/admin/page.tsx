"use client";

import { useSaaS } from "@/lib/SaaSContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, CreditCard, Activity, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
    const { tier, isLoading } = useSaaS();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: 142,
        activeToday: 28,
        premiumUsers: 12,
        revenue: 119.88
    });

    useEffect(() => {
        if (!isLoading && tier !== "admin") {
            // In a real app, you'd redirect. 
            // For this demo, we might show a 'Not Authorized' screen.
            // router.push("/"); 
        }
    }, [tier, isLoading, router]);

    if (isLoading) return null;

    if (tier !== "admin") {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
                    Restricted Area 403
                </h1>
                <p className="text-muted-foreground">You do not have permission to view this page.</p>
                <div className="mt-8 p-4 bg-muted rounded-xl text-left max-w-md text-xs font-mono">
                    <p className="mb-2">// Developer Hint:</p>
                    <p>Open SaaSContext.tsx and set DEFAULT_FEATURES or your user tier to 'admin' to test this.</p>
                    <p className="mt-2 text-blue-500 cursor-pointer hover:underline" onClick={() => localStorage.setItem("habit_users_db", JSON.stringify({ "admin@example.com": { email: "admin@example.com", name: "Owner", subscriptionStatus: "admin" } }))}>
                        [Click to Seed Admin User in DB]
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your SaaS performance.</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                    Live Mode
                </div>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    label="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    trend="+12%"
                    color="text-blue-500"
                    bg="bg-blue-50 dark:bg-blue-900/20"
                />
                <MetricCard
                    label="Active Today"
                    value={stats.activeToday}
                    icon={Activity}
                    trend="+5%"
                    color="text-green-500"
                    bg="bg-green-50 dark:bg-green-900/20"
                />
                <MetricCard
                    label="Premium Subs"
                    value={stats.premiumUsers}
                    icon={CreditCard}
                    trend="+2"
                    color="text-violet-500"
                    bg="bg-violet-50 dark:bg-violet-900/20"
                />
                <MetricCard
                    label="MRR (Est.)"
                    value={`$${stats.revenue}`}
                    icon={TrendingUp}
                    trend="+8.5%"
                    color="text-orange-500"
                    bg="bg-orange-50 dark:bg-orange-900/20"
                />
            </div>

            {/* Recent Signups Table (Mock) */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h3 className="font-bold text-lg">Recent Users</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4">Values</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-medium">User-{1000 + i}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${i % 3 === 0 ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-500"}`}>
                                            {i % 3 === 0 ? "PREMIUM" : "FREE"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{i * 2} days ago</td>
                                    <td className="px-6 py-4 text-muted-foreground">$ {i % 3 === 0 ? "9.99" : "0.00"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, icon: Icon, trend, color, bg }: any) {
    return (
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-foreground">{value}</h3>
                <span className="text-xs text-green-500 font-medium flex items-center mt-1">
                    {trend} <span className="text-muted-foreground ml-1">vs last month</span>
                </span>
            </div>
            <div className={`p-4 rounded-xl ${bg}`}>
                <Icon size={24} className={color} />
            </div>
        </div>
    );
}
