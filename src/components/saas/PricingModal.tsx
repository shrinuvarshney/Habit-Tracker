"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useSaaS } from "@/lib/SaaSContext";
import confetti from "canvas-confetti";

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
    const { upgradeToPremium } = useSaaS();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpgrade = async () => {
        setIsProcessing(true);

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        upgradeToPremium();
        setIsProcessing(false);
        onClose();

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative h-32 bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="text-center z-10">
                                <h2 className="text-3xl font-bold text-white flex items-center gap-2 justify-center">
                                    <Zap className="fill-yellow-400 text-yellow-400" />
                                    Habit Pro
                                </h2>
                                <p className="text-white/80 mt-1">Unlock your full potential.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <FeatureRow text="Advanced AI Insights & Coaching" />
                                    <FeatureRow text="Cloud Sync & Backup" />
                                    <FeatureRow text="Unlimited History & Analytics" />
                                    <FeatureRow text="Priority Support" />
                                </div>

                                <div className="py-6 border-t border-b border-border text-center">
                                    <span className="text-sm text-muted-foreground line-through mr-2">$19.99</span>
                                    <span className="text-4xl font-bold text-foreground">$9.99</span>
                                    <span className="text-muted-foreground"> / month</span>
                                    <p className="text-xs text-violet-500 mt-2 font-medium">✨ Launch Special: 50% OFF</p>
                                </div>

                                <button
                                    onClick={handleUpgrade}
                                    disabled={isProcessing}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Upgrading...
                                        </>
                                    ) : (
                                        <>
                                            <Star className="fill-white/20" />
                                            Upgrade Now
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-muted-foreground">
                                    Secure payment via Stripe. Cancel anytime.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function FeatureRow({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                <Check size={14} className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-foreground font-medium text-sm">{text}</span>
        </div>
    );
}
