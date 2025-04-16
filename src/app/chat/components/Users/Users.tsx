"use client";

import { strapi } from "@/e_shared/api";
import { IUserData } from "@/e_shared/types/types";
import { apiUrl } from "@/routes";
import { getToken } from "@/utils/getToken";
import { useContext, useEffect, useState } from "react";
import styles from "./Users.module.css";
import { SocketContext } from "@/c_feauters/WebSocket/WebSocketProvider";

export const Users = () => {
  const [users, setUsers] = useState<IUserData[] | []>([]);
  const [loading, setLoading] = useState(false);
  const {socket, activeUsers} = useContext(SocketContext);

  useEffect(() => {
    setLoading(true);
    getToken().then((token) => {
      if (token) {
        strapi
          .get(apiUrl.getUsers, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            setUsers(res?.data ?? []);
          })
          .catch((e) => console.log("get users err: ", e))
          .finally(() => setLoading(false));
      }
    });
  }, []);

  console.log('active users: ', activeUsers);

  return (
    <div>
      <h2>Список пользователей:</h2>
      <ul>
        {users.map((user) => (
          <li className={activeUsers?.has(user.id) ? styles.active_user : styles.user} key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};
