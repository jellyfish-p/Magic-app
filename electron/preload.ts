import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld('updater', {
  CheckForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  DownloadUpdate: () => ipcRenderer.invoke('confirm-downloadUpdate'),
  QuitAndInstall: () => ipcRenderer.invoke('confirm-update'),
})

contextBridge.exposeInMainWorld('storage', {
  getItem: (key: string) => ipcRenderer.invoke('get-local-storage', [key]) as Promise<void>,
  setItem: (key: string, value: any) => ipcRenderer.invoke('set-local-storage', [key, value]) as Promise<string>
})