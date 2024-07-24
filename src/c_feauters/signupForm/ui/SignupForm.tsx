"use client"
import AuthButton from "@/e_shared/authButton/authButton"
import AuthDirections from "@/e_shared/authDirections/authDirections"
import Input from "@/e_shared/input/input"
import { useEffect, useState } from "react"
import { IUserData } from "../model"
import { getUsers, postUser } from "../api"
import { useAuthModal } from "@/store/auth/auth"
import { useRouter } from "next/navigation"


export default function SignupForm() {
  const setBackground = useAuthModal((state) => state.setBackground)
  const setModal = useAuthModal((state) => state.setModal)
  const setText = useAuthModal((state) => state.setText)
  const navigateTo = useRouter()
  const [userData, setUserData] = useState<IUserData>({
    name: '',
    email: '',
    password: ''
  })
  let [users, setUsers] = useState<IUserData[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await getUsers('http://localhost:3001/users')
      if (data) {
        setUsers(data)
      }
    }
    fetchData()

  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUserData(prevUserData => (
      { ...prevUserData, [name]: value }
    ))
  }

  function handleSubmit() {
    // if (users.length < 1) {
    //   setModal(true)
    //   setBackground('#EE4E4E')
    //   setText('Из-за технических неполадок сервера временно не работают.')
    //   setTimeout(() => {
    //     setModal(false)
    //   }, 3500)
    // } else {
    if (users.find((elem) => elem.email === userData.email)) {
      setBackground('#EE4E4E')
      setText('Пользователь с такой почтой уже зарегистриролван!')
      setModal(true)
      setTimeout(() => {
        setModal(false)
      }, 3500)
    } else {
      postUser(userData, `http://localhost:3001/users`)
      setBackground('#74E291')
      setText('Регистрация прошла успешно!')
      setModal(true)
      navigateTo.push('/myDay')
      userData['password'] = 'confidential'
      localStorage.setItem('user', JSON.stringify(userData))
    }


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
      <AuthDirections label="Вход" text="Уже есть акаунт?" link="/auth/signup" />
    </>
  )
}
