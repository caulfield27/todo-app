"use client";
import Input from "@/e_shared/input/input";
import AuthButton from "@/e_shared/authButton/authButton";
import AuthDirections from "@/e_shared/authDirections/authDirections";
import React, { useState } from "react";
import axios from "axios";
import { IUserData } from "@/e_shared/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useValidation } from "@/hooks/useValidation";
import Swal from "sweetalert2";
import { strapi } from "@/e_shared/api";
import { apiUrl } from "@/routes";
import { getUserAttribute } from "@/utils/getUser";

interface IUserLoginData {
  email: string;
  password: string;
}

const isBtnDisabled = (
  validations: { isError: boolean; message: string }[],
  formData: IUserLoginData
): boolean => {
  return validations.some((val) => val.isError) || !formData.email || !formData.password;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<IUserLoginData>({
    email: searchParams.get("email") ?? "",
    password: "",
  });
  const [emailValidation, setEmailValidation] = useValidation();
  const [passwordValidation, setPasswordValidation] = useValidation();
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { value, name } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      if (value.length < 6) {
        setPasswordValidation({
          isError: true,
          message: "Пароль должен состоять минимум из 6 символов",
        });
      } else {
        setPasswordValidation({ isError: false, message: "" });
      }
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    switch (name) {
      case "email":
        if (!value) {
          setEmailValidation({ isError: true, message: "Поле обязательно для заполнения" });
        } else {
          setEmailValidation({ isError: false, message: "" });
        }
        break;
      case "password":
        if (!value) {
          setPasswordValidation({ isError: true, message: "Поле обязательно для заполнения" });
        } else {
          setPasswordValidation({ isError: false, message: "" });
        }
    }
  }

  async function handlSubmit() {
    setLoading(true);
    try {
      const payload = {
        identifier: userData.email,
        password: userData.password,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_STATIC_TOKEN}`,
        },
      };
      const userResponse = await strapi.post(apiUrl.login, payload, config);
      const user: IUserData = userResponse?.data?.user;
      const jwt = userResponse?.data?.jwt;
      await axios.post("/api/set-cookies", { jwt });
      const avatar = await strapi.get(apiUrl.getUserAvatar(user.id), {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      user["avatar"] = avatar.data?.avatar?.url ?? null;
      localStorage.setItem("user", JSON.stringify(user));
      axios
        .post("/api/cron/start", {
          email: userData.email,
          userId: user.id,
          token: jwt,
        })
        .catch((err) => console.log(err));
      router.push("/myDay");
    } catch (e: any) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: e?.response?.status === 400 ?  "Неверный логин или пароль" : "Ошибка, попробуйте ещё раз",
        text: "Проверьте данные и попробуйте ешё",
      });
    }
  }

  return (
    <>
      <Input
        validation={emailValidation}
        value={userData.email}
        name="email"
        placeholder="Введите Email..."
        type="email"
        label="Email"
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Input
        validation={passwordValidation}
        value={userData.password}
        name="password"
        placeholder="Введите пароль..."
        type="password"
        label="Password"
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <AuthButton
        isLoading={loading}
        isDisabled={isBtnDisabled([emailValidation, passwordValidation], userData)}
        handleClick={handlSubmit}
        label="ВОЙТИ"
      />
      <AuthDirections label="Регистрация" text="Ещё нет акаунта?" link="/auth/signup" />
    </>
  );
}
