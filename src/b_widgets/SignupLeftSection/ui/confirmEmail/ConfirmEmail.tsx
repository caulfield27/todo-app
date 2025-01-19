"use client";

import Input from "@/e_shared/input/input";
import { useValidation } from "@/hooks/useValidation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSignupStore } from "../../model/store";
import SignupForm from "../signupForm/SignupForm";
import { useRouter } from "next/navigation";
import styles from "./ConfirmEmail.module.css";
import OtpInput from "@/e_shared/otpInput/OtpInput";
import AuthButton from "@/e_shared/authButton/authButton";
import Loader from "@/e_shared/loader/Loader";
import { strapi } from "@/e_shared/api";
import { apiUrl } from "@/routes";

interface Props {
  email: string;
  name: string;
  password: string;
}

const ConfirmEmail = ({ email, name, password }: Props) => {
  const router = useRouter();
  const { setCurrentComponent } = useSignupStore();
  const [code, setCode] = useState("");
  const [codeValidation, setCodeValidation] = useValidation();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seconds, setSeconds] = useState(25);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeValidation({ isError: false, message: "" });
    const { value } = e.target;
    if (!/^[0-9]*$/gm.test(value) || value.length > 4) {
      return;
    }
    setCode(value);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("/api/check-email-code", {
        email,
        code: code,
        type: "check",
      })
      .then((res) => {
        if (res.status === 200) {
          return strapi
            .post(apiUrl.signUp, {
              username: name,
              email,
              password,
            })
            .then((response) => {
              if (response?.status === 200) {
                Swal.fire({
                  icon: "success",
                  title: "Регистрация прошла успешно",
                  text: "Войдите в свой аккаунт для начало работы",
                }).then(() => {
                  router.push(`/auth/login?email=${email}`);
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Почта или имя уже заняты",
                  text: "Попробуйте другое имя или адресс почты",
                }).then(() => {
                  setCurrentComponent(<SignupForm />);
                });
              }
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                icon: "error",
                title: "Почта или имя уже заняты",
                text: "Попробуйте другое имя или адресс почты",
              }).then(() => {
                setCurrentComponent(<SignupForm />);
              });
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так",
            text: "Попробуйте ещё раз",
          }).then(() => {
            setCurrentComponent(<SignupForm />);
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          setCodeValidation({ isError: true, message: err.response?.message ?? "неверный код" });
        } else {
          Swal.fire({
            icon: "error",
            title: "Неверный адресс почты",
            text: "Попробуйте заново",
          }).then(() => {
            setCurrentComponent(<SignupForm />);
          });
        }
        console.log("err:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResend = () => {
    setResendLoading(true);
    axios
      .post("/api/check-email-code", { email, type: "send" })
      .then((res) => {
        setResendLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Что-то пошло не так",
          text: "Попробуйте заново заполнить форму",
        }).then(() => {
          setCurrentComponent(<SignupForm />);
        });
      })
      .finally(() => {
        setResendLoading(false);
        setSeconds(25);
      });
  };

  return (
    <>
      <div className={styles.confirm_email_wrapper}>
        <div className={styles.go_gack_btn_wrapper}>
          <button className={styles.go_back_btn} onClick={()=> setCurrentComponent(<SignupForm/>)}>
            <img src="/left_arrow.svg" alt="go back icon" />
          </button>
        </div>
        <p className={styles.email_confirm_text}>
          Для успешного завершения регистрации подтвердите код отправленный по адрессу: <b>{email}</b>
        </p>
        <OtpInput handleChange={handleChange} validation={codeValidation} value={code} />
        <div className={styles.resend_wrapper}>
          {seconds === 0 ? (
            resendLoading ? (
              <Loader size="s" color="primary" />
            ) : (
              <button onClick={handleResend} className={styles.resend_btn}>Отправить код повторно</button>
            )
          ) : (
            <span className={styles.resend_span}>Отправить код повторно через: {seconds} секунд</span>
          )}
        </div>
        <AuthButton
          handleClick={handleSubmit}
          isLoading={loading}
          isDisabled={codeValidation.isError || code.length !== 4}
          label="Подтвердить"
        />
      </div>
    </>

  );
};

export default ConfirmEmail;
