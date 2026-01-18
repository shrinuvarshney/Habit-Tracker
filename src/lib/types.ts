export type HabitDifficulty = "easy" | "medium" | "hard";

export interface User {
    name: string;
    email: string;
    avatar?: string;

    // SaaS & Cloud Fields
    subscriptionStatus: "free" | "premium" | "admin";
    cloudId?: string;       // ID in the remote database (e.g. Supabase auth ID)
    lastSyncedAt?: number;  // Timestamp of last successful sync
}

export interface Habit {
    id: string;
    title: string;
    category: string;
    emoji?: string;
    completedDates: string[]; // List of YYYY-MM-DD
    streak: number;
    goal: number; // For future usage (e.g., 3 times a week)

    // Phase 1 New Fields
    difficulty: HabitDifficulty;
    reminders: string[]; // "HH:mm" format (24h)
    streakFreeze: number; // Number of freezes available
    notes: Record<string, string>; // Date (YYYY-MM-DD) -> Note content
    archived: boolean;
    createdAt: string;
}

export type HabitStatus = "completed" | "in-progress" | "not-started";
