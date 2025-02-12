import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import { Metadata } from "next";

export const metadata: Metadata ={
    title: "Todo-app | Выполненные",
    description: "Следи за своим прогрессом по выполнению задач"
  }

const Completed = () => {

    return (
   
            <PagesContainer>
                <Wrapper>
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                        completed

                    </div>

                </Wrapper>
            </PagesContainer>
 
    );
}

export default Completed;