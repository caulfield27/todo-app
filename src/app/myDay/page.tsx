"use client"
import AddTaskModal from "@/modals/AddTaskModal/AddTaskModal";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";
import { useAuthModal } from "@/store/auth/auth";
import { useEffect } from "react";


const MyDay = () => {
    const setModal = useAuthModal((state)=> state.setModal)

    useEffect(()=>{
        setTimeout(()=>{
            setModal(false)
        },3000)
    },[])

    return (
        <BrowserPrivateRoute>
            <PagesContainer>
                <Wrapper>
                    <h1>My Day</h1>
                    
                    <AddTaskModal/>
                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>

    );
}

export default MyDay;