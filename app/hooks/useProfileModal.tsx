import { create } from "zustand";

// types
interface ProfileModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// store for handling Profile modal view state
const useProfileModal = create<ProfileModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useProfileModal;
