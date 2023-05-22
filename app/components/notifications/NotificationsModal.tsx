"use client"

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { Notifications } from "@/app/types";

// components
import useNotificationsModal from "@/app/hooks/useNotificationsModal";
import Notification from "./Notification";

// props
interface NotificationsModalProps {
  isOpen: boolean;
  notifications: Notifications | null;
}

// User Modal
// dropdown Modal for user profile link and logout
const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  notifications
}) => {
  // router
  const router = useRouter();

  // notifications modal view state
  const notificationsModal = useNotificationsModal();

  // ref to menu
  const modalRef = useRef<HTMLUListElement>(null);

  // close menu when clicked outside
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          notificationsModal.onClose();
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, notificationsModal]);

  return (
    <>
      {isOpen && (
        <ul ref={modalRef} onClick={(e) => e.stopPropagation()}
          className={`absolute top-[48px] -right-16 sm:right-0 flex w-screen sm:w-[360px] border border-x-0 sm:border-x dark:border-[#393b3d] border-neutral-300
            flex-col gap-2 p-2 bg-white dark:bg-[#242526] md:rounded-md shadow-2xl text-black dark:text-[#e4e6eb]`}
          >
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))
          ) : (
            <li className="flex flex-row items-center gap-2">
              No notifications
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default NotificationsModal;
