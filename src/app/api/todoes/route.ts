import data from '../../../../db.json'
import fs from 'fs'
import path from 'path'

let dbPath = path.join(process.cwd(), 'db.json')

export function POST(request: Request){
    let newTodo = request.json()
    console.log("komron: ", newTodo);
    
}