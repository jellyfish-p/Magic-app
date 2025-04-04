import Store from 'electron-store'

const store = new Store()

export function setItem(key: string, value: string): void {
    store.delete(key)
    store.set(key, value)
}

export function getItem(key: string): string {
    const data = store.get(key) as string
    return data || ''
}