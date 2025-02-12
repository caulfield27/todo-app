import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { Metadata } from "next";

export const metadata: Metadata ={
    title: "Todo-app | Важные",
    description: "Не пропусти выжные задачи, и повыси свою производительность"
}


const Important = () => {
    
    return (
       
            <PagesContainer>
                <Wrapper>
                    <h1>Important</h1>
                </Wrapper>
            </PagesContainer>
       
    );
}

export default Important; 