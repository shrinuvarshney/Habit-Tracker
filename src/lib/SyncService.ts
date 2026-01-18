export interface SyncState {
    lastSyncedAt: number | null;
    status: "idle" | "syncing" | "error" | "success";
    error?: string;
}

export interface SyncService {
    /**
     * Upload local data to the cloud.
     * Merges with remote data based on timestamps.
     */
    push(): Promise<void>;

    /**
     * Download data from the cloud.
     * Updates local storage if remote appears newer.
     */
    pull(): Promise<void>;

    /**
     * Force a full synchronization (pull then push logic).
     */
    sync(): Promise<void>;

    /**
     * Clear cloud data for the current user.
     */
    clearRemote(): Promise<void>;
}

// Mock implementation for UI testing
export class MockSyncService implements SyncService {
    async push(): Promise<void> {
        console.log("Mock Sync: Pushing data...");
        await new Promise(r => setTimeout(r, 1000));
        console.log("Mock Sync: Push complete.");
    }

    async pull(): Promise<void> {
        console.log("Mock Sync: Pulling data...");
        await new Promise(r => setTimeout(r, 1000));
        console.log("Mock Sync: Pull complete.");
    }

    async sync(): Promise<void> {
        await this.push();
        await this.pull();
    }

    async clearRemote(): Promise<void> {
        console.log("Mock Sync: Remote data cleared.");
    }
}
