import { NextResponse } from 'next/server'
import data from '../../../../db.json'
import fs from 'fs'
import path from 'path'
import { error } from 'console'


const dbPath = path.join(process.cwd(), 'db.json')

export async function GET(request: Request){
    const users = data.users
    try{
        return NextResponse.json(users, {status: 200})
    }catch(error){
        return NextResponse.json({error}, {status: 500})
    }
      
}

export async function POST(request: Request) {
    let newUser = await request.json()     
    const data = fs.readFileSync(dbPath,'utf-8')
    const jsonData = JSON.parse(data)
    jsonData.users.push(newUser)
    fs.writeFileSync(dbPath, JSON.stringify(jsonData,null,2))

    try{
        return NextResponse.json(newUser, {status:201})
    }catch(e){
        return NextResponse.json({error},{status:500})
    }
}

