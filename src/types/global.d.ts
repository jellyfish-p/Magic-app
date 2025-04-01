export interface updater {
    CheckForUpdates(): void
}

export interface Storage {
    setItem(key: string, value: string): Promise<void>
    getItem(key: string): Promise<string>
}

declare global {
    interface Window {
        updater: updater
        storage: Storage
    }
}