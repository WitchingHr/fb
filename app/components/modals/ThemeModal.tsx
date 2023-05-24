"use client"

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useThemeModal from "@/app/hooks/useThemeModal";

import Modal from "./Modal";
import theme from "@/app/lib/theme";

// Theme Modal
// modal for setting theme
const ThemeModal = () => {
  // view state, open/close modal
  const themeModal = useThemeModal();

  // get current theme
  const currentTheme = localStorage.getItem("theme");

  // form, default theme is current theme
  const {
    register,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      theme: currentTheme || "auto"
    }
  });

  // form submit
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // toast success and save theme to local storage
    if (data.theme === "light") {
      toast.success("Theme set to light");
      localStorage.setItem("theme", "light");
    } else if (data.theme === "dark") {
      toast.success("Theme set to dark");
      localStorage.setItem("theme", "dark");
    } else if (data.theme === "auto") {
      toast.success("Theme set to automatic");
      localStorage.removeItem("theme");
    }
    // close modal
    themeModal.onClose();
    // set theme
    theme();
  };

  // form body
  const bodyContent = (
    <div className="grid grid-cols-2 gap-4 text-neutral-500 dark:text-neutral-400">
      {/* light */}
        <label className="" htmlFor="light">Light:</label>
        <input
          type="radio"
          className="w-10"
          id="light"
          {...register("theme")}
          value="light" />
      {/* dark */}
        <label className="" htmlFor="dark">Dark:</label>
        <input
          type="radio"
          className="w-10"
          id="dark"
          {...register("theme")}
          value="dark" />
      {/* auto */}
        <label className="" htmlFor="auto">Automatic:</label>
        <input
          type="radio"
          className="w-10"
          id="auto"
          {...register("theme")}
          value="auto" />
    </div>
  );

  return (
    <Modal
      isOpen={themeModal.isOpen}
      onClose={themeModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Update theme"
      title="Theme"
      subtitle="Customize your experience"
      body={bodyContent}
    />
  );
};

export default ThemeModal;
