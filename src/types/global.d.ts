interface UpdateCheckResult {
    readonly isUpdateAvailable: boolean;
    readonly updateInfo: UpdateInfo;
    readonly downloadPromise?: Promise<Array<string>> | null;
    readonly cancellationToken?: CancellationToken;
    /** @deprecated */
    readonly versionInfo: UpdateInfo;
}

export interface updater {
    CheckForUpdates(): Promise<UpdateCheckResult>
    DownloadUpdate(): Promise<Array<string>>
    QuitAndInstall(): Promise<void>
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