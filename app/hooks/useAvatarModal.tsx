import { create } from "zustand";

// types
interface AvatarModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// store for handling Avatar modal view state
const useAvatarModal = create<AvatarModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useAvatarModal;
