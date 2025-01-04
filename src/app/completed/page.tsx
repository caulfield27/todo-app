"use client"
import { useDebounse } from "@/hooks/useDebounce";
import PagesContainer from "@/layouts/pagesContainer/pagesContainer"
import Wrapper from "@/layouts/wrappepr/wrapper";
import BrowserPrivateRoute from "@/routes/BrowserPrivateRoute";
import { useEffect, useState } from "react";

const Completed = () => {
    
    const [searchValue , setSearchValue] = useState('');
    const debouncedSearchValue = useDebounse(searchValue);

    function handleChange(e: any){
        setSearchValue(e.target.value);
    }

    useEffect(()=>{
        console.log(debouncedSearchValue);
        
        
    },[debouncedSearchValue])
    
    return (
        <BrowserPrivateRoute>
            <PagesContainer>
                <Wrapper>
                    <input type="text" 
                    style={{'padding' : '10px', 'marginTop': '50px'}}
                    onChange={handleChange} 
                    placeholder="search..."/>
                </Wrapper>
            </PagesContainer>
        </BrowserPrivateRoute>
    );
}

export default Completed;