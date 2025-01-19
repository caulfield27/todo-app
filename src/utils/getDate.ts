import dayjs, { Dayjs } from "dayjs";
import { month, weeks, parseMonth, monthNumeric, weeksNumeric, weeksShorted } from "@/e_shared/constants/date";

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

export function parseDateToReadable(day: string, isShorted: boolean){
    const arr = day.split(" ");
    return `${isShorted ? weeksShorted[arr[0]] : weeks[arr[0]]}, ${arr[2]} ${parseMonth[arr[1]]}`
}

export function parseDeadlineToReadable(day: string){
    if(!day) return day;

    const array = day.split(" ");
    const today = new Date();
    const todayArr = today.toDateString().split(" ");
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowArr = tomorrow.toDateString().split(" ")
    
    if(array[1] === todayArr[1] && array[2] === todayArr[2] && array[3] === todayArr[3]){
        return "Сегодня"
    }else if(array[1] === tomorrowArr[1] && array[2] === tomorrowArr[2] && array[3] === tomorrowArr[3]){
        return "Завтра"
    }else{
        return `Срок: ${weeksShorted[array[0]]}, ${array[2]} ${parseMonth[array[1]]}`
    }
    
}