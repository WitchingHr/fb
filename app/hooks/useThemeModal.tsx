import { create } from "zustand";

// types
interface ThemeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// store for handling Theme modal view state
const useThemeModal = create<ThemeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useThemeModal;
