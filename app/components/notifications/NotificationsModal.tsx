"use client"

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Notifications } from "@/app/types";

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

  // ref to menu for clicked outside
  const modalRef = useRef<HTMLUListElement>(null);

  // close menu when clicked outside
  useEffect(() => {
    if (isOpen) {
      // close menu when clicked outside
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          notificationsModal.onClose();
        }
      };
      // add event listener
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, notificationsModal]);

  // clear all notifications
  const handleClearAll = async () => {
    await axios.post(`/api/notification/clear`)
      .then(() => {
        // toast success
        toast.success("Notifications cleared");
        // refresh page
        router.refresh();
      })
      .catch(() => {
        // toast error
        toast.error("Error clearing notifications");
      });
  }

  return (
    <>
      {isOpen && (
        <ul
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[48px] -right-16 sm:right-0
          flex flex-col gap-2 p-2 w-screen sm:w-[360px]
          bg-white dark:bg-[#242526] text-black dark:text-[#e4e6eb]
          border border-x-0 sm:border-x dark:border-[#393b3d] border-neutral-300
          md:rounded-md shadow-2xl"
        >
          {/* if notifications */}
          {notifications && notifications.length > 0 ? (
            // render each notification
            notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))
          ) : (
            // else no notifications
            <li
              className="p-3 text-center
              border border-neutral-300 dark:border-[#393b3d]
              rounded-md shadow-md"
            >
              No notifications
            </li>
          )}
          {/* if notifications, show clear all button */}
          {notifications && notifications.length > 0 && (
            <>
              <hr className="border-neutral-300 dark:border-[#393a3b]" />
              <li
                role="button"
                onClick={handleClearAll}
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:underline"
              >
                Clear All
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default NotificationsModal;
