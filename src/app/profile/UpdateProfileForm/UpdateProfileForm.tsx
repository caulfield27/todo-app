"use client";

import styles from "./UpdateProfileForm.module.css";
import { strapi } from "@/e_shared/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormEvent, useEffect, useRef, useState } from "react";
import { getToken } from "@/utils/getToken";
import { getUserAttribute } from "@/utils/getUser";
import { apiUrl } from "@/routes";
import { useGlobalStore } from "@/store/global/global";
import Image from "next/image";
import { useValidation } from "@/hooks/useValidation";
import { BASE_URL } from "@/e_shared/get-env";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateProfileForm = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmePasswordType] = useState("password");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const avatar = useGlobalStore((state) => state.avatar);
  const setAvatar = useGlobalStore((state) => state.setAvatar);
  const { setSnackBar } = useGlobalStore();
  const [pwValidation, setPwValidation] = useValidation();
  const [confirmPwValidation, setConfirmPwValidation] = useValidation();
  const [password, setPassword] = useState("");
  const saveDisabled = disabled || loading || pwValidation.isError || confirmPwValidation.isError;
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setUser({
      username: getUserAttribute("username"),
      email: getUserAttribute("email"),
    });
  }, []);

  const handleUploadAvatar = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setAvatar(imgUrl);
      if (!isChanged) {
        setIsChanged(true);
      }
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("username") === user.username) formData.delete("username");
    if (formData.get("email") === user.email) formData.delete("email");
    if (!formData.get("password")) formData.delete("password");
    if (!avatar) formData.delete("avatar");

    if (formData.has("email")) {
      const email = formData.get("email");
      setLoading(true);
      axios
        .post("/api/check-email-code", { email })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Подтвердите адресс почты",
              input: "text",
              inputLabel: `Код отправлен на почту: ${email}`,
              confirmButtonText: "Подтвердить",
            }).then((res) => {
              setLoading(true);
              axios
                .post("/api/check-email-code", {
                  email,
                  code: res.value,
                  type: "check",
                })
                .then(() => {
                    handleSaveChanges();      
                }).catch((e)=>{
                  setSnackBar({
                    isActive: true,
                    type: "error",
                    message: e?.response?.data?.message || "Неверный код"
                  })                  
                }).finally(()=>{
                  setLoading(false);
                });
            })
          }else{
            setSnackBar(({
              isActive: true,
              type: "error",
              message: res.data.message || "Неверный адресс почты!"
            }))
          }
        })
        .catch((e) => {
          setSnackBar({
            isActive: true,
            type: "error",
            message: "Ошибка, не удалось сохранить изменения",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      handleSaveChanges();
    }

    async function handleSaveChanges() {
      try {
        setLoading(true);
        const token = await getToken();
        const file = formData.get("avatar") as File;
        if (file && file.name) {
          formData.delete("avatar");
          const imgFormData = new FormData();
          imgFormData.append("files", file);
          const imgResponse = await strapi.post("/upload", imgFormData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          formData.append("avatar", imgResponse.data?.[0]?.id);
        }
        const userId = getUserAttribute("id");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await strapi.put(apiUrl.updateUser(userId), formData, config);
        const newAvatar = await strapi.get(apiUrl.getUserAvatar(userId), config);
        const updatedData: any = {};
        for (const [key, value] of formData.entries() as any) {
          if (key === "avatar") {
            updatedData[key] = newAvatar.data?.avatar?.url ?? avatar;
          } else {
            updatedData[key] = value;
          }
        }
        const currentUser = localStorage.getItem("user");
        const newUser = currentUser
          ? { ...JSON.parse(currentUser), ...updatedData }
          : { ...updatedData };
          console.log(newUser);
          
        localStorage.setItem("user", JSON.stringify(newUser));
        setSnackBar({
          isActive: true,
          type: "success",
          message: "Ваши данные успешно обновлены!",
        });
      } catch (e) {
        console.log(e);
        setSnackBar({
          isActive: true,
          type: "error",
          message: "Не удалось сохранить изменения, попробуйте ещё раз",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.outline = "1px solid var(--table-checkbox-color)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.outline = "1px solid gainsboro";
  };
  
  return (
    <div className={styles.edit_profile_container}>
      <button
        className={!disabled ? `${styles.btn} ${styles.disabled}` : styles.btn}
        onClick={() => setDisabled(false)}
      >
        Изменить профиль
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.avatar_wrapper}>
          {avatar ? (
            <Image
              src={avatar.startsWith("/uploads") ? BASE_URL+avatar : avatar}
              alt="user avatar"
              width={80}
              height={80}
              priority
              quality={100}
              className={styles.avatar_img}
            />
          ) : (
            <div className={styles.avatar}>
              <span>{user.username[0]?.toLocaleUpperCase() ?? "U"}</span>
            </div>
          )}
          <button
            disabled={disabled || loading}
            className={disabled || loading ? `${styles.btn} ${styles.disabled}` : styles.btn}
            type="button"
            onClick={handleUploadAvatar}
          >{`${avatar ? "Изменить" : "Добавить"} аватар`}</button>
          <input
            accept="image/png, image/jpeg, image/svg+xml, image/x-icon"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
            ref={inputFileRef}
            type="file"
            name="avatar"
            disabled={disabled || loading}
          />
        </div>
        <div className={styles.input_wrapper}>
          <span>Имя</span>
          <input
            required
            onChange={() => {
              if (!isChanged) setIsChanged(true);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.input}
            type="text"
            name="username"
            defaultValue={user.username}
            disabled={disabled || loading}
          />
        </div>
        <div className={styles.input_wrapper}>
          <span>Почта</span>
          <input
            required
            onChange={() => {
              if (!isChanged) setIsChanged(true);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={styles.input}
            type="email"
            name="email"
            defaultValue={user.email}
            disabled={disabled || loading}
          />
        </div>
        <div className={styles.input_wrapper}>
          <span>Новый пароль</span>
          <div className={styles.pw_input_wrapper}>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!isChanged) setIsChanged(true);
                if (pwValidation.isError) {
                  if (e.target.value.length > 5) {
                    setPwValidation({ isError: false, message: "" });
                  }
                }
              }}
              onFocus={handleFocus}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                if (e.target.value.length < 6) {
                  setPwValidation({
                    isError: true,
                    message: "Пароль должен состоять минимум из 6 символов",
                  });
                  e.target.style.outline = "1px solid var(--error-color)";
                } else {
                  e.target.style.outline = "1px solid gainsboro";
                }
              }}
              className={styles.input}
              type={passwordType}
              name="password"
              disabled={disabled || loading}
            />
            <button
              className={styles.pw_visibility_btn}
              disabled={disabled || loading}
              type="button"
              onClick={() => setPasswordType((prev) => (prev === "password" ? "text" : "password"))}
            >
              {passwordType === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          {pwValidation.isError && (
            <span className={styles.error_text}>{pwValidation.message}</span>
          )}
        </div>
        <div className={styles.input_wrapper}>
          <span>Подтвердить пароль</span>
          <div className={styles.pw_input_wrapper}>
            <input
              onFocus={handleFocus}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value !== password) {
                  e.target.style.outline = "1px solid var(--error-color)";
                  setConfirmPwValidation({
                    isError: true,
                    message: "Пароли не совпадают!",
                  });
                } else {
                  e.target.style.outline = "1px solid var(--table-checkbox-color)";
                  setConfirmPwValidation({
                    isError: false,
                    message: "",
                  });
                }
              }}
              onBlur={handleBlur}
              className={styles.input}
              type={confirmPasswordType}
              name="password"
              disabled={disabled || loading}
            />
            <button
              className={styles.pw_visibility_btn}
              disabled={disabled || loading}
              type="button"
              onClick={() =>
                setConfirmePasswordType((prev) => (prev === "password" ? "text" : "password"))
              }
            >
              {confirmPasswordType === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          {confirmPwValidation.isError && (
            <span className={styles.error_text}>{confirmPwValidation.message}</span>
          )}
        </div>
        <div className={styles.footer_actions}>
          <button
            className={
              saveDisabled || !isChanged ? `${styles.save_btn} ${styles.disabled}` : styles.save_btn
            }
            disabled={saveDisabled || !isChanged}
            type="submit"
          >
            {loading ? `Сохранение...` : `Сохранить`}
          </button>
          <button
            className={
              saveDisabled || !isChanged
                ? `${styles.cancel_btn} ${styles.disabled}`
                : styles.cancel_btn
            }
            type="reset"
            onClick={() => {
              setPassword("");
              setPwValidation({ isError: false, message: "" });
              setConfirmPwValidation({ isError: false, message: "" });
              setDisabled(true);
              setAvatar(getUserAttribute("avatar"));
              setIsChanged(false);
            }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
