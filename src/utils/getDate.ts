import dayjs from "dayjs";
import { month, weeks, parseMonth, monthNumeric } from "@/e_shared/constants/date";

export function parseDay(date: string){
    const arr = date.split(" ");
    return `${arr[3]}-${monthNumeric[arr[1]]}-${arr[2]}`
    
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

export function parseDateToReadable(day: string){
    const arr = day.split(" ");
    return `${weeks[arr[0]]}, ${arr[2]} ${parseMonth[arr[1]]}`
}