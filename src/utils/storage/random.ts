interface USER {
    id: number,
    name: string,
}

interface UserInfo {
    name: Array<USER>,
}

export async function ResetUser() {
    window.storage.setItem('random:users', await GetOriginUserInfo())
}

export function SetInfo(info: UserInfo) {
    info.name.sort((a, b) => a.id - b.id)
    window.storage.setItem('random:users-origin', JSON.stringify(info))
    window.storage.setItem('random:users', JSON.stringify(info))
}

export async function OriginUserInfo() {
    return JSON.parse(await GetOriginUserInfo()) as UserInfo
}

export async function UserInfo() {
    return JSON.parse(await GetUserInfo()) as UserInfo
}

async function GetOriginUserInfo() {
    return (await window.storage.getItem('random:users-origin')) || "{\"name\":[]}"
}

async function GetUserInfo() {
    return (await window.storage.getItem('random:users')) || (await GetOriginUserInfo())
}

export async function GetUserLength() {
    return (await UserInfo()).name.length
}

export async function GetOriginUserLength() {
    return (await OriginUserInfo()).name.length
}


export async function getRandomUser(count: number = 1) {
    let data = await window.storage.getItem('random:users')
    if (!data) {
        await window.storage.setItem('random:users', await GetOriginUserInfo())
        data = await GetOriginUserInfo()
    }
    let user_info: UserInfo = JSON.parse(data)
    // 如果数量不够，则从原始数据中补充
    if (user_info.name.length < count) {
        let temp = user_info.name
        temp.sort((a, b) => a.id - b.id)
        // 获取原始数据
        user_info = JSON.parse(await GetOriginUserInfo())
        // 去重
        temp.forEach((item) => {
            let index = user_info.name.findIndex(i => i.id === item.id)
            user_info.name.splice(index, 1)
        })
        count = count - temp.length
        // 打乱
        user_info.name.sort(function () { return 0.5 - Math.random() })
        // 抽取剩余的
        let temp2 = user_info.name.splice(user_info.name.length - count, count)
        // 恢复去重的
        user_info.name = user_info.name.concat(temp)
        // 拼接
        temp = temp.concat(temp2)
        // 保存
        window.storage.setItem('random:users', JSON.stringify(user_info))
        return temp
    }
    else {
        // 打乱
        user_info.name.sort(function () { return 0.5 - Math.random() })
        // 抽取
        let res = user_info.name.splice(user_info.name.length - count, count)
        // 保存
        window.storage.setItem('random:users', JSON.stringify(user_info))
        return res
    }
}