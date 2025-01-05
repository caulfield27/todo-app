"use client"

import Input from "@/e_shared/input/input";
import { useValidation } from "@/hooks/useValidation";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2"
import { useSignupStore } from "../../model/store";
import SignupForm from "../signupForm/SignupForm";
import Loader from "@/e_shared/loader/loader";
import { useRouter } from "next/navigation";

interface Props {
    email: string,
    name: string,
    password: string
}

const ConfirmEmail = ({ email, name, password }: Props) => {
    const router = useRouter();
    const { setCurrentComponent } = useSignupStore();
    const [code, setCode] = useState("");
    const [codeValidation, setCodeValidation] = useValidation();
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!/^[0-9]*$/gm.test(value) || value.length > 4) {
            return;
        }
        setCode(value);
        if (value.length === 4) {
            setLoading(true);
            axios.post('/api/check-email-code', {
                email,
                code: value,
                type: "check"
            }).then((res) => {
                if (res.status === 200) {
                    return axios.post("http://localhost:1337/api/auth/local/register", {
                        username: name,
                        email,
                        password
                    })
                }else  {
                    Swal.fire({
                        icon: "error",
                        title: "Что-то пошло не так",
                        text: "Попробуйте ещё раз"
                    }).then(() => {
                        setCurrentComponent(<SignupForm />)
                    })
                }
            }).then((response) => {
                if (response?.status === 200) {
                    router.push("/auth/login");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Почта или имя уже заняты",
                        text: "Попробуйте другое имя или адресс почты"
                    }).then(() => {
                        setCurrentComponent(<SignupForm />)
                    })
                }
            }).catch((err) => {
                if(err?.response?.status === 409){
                    setCodeValidation({isError: true, message: err.response?.message ?? "неверный код"})
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Почта или имя уже заняты",
                        text: "Попробуйте другое имя или адресс почты"
                    }).then(() => {
                        setCurrentComponent(<SignupForm />)
                    })
                }
                console.log('err:', err);

            }).finally(() => { setLoading(false) })

        }
    }



    return (
        <div>
            {loading ? <Loader size="l" color="primary" /> : 
            <>
                <h2>Введите код отправленный на почту: {email}</h2>
                <Input
                    validation={codeValidation}
                    value={code}
                    name="code"
                    placeholder="введите код"
                    handleChange={handleChange} />
            </>}

        </div>
    )
}

export default ConfirmEmail;