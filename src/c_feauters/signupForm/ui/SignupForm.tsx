"use client"
import AuthButton from "@/e_shared/authButton/authButton"
import AuthDirections from "@/e_shared/authDirections/authDirections"
import Input from "@/e_shared/input/input"
import { useState } from "react"
import { IUserData } from "@/utils/api"
import { useAuthModal } from "@/store/auth/auth"
import { useRouter } from "next/navigation"

export default function SignupForm() {
  const [userData, setUserData] = useState<IUserData>({
    name: '',
    email: '',
    password: '',
  })
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUserData(prevUserData => (
      { ...prevUserData, [name]: value }
    ))
  }

  function handleSubmit() {

  }


  return (
    <>
      <Input name="name" placeholder="Введите Имя..."
        type="text" label="Name"
        handleChange={handleChange} />
      <Input name="email" placeholder="Введите Email..."
        type="email" label="Email"
        handleChange={handleChange} />
      <Input name="password" placeholder="Введите пароль..."
        type="password" label="Password"
        handleChange={handleChange} />
      <AuthButton handleClick={handleSubmit} label="Зарегистрироваться" />
      <AuthDirections label="Вход" text="Уже есть акаунт?" link="/auth/login" />
    </>
  )
}
