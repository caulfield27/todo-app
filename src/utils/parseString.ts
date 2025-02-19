export function sliceRest(str: string, limit: number) : string{
    if(str.length <= limit) return str;
    return `${str.slice(0,limit)}...`
}