"use client"
import AddTaskModal from "@/modals/AddTaskModal/AddTaskModal";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";
import { useAuthModal } from "@/store/auth/auth";
import { useEffect } from "react";
import { ITodo, useTaskStore } from "@/store/addTask/addTask";
import PriorityIcon from "@/e_shared/priorityIcon/PriorityIcon";

const MyDay = () => {
    const setModal = useAuthModal((state)=> state.setModal)
    const todoes = useTaskStore((state)=> state.todoes)
    useEffect(()=>{
        setTimeout(()=>{
            setModal(false)
        },3000)
    },[])


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
                    
                    <AddTaskModal/>
                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>

    );
}

export default MyDay;