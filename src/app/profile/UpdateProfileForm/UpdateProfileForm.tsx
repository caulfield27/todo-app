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

const UpdateProfileForm = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmePasswordType] = useState("password");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar: null,
  });
  const [avatar, setAvatar] = useState("");
  const { setSnackBar } = useGlobalStore();
  const [pwValidation, setPwValidation] = useValidation();
  const [confirmPwValidation, setConfirmPwValidation] = useValidation();
  const [password, setPassword] = useState("");
  const saveDisabled = disabled || loading || pwValidation.isError || confirmPwValidation.isError;

  useEffect(() => {
    setUser({
      username: getUserAttribute("username"),
      email: getUserAttribute("email"),
      avatar: getUserAttribute("avatar"),
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
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (
      formData.get("username") === user.username &&
      formData.get("email") === user.email &&
      !avatar &&
      !formData.get("password")
    ) {
      setSnackBar({
        isActive: true,
        type: "success",
        message: "Без изменений!",
      });
      return;
    }
    try {
      setLoading(true);
      const file = formData.get("avatar") as File;
      formData.delete("avatar");
      const imgFormData = new FormData();
      imgFormData.append("files", file);
      const token = await getToken();
      const imgResponse = await strapi.post("/upload", imgFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      formData.append("avatar", imgResponse.data?.[0]?.id);
      const userId = getUserAttribute("id");
      await strapi.put(apiUrl.updateUser(userId), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          <div className={styles.avatar}>
            {user.avatar || avatar ? (
              <Image
                src={user.avatar ?? avatar}
                alt="user avatar"
                width={80}
                height={80}
                priority
                quality={100}
              />
            ) : (
              <span>{user.username[0]?.toLocaleUpperCase() ?? "U"}</span>
            )}
          </div>
          <button
            disabled={disabled || loading}
            className={disabled || loading ? `${styles.btn} ${styles.disabled}` : styles.btn}
            type="button"
            onClick={handleUploadAvatar}
          >{`${user.avatar || avatar ? "Изменить" : "Добавить"} аватар`}</button>
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
            className={saveDisabled ? `${styles.save_btn} ${styles.disabled}` : styles.save_btn}
            disabled={saveDisabled}
            type="submit"
          >
            {loading ? `Сохранение...` : `Сохранить`}
          </button>
          <button className={styles.cancel_btn} type="reset" onClick={()=>{
            setPassword("");
            setPwValidation({isError: false, message: ""});
            setConfirmPwValidation({isError: false, message: ""})
            setDisabled(true);
            setAvatar("");
          }}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
