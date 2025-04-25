export const handleUsername = (name: string)=>{
    if(name.length <= 13) return name;

    return `${name.slice(0,13)}...`
}