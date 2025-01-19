"use client"
import Input from "@/e_shared/input/input"
import AuthButton from "@/e_shared/authButton/authButton"
import AuthDirections from "@/e_shared/authDirections/authDirections"
import React, { useState } from "react"
import axios from "axios"
import { IUserData } from "@/e_shared/types/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useValidation } from "@/hooks/useValidation"
import Swal from "sweetalert2"
import { strapi } from "@/e_shared/api"
import { apiUrl } from "@/routes"

interface IUserLoginData {
  email: string,
  password: string

}



const isBtnDisabled = (
  validations: { isError: boolean; message: string }[],
  formData: IUserLoginData
): boolean => {
  return (
    validations.some((val) => val.isError) ||
    !formData.email ||
    !formData.password
  );
};



export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<IUserLoginData>({
    email: searchParams.get("email") ?? "",
    password: ''
  })
  const [emailValidation, setEmailValidation] = useValidation();
  const [passwordValidation, setPasswordValidation] = useValidation();
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { value, name } = e.target
    setUserData(prevData => ({
      ...prevData, [name]: value
    }))

    if(name === "password"){
      if(value.length < 6){
        setPasswordValidation({isError: true, message: "Пароль должен состоять минимум из 6 символов"})
      }else {
        setPasswordValidation({isError: false, message: ""})
      }
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    switch (name) {
      case "email":
        if (!value) {
          setEmailValidation({ isError: true, message: "Поле обязательно для заполнения" })
        } else {
          setEmailValidation({ isError: false, message: "" })
        }
        break;
      case "password":
        if (!value) {
          setPasswordValidation({ isError: true, message: "Поле обязательно для заполнения" })
        } else {
          setPasswordValidation({ isError: false, message: "" })
        }

    }
  }

  function handlSubmit() {
    setLoading(true);
    strapi.post(apiUrl.login, {
      identifier: userData.email,
      password: userData.password,
    }).then((response) => {
      const user: IUserData = response?.data?.user;
      const jwt = response?.data?.jwt;
      if (user && jwt) {
        localStorage.setItem("user", JSON.stringify(user));
        return axios.post("/api/set-cookies", { jwt });
      }else{
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Что-то пошло не так",
          text: "Порообуйте ещё"
        })
      }
    }).then((res) => {
      if (res?.status === 200) {
        router.push("/myDay");
      }else{
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Неверный логин или пароль",
          text: "Проверьте данные и попробуйте ешё"
        })
      }
    })
      .catch((e) => {
        console.log(e);
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Неверный логин или пароль",
          text: "Проверьте данные и попробуйте ешё"
        })
      })
  }

  return (
    <>
      <Input validation={emailValidation} value={userData.email} name="email" placeholder="Введите Email..."
        type="email" label="Email"
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Input validation={passwordValidation} value={userData.password} name="password" placeholder="Введите пароль..."
        type="password" label="Password"
        handleChange={handleChange} 
        handleBlur={handleBlur}/>
      <AuthButton 
        isLoading={loading}
        isDisabled={isBtnDisabled([emailValidation, passwordValidation], userData)} 
        handleClick={handlSubmit} 
        label="ВОЙТИ" />
      <AuthDirections label="Регистрация" text="Ещё нет акаунта?" link="/auth/signup" />
    </>

  )
}
