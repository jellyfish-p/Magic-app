import {autoUpdater} from 'electron-updater'

export async function checkForUpdates() {
    return autoUpdater.checkForUpdatesAndNotify()
}