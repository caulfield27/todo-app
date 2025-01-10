import React from "react";
import { createPortal } from "react-dom";

interface Props{
    isOpen: boolean
}

const AddTaskModal = ({isOpen} : Props) => {
    return isOpen && createPortal(
        <div>
            
        </div>
    , document.body);
}
 
export default AddTaskModal;