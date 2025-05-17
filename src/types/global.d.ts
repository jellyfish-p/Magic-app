import {ref} from 'vue'
interface UpdateCheckResult {
    readonly isUpdateAvailable: boolean;
    readonly updateInfo: UpdateInfo;
    readonly downloadPromise?: Promise<Array<string>> | null;
    readonly cancellationToken?: CancellationToken;
    /** @deprecated */
    readonly versionInfo: UpdateInfo;
}

export interface UserInfoData {
    id:number;
    real_name:string;
    username:string;
    choosed:boolean;
    available:boolean;
}

export interface updater {
    CheckForUpdates(): Promise<UpdateCheckResult>
    DownloadUpdate(): Promise<Array<string>>
    QuitAndInstall(): Promise<void>
}

export interface Storage {
    setItem(key: string, value: any): Promise<void>
    getItem(key: string): Promise<any>
}

declare global {
    interface Window {
        updater: updater
        storage: Storage
    }
}