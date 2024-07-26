"use client"
import Input from "@/e_shared/input/input"
import AuthButton from "@/e_shared/authButton/authButton"
import AuthDirections from "@/e_shared/authDirections/authDirections"
import {  useState } from "react"
import { useAuthModal } from "@/store/auth/auth"
import { useRouter } from "next/navigation"
import { useUsers } from "@/hooks/useUsers"

interface IUserLoginData {
  email: string,
  password: string

}

export default function LoginForm() {
  const setBackground = useAuthModal((state) => state.setBackground)
  const setModal = useAuthModal((state) => state.setModal)
  const setText = useAuthModal((state) => state.setText)
  const navigateTo = useRouter()
  const [userData, setUserData] = useState<IUserLoginData>({
    email: '',
    password: ''
  })
  const users = useUsers()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { value, name } = e.target
    setUserData(prevData => ({
      ...prevData, [name]: value
    }))
  }

  function handlSubmit() {
    // if (users.length < 1) {
    //   setModal(true)
    //   setBackground('#EE4E4E')
    //   setText('Из-за технических неполадок сервера временно не работают.')
    //   setTimeout(() => {
    //     setModal(false)
    //   }, 2700)
    // }else {
    let currentUser = users?.filter((user) => user.email === userData.email && user.password === userData.password)
    if (currentUser) {
      if (currentUser.length > 0) {
        navigateTo.push('/myDay')
        currentUser[0]['password'] = 'confidential'
        localStorage.setItem('user', JSON.stringify(currentUser))
        setBackground('#74E291')
        setText('Авторизация прошла успешно!')
        setModal(true)
      } else {
        setBackground('#EE4E4E')
        setText('Пользователь не разегистрирован!')
        setModal(true)
        setTimeout(() => {
          setModal(false)
        }, 3500)
      }
    }



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
