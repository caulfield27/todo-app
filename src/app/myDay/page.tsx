"use client"
import AddTaskModal from "@/modals/AddTaskModal/AddTaskModal";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";
import { useAuthModal } from "@/store/auth/auth";
import { useEffect } from "react";
import { useTodoes } from "@/hooks/useTodoes";


const MyDay = () => {
    const setModal = useAuthModal((state)=> state.setModal)
    useEffect(()=>{
        setTimeout(()=>{
            setModal(false)
        },3000)
    },[])

    const todoes = useTodoes()
    console.log(todoes[0].completeDate.numbered);
    
    // for(let i = 0; i < todoes.length; i++){
    //     if()
    //     console.log(todoes[i].completeDate.numbered);
        
    // }
    
    

    return (
        <BrowserPrivateRoute>
            <PagesContainer>
                <Wrapper>
                    <h1>Мой день</h1>
                    
                    <AddTaskModal/>
                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>

    );
}

export default MyDay;