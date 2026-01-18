"use client";

import { ReactNode } from "react";
import { useSaaS, FeatureFlags } from "@/lib/SaaSContext";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureGateProps {
    feature: keyof FeatureFlags;
    children: ReactNode;
    fallback?: ReactNode; // Custom lock screen
    showLock?: boolean;   // If true, shows a default lock overlay instead of hiding completely
}

export function FeatureGate({ feature, children, fallback, showLock = false }: FeatureGateProps) {
    const { features, upgradeToPremium, isLoading } = useSaaS();

    if (isLoading) return null; // Or a skeleton

    const isEnabled = features[feature];

    if (isEnabled) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    if (showLock) {
        return (
            <div className="relative overflow-hidden rounded-xl border border-dashed border-border bg-muted/30 p-6 flex flex-col items-center justify-center text-center gap-4 group">
                {/* Blur existing content hint? No, just lock UI */}
                <div className="bg-primary/10 p-4 rounded-full">
                    <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Premium Feature</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-4">
                        Upgrade to unlock {feature.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}.
                    </p>
                    <button
                        onClick={upgradeToPremium}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                        Unlock Now
                    </button>
                </div>
            </div>
        );
    }

    // Default: render nothing if hidden
    return null;
}
