export const handleDisableEvents = (disable: boolean)=>{
    const wrapper = document.getElementById("wrapper");
    if(wrapper){
        if(disable){
            wrapper.style.pointerEvents = "none";
        }else{
            wrapper.style.pointerEvents = "auto";
        }
    }
}