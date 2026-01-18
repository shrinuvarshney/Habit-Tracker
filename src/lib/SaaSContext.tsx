"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export type UserTier = "free" | "premium" | "admin";

export interface FeatureFlags {
    aiCoach: boolean;
    cloudSync: boolean;
    infiniteHistory: boolean;
    advancedAnalytics: boolean;
}

interface SaaSContextType {
    tier: UserTier;
    features: FeatureFlags;
    upgradeToPremium: () => void;
    downgradeToFree: () => void;
    isLoading: boolean;
}

const DEFAULT_FEATURES: Record<UserTier, FeatureFlags> = {
    free: {
        aiCoach: false,
        cloudSync: false,
        infiniteHistory: false,
        advancedAnalytics: false
    },
    premium: {
        aiCoach: true,
        cloudSync: true,
        infiniteHistory: true,
        advancedAnalytics: true
    },
    admin: {
        aiCoach: true,
        cloudSync: true,
        infiniteHistory: true,
        advancedAnalytics: true
    }
};

const SaaSContext = createContext<SaaSContextType | undefined>(undefined);

export function SaaSProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [tier, setTier] = useState<UserTier>("free");
    const [isLoading, setIsLoading] = useState(true);

    // Initialize from LocalStorage or Auth
    useEffect(() => {
        if (!user) {
            setTier("free");
            setIsLoading(false);
            return;
        }

        const savedTier = localStorage.getItem(`saas_tier_${user.email}`) as UserTier;
        if (savedTier && ["free", "premium", "admin"].includes(savedTier)) {
            setTier(savedTier);
        } else {
            // Default to free
            setTier("free");
        }
        setIsLoading(false);
    }, [user]);

    const upgradeToPremium = () => {
        setTier("premium");
        if (user) {
            localStorage.setItem(`saas_tier_${user.email}`, "premium");
        }
    };

    const downgradeToFree = () => {
        setTier("free");
        if (user) {
            localStorage.setItem(`saas_tier_${user.email}`, "free");
        }
    };

    // Derived features
    const features = DEFAULT_FEATURES[tier];

    return (
        <SaaSContext.Provider value={{ tier, features, upgradeToPremium, downgradeToFree, isLoading }}>
            {children}
        </SaaSContext.Provider>
    );
}

export function useSaaS() {
    const context = useContext(SaaSContext);
    if (!context) throw new Error("useSaaS must be used within a SaaSProvider");
    return context;
}
