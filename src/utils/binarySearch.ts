
export function binarySearch(arr:any,target: string){
    let left = 0;
    let right = arr.length-1
    let mid = 0
    
    while(left <= right){
        mid = Math.floor((left+right) / 2)
        
        if(arr[mid].name.toLowerCase() === target.toLowerCase()){
            return mid
        }

        if(arr[mid].name.toLowerCase() < target.toLowerCase()){
            left = mid+1
        }else{
            right = mid - 1
        }
    }
    return -1
}