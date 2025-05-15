"use client";

import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { useEffect } from "react";
import styles from "./page.module.css";
import { useGlobalStore } from "@/store/global/global";
import EmailIcon from "@mui/icons-material/Email";
import TaskIcon from "@mui/icons-material/Task";
import { parseDateToReadable } from "@/utils/getDate";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/getToken";
import { strapi } from "@/e_shared/api";

const Page = () => {
  const { notifications, setNotifications } = useGlobalStore();
  const router = useRouter();

  useEffect(() => {
    document.title = "DailyDo | Уведомления";
    getToken().then((token) => {
      notifications.forEach((notification, i) => {
        if (!notification.isRead) {
          strapi
            .put(
              `notifications/${notification.documentId}`,
              {
                data: {
                  isRead: true,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            )
            .then(() => {
              notification.isRead = true;
              setNotifications(notifications);
            })
            .catch(() => {});
        }
      });
    });
  }, []);

  return (
    <>
      <PagesContainer>
        <Wrapper>
          <div className={styles.not_container}>
            <h1 className={styles.header_title}>Уведомления</h1>
            {notifications.map((not) => {
              return (
                <article
                  onClick={() => {
                    if (not.type === "message") {
                      router.push("community?type=chat");
                    } else {
                      router.push("tasks");
                    }
                  }}
                  className={styles.nots_article}
                  key={not.id}
                >
                  <div className={styles.icon_wrapper}>
                    {not.type === "message" ? (
                      <EmailIcon className={styles.msg_icon} />
                    ) : (
                      <TaskIcon />
                    )}
                  </div>
                  <div className={styles.content}>
                    <p>{not.subject}</p>
                    <span>
                      {parseDateToReadable(new Date(not?.createdAt ?? "").toDateString(), false)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </Wrapper>
      </PagesContainer>
    </>
  );
};

export default Page;
