export function parseDay(day: any){
    let year = day.getFullYear(); 
    let month = ('0' + (day.getMonth() + 1)).slice(-2); 
    let currentDay = ('0' + day.getDate()).slice(-2); 
    
    return `${year}-${month}-${currentDay}`
}