import dayjs from "dayjs";

export const month: {[key: string] : string} = {
    '01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08':'августа',
    '09':'сентября',
    '10': 'октяюря',
    '11':'ноября',
    '12': 'декабря'

}

export function parseDay(day: any){
    let year = day.getFullYear(); 
    let month = ('0' + (day.getMonth() + 1)).slice(-2); 
    let currentDay = ('0' + day.getDate()).slice(-2); 
    
    return `${year}-${month}-${currentDay}`
}

export function parseToSentense(date: string){
    let currentYear = new Date().getFullYear()
    let arr:string[] = date.split('-')
    let sentense = []
    for(let i = 0; i < arr.length; i++){
        if(month[arr[i]]){
            if(i !== arr.length -1){
                sentense.push(month[arr[i]])
            }else{
                const removeZero = arr[i].split('').filter((elem)=> elem !== '0').join('')
                sentense.push(removeZero)
            }
        }else if(Number(arr[i]) > 31){
            if(Number(arr[i]) === currentYear){
                continue
            }else{
                sentense.push(arr[i]+'')
            }
        }else{
            sentense.push(arr[i])
        }
    }
    return sentense.reverse().join(' ')
    
}

// function isToday(day: string){
//     let props = dayjs(day)
//     let currentDay = dayjs(parseDay(new Date()))
//     console.log(props);
//     console.log(currentDay);
    
// }