import { strapi } from "@/e_shared/api";
import { BASE_URL } from "@/e_shared/get-env";
import { ITodoResponse } from "@/e_shared/types/types";
import { apiUrl } from "@/routes";
import { createTransport } from "@/utils/createTransport";
import { generalDaySeconds } from "@/utils/getDate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {email, token, userId} = await request.json();
    try{
        const todoResponse = await fetch(`${BASE_URL}/api${apiUrl.getTodoes(userId)}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res)=> {
            console.log(res);
            return res.json();
        });
        console.log('case 1');
        
        const todaySeconds = generalDaySeconds(new Date());
        const todoes: ITodoResponse[] = todoResponse?.data;
        let hasTodayTask = false;
        const todayTasks = [];

        if(todoes?.length){
            for(let i = 0; i < todoes.length; i++){
                const curDeadlienTime = new Date(todoes[i].deadline ?? "").getTime();            
                if(curDeadlienTime < todaySeconds && !todoes[i].isExpired){
                    const data = {
                        data:{
                            isExpired: true
                        }
                    }
                    fetch(`${BASE_URL}/api${apiUrl.updateTodo(todoes[i].documentId)}`,{
                        method: "PUT",
                        body: JSON.stringify(data),
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type" : "application/json"
                        }
                    }).then((res)=>{
                        console.log('expired update response: ', res.status);
                    }).catch((e)=>{
                        console.log('expired update error: ', e);
                    });
                }else if(todaySeconds === curDeadlienTime){
                    hasTodayTask = true;
                    todayTasks.push(todoes[i]);
                }
            }
        }

        if(hasTodayTask){
            const transport = createTransport();
            const taskList = todayTasks.map((task)=> `
                <li>${task.subject}</li>
            `).join("");

            transport.sendMail({
                from: "DailyDo",
                to: email,
                subject: "Не пропустите выполнить задачи на сегодня",
                html: ` <html>
                        <body>
                            <h2>У вас ${todayTasks.length} активных задач на сегодня, не пропустите их!</h2>
                            <ul>
                                ${taskList}
                            </ul>
                        </body>
                    </html>`
            })
        }
        return NextResponse.json({message: "успешно"}, {status: 200});
    }catch(e){
        console.log('1224: ', e);
        
        return NextResponse.json({error: e}, {status: 500})
    }    
}