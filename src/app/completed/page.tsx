"use client"
import { useDebounse } from "@/hooks/useDebounce";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";


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