import { create } from "zustand";

// types
interface NotificationsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// store for handling Notifications modal view state
const useNotificationsModal = create<NotificationsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useNotificationsModal;
