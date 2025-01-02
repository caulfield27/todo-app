"use client"
import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";
import { useAuthModal } from "@/store/auth/auth";
import { useEffect } from "react";
import { ITodo, useTaskStore } from "@/store/addTask/addTask";
import PriorityIcon from "@/e_shared/priorityIcon/PriorityIcon";

const MyDay = () => {
    
    return (
        <BrowserPrivateRoute>
            <PagesContainer>
                <Wrapper>
                    <h1>Мой день</h1>
                    {/* {todoes?.map((todo:ITodo, ind:number)=>{
                        return <div key={ind}>
                            <div>{todo.completeDate.inWords}</div>
                            <div><PriorityIcon color={todo.priority.color}/></div>
                            <div>{todo.executor}</div>          
                            <div>{todo.taskDescription}</div>
                            <div>{todo.taskName}</div>  

                        </div>
                    })} */}
                    
                
                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>

    );
}

export default MyDay;