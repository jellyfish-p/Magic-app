interface USER {
    id: number,
    name: string,
}

interface UserInfo {
    name: Array<USER>,
}

export function ResetUser() {
    localStorage.setItem('random:users', GetOriginUserInfo())
}

export function SetInfo(info: UserInfo) {
    info.name.sort((a, b) => a.id - b.id)
    localStorage.setItem('random:users-origin', JSON.stringify(info))
    localStorage.setItem('random:users', JSON.stringify(info))
}

export function OriginUserInfo() {
    return JSON.parse(GetOriginUserInfo()) as UserInfo
}

export function UserInfo() {
    return JSON.parse(GetUserInfo()) as UserInfo
}

function GetOriginUserInfo() {
    return localStorage.getItem('random:users-origin') || "{\"name\":[]}"
}

function GetUserInfo() {
    return localStorage.getItem('random:users') || GetOriginUserInfo()
}

export function GetUserLength() {
    return JSON.parse(GetUserInfo()).name.length
}

export function GetOriginUserLength() {
    return JSON.parse(GetOriginUserInfo()).name.length
}


export async function getRandomUser(count: number = 1) {
    let data = localStorage.getItem('random:users')
    if (!data) {
        localStorage.setItem('random:users', GetOriginUserInfo())
        data = GetOriginUserInfo()
    }
    let user_info: UserInfo = JSON.parse(data)
    // 如果数量不够，则从原始数据中补充
    if (user_info.name.length < count) {
        let temp = user_info.name
        temp.sort((a, b) => a.id - b.id)
        // 获取原始数据
        user_info = JSON.parse(GetOriginUserInfo())
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
        localStorage.setItem('random:users', JSON.stringify(user_info))
        return temp
    }
    else {
        // 打乱
        user_info.name.sort(function () { return 0.5 - Math.random() })
        // 抽取
        let res = user_info.name.splice(user_info.name.length - count, count)
        // 保存
        localStorage.setItem('random:users', JSON.stringify(user_info))
        return res
    }
}