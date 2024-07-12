export function getFromStorage(data: string) {
    const getItem  = localStorage.getItem(data)
    if (getItem) {
        const parsedData = JSON.parse(getItem)
        return parsedData
    }
}

export function setToStorage<DT>(key:string, data: DT){
    localStorage.setItem(key,JSON.stringify(data))
}