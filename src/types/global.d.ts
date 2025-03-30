export interface updater {
    CheckForUpdates(): void
}

declare global {
    interface Window {
        updater: updater
    }
}