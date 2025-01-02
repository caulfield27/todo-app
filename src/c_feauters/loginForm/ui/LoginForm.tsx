"use client"
import Input from "@/e_shared/input/input"
import AuthButton from "@/e_shared/authButton/authButton"
import AuthDirections from "@/e_shared/authDirections/authDirections"
import { useState } from "react"
import { useAuthModal } from "@/store/auth/auth"
import { useRouter } from "next/navigation"

interface IUserLoginData {
  email: string,
  password: string

}

export default function LoginForm() {
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
