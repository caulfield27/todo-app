import { ReactElement } from "react";
import { Chat } from "../Chat/Chat";
import { Users } from "../Users/Users";

interface ITabList {
  label: string;
  value: string;
}

export const tabList: ITabList[] = [
  {
    label: "Пользователи",
    value: "users",
  },
  {
    label: "Чат",
    value: "chat",
  },
];

export const tabContent: { [key: string]: ReactElement } = {
  users: <Users />,
  chat: <Chat />,
};
