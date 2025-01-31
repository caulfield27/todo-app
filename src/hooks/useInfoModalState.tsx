import { Dispatch, SetStateAction, useState } from "react";

interface IModalState{
    isActive: boolean,
    message: string,
    type: "success" | "error"
}

export const useInfoModalState = () : [
    IModalState,
    Dispatch<SetStateAction<IModalState>>
] => {
    const [modalState, setModalState] = useState<IModalState>({
        isActive: false,
        message: "",
        type: "success"
    }) 

    return [modalState, setModalState];
}
 
