import { create } from "zustand";

// types
interface UserMenuModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// store for handling UserMenu modal view state
const useUserMenuModal = create<UserMenuModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useUserMenuModal;
