import { create } from "zustand";

// types
interface CoverModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// store for handling Cover modal view state
const useCoverModal = create<CoverModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useCoverModal;
