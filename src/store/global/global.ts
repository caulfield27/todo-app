import { INotifications } from "@/e_shared/types/types";
import { create } from "zustand";

export interface ISnackBar {
  isActive: boolean;
  message: string;
  type: "success" | "error";
}

interface IStates {
  sidebarWidth: number;
  isTablet: boolean;
  isMobile: boolean;
  snackBar: ISnackBar;
  theme: string | null;
  avatar: string | null;
  notifications: INotifications[];
}

type Actions = {
  setSidebarWidth: (width: number) => void;
  setIsMobile: (payload: boolean) => void;
  setIsTablet: (payload: boolean) => void;
  setSnackBar: (payload: ISnackBar) => void;
  setTheme: (theme: string) => void;
  setAvatar: (payload: string) => void;
  setNotifications: (payload: INotifications[]) => void;
  addNotification: (payload: INotifications) => void;
};

export const useGlobalStore = create<IStates & Actions>((set) => ({
  sidebarWidth: 0,
  isMobile: false,
  isTablet: false,
  snackBar: {
    isActive: false,
    message: "",
    type: "success",
  },
  avatar: null,
  theme: null,
  notifications: [],
  setAvatar: (payload) => set({ avatar: payload }),
  setTheme: (theme) => set({ theme: theme }),
  setSnackBar: (payload: ISnackBar) => set({ snackBar: payload }),
  setIsTablet: (payload: boolean) => set({ isTablet: payload }),
  setIsMobile: (payload: boolean) => set({ isMobile: payload }),
  setSidebarWidth: (width: number) => set({ sidebarWidth: width }),
  setNotifications: (payload) => set({ notifications: payload }),
  addNotification: (payload) =>
    set((state) => ({ notifications: [...state.notifications, payload] })),
}));
