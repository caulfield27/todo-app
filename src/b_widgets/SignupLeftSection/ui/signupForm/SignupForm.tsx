"use client";
import AuthButton from "@/e_shared/authButton/authButton";
import AuthDirections from "@/e_shared/authDirections/authDirections";
import Input from "@/e_shared/input/input";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useValidation } from "@/hooks/useValidation";
import ConfirmEmail from "../confirmEmail/ConfirmEmail";
import { useSignupStore } from "../../model/store";


interface ISIgnupData {
  name: string;
  email: string;
  password: string;
}

const isBtnDisabled = (
  validations: { isError: boolean; message: string }[],
  formData: ISIgnupData
): boolean => {
  return (
    validations.some((val) => val.isError) ||
    !formData.email ||
    !formData.name ||
    !formData.password
  );
};

export default function SignupForm() {
  const router = useRouter();
  const { setCurrentComponent } = useSignupStore()
  const [userData, setUserData] = useState<ISIgnupData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [nameValidation, setNameValidation] = useValidation();
  const [emailValidation, setEmailValidation] = useValidation();
  const [passwordValidation, setPasswordValidation] = useValidation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    if (name === 'password' && value.length < 6) {
      setPasswordValidation({ isError: true, message: "Длина пароля должна быть больше 5 символов" })
    } else {
      setPasswordValidation({ isError: false, message: "" })
    }
  }

  function handleSubmit() {
    setLoading(true);
    axios.post('/api/check-email-code', { email: userData.email, type: "send" })
      .then((res) => {
        if (res.status === 200) {
          setCurrentComponent(<ConfirmEmail {...userData}/>);
        } else {
          setEmailValidation(
            {
              message: res.data.message ?? "неверный адресс почты",
              isError: true
            })
        }
      }).catch((err) => {
        setEmailValidation(
          {
            message: "неверный адресс почты",
            isError: true
          })
        console.log(err);
      }).finally(() => setLoading(false))
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "name":
        if (!userData.name) {
          setNameValidation({ isError: true, message: "Поле обязательно для заполнения" });
        } else {
          setNameValidation({ isError: false, message: "" });
        }
        break;
      case "email":
        if (!userData.email) {
          setEmailValidation({ isError: true, message: "Поле обязательно для заполнения" });
        } else {
          setEmailValidation({ isError: false, message: "" });
        }
        break;
      case "password":
        if (!userData.password) {
          setPasswordValidation({ isError: true, message: "Поле обязательно для заполнения" });
        } else if (userData.password.length < 6) {
          setPasswordValidation({
            isError: true,
            message: "Длина пароля длжна быть больше 5 символов",
          });
        } else {
          setPasswordValidation({ isError: false, message: "" });
        }
        break;
    }
  }

  return (
    <>
      <Input
        value={userData.name}
        name="name"
        placeholder="Введите Имя..."
        type="text"
        label="Name"
        handleChange={handleChange}
        handleBlur={handleBlur}
        validation={nameValidation}
      />
      <Input
        value={userData.email}
        name="email"
        placeholder="Введите Email..."
        type="email"
        label="Email"
        handleChange={handleChange}
        handleBlur={handleBlur}
        validation={emailValidation}
      />
      <Input
        value={userData.password}
        name="password"
        placeholder="Введите пароль..."
        type="password"
        label="Password"
        handleChange={handleChange}
        handleBlur={handleBlur}
        validation={passwordValidation}
      />
      <AuthButton
        isLoading={loading}
        handleClick={handleSubmit}
        label="Зарегистрироваться"
        isDisabled={isBtnDisabled([nameValidation, emailValidation, passwordValidation], userData)}
      />
      <AuthDirections label="Вход" text="Уже есть акаунт?" link="/auth/login" />
    </>
  );
}
