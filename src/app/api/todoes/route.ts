import data from '../../../../db.json'
import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db.json')


export async function GET(request: Request) {
    const todoes = data.todoes
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')
    const response = todoes.filter((todo)=> String(todo.id) === id)
    
    try{
        return NextResponse.json(response[0].todo,{status: 200})
    }catch(e){
        return NextResponse.json({e}, {status: 500})
    }
    
}


export async function POST(request: Request){
    let newTask = await request.json()
    const data = fs.readFileSync(dbPath, 'utf-8')
    const parsedData = JSON.parse(data)
    const userId = newTask.userId
    const newTodo = newTask.todo
    
    if(parsedData.todoes.length < 1){
        parsedData.todoes.push({
            id: userId,
            todo: [
                newTodo
            ]
        })
    }else{
        let counter = 0
        for(let i = 0; i < parsedData.todoes.length; i++){
            if(parsedData.todoes[i].id === userId){
                counter++
                parsedData.todoes[i].todo.push(newTodo)
            }
        }
        if(counter === 0){
            parsedData.todoes.push({
                id: userId,
                todo: [newTodo]
            })
        }
    
    }

    fs.writeFileSync(dbPath, JSON.stringify(parsedData,null,2))

    try{
        return NextResponse.json({status:201})
    }catch(e){
        return NextResponse.json({e}, {status: 500})
    }
}

