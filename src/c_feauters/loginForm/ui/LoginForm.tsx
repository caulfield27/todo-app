"use client"
import Input from "@/e_shared/input/input"
import AuthButton from "@/e_shared/authButton/authButton"
import AuthDirections from "@/e_shared/authDirections/authDirections"
import { useState } from "react"
import axios from "axios"
import { IUserData } from "@/e_shared/types/types"
import { useRouter } from "next/navigation"

interface IUserLoginData {
  email: string,
  password: string

}

export default function LoginForm() {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserLoginData>({
    email: '',
    password: ''
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { value, name } = e.target
    setUserData(prevData => ({
      ...prevData, [name]: value
    }))
  }

  function handlSubmit() {
    axios.post("http://localhost:1337/api/auth/local",{
      identifier: userData.email,
      password: userData.password,
    }).then((response)=>{
      const user:IUserData = response?.data?.user;
      const jwt = response?.data?.jwt;
      if(user && jwt){
        localStorage.setItem("user", JSON.stringify(user));
        return axios.post("/api/set-cookies",{jwt}); 
      }
    }).then((res)=>{
      if(res?.status === 200){
        router.push("/myDay");
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  }



  return (
    <>
      <Input name="email" placeholder="Введите Email..."
        type="email" label="Email"
        handleChange={handleChange}
      />
      <Input name="password" placeholder="Введите пароль..."
        type="password" label="Password"
        handleChange={handleChange} />
      <AuthButton handleClick={handlSubmit} label="ВОЙТИ" />
      <AuthDirections label="Регистрация" text="Ещё нет акаунта?" link="/auth/signup" />
    </>

  )
}
