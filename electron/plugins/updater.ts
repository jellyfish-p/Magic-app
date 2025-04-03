import { win as mainWindow } from '../main'
import { autoUpdater } from 'electron-updater'
import { BrowserWindow, ipcMain } from 'electron'

function Message(mainWindow: BrowserWindow, type: Number, data?: any) {
    const senddata = {
        state: type,
        msg: data || ''
    }
    mainWindow.webContents.send('UpdateMsg', senddata)
}

export async function checkForUpdates() {
    return autoUpdater.checkForUpdatesAndNotify()
}


// 当更新发生错误的时候触发。
autoUpdater.on('error', (err) => {
    if (err.message.includes('sha512 checksum mismatch')) {
        Message(mainWindow, -1, 'sha512 校验失败')
    }
})
// 当开始检查更新的时候触发
autoUpdater.on('checking-for-update', () => {
    Message(mainWindow, 0)
})
// 发现可更新数据时
autoUpdater.on('update-available', () => {
    Message(mainWindow, 1)
})
// 没有可更新数据时
autoUpdater.on('update-not-available', () => {
    Message(mainWindow, 2)
})
// 下载监听
autoUpdater.on('download-progress', (progressObj) => {
    Message(mainWindow, 3, progressObj)
})
// 下载完成
autoUpdater.on('update-downloaded', () => {
    Message(mainWindow, 4)
})
// 执行更新检查
ipcMain.handle('check-update', () => {
    autoUpdater.checkForUpdates().catch(err => {
        console.log('网络连接问题', err)
    })
})
// 退出并安装
ipcMain.handle('confirm-update', () => {
    autoUpdater.quitAndInstall()
})

// 手动下载更新文件
ipcMain.handle('confirm-downloadUpdate', () => {
    autoUpdater.downloadUpdate()
})
