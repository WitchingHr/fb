"use client"

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useSignupModal from "@/app/hooks/useSignupModal";

import Modal from "./Modal";
import Input from "../inputs/Input";

// Signup Modal
// modal for creating a new account
const SignupModal = () => {
  // view state, open/close modal
  const signupModal = useSignupModal();

  // sending state for disabling inputs
  const [isSending, setIsSending] = useState<boolean>(false);

  // form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  // form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // disable inputs
    setIsSending(true);

    // send data to server
    axios.post('/api/signup', data)
      .then(() => {
        // toast success
        toast.success('Account created');

        // reset form
        reset();

        // close modal
        signupModal.onClose();
      })
      .catch(() => {
        // toast error
        toast.error("Error creating account");
      })
      .finally(() => {
        // re-enable inputs
        setIsSending(false);
      });
  };

  // form body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="firstName"
        label="First name"
        register={register}
        errors={errors}
        disabled={isSending}
        required
      />
      <Input
        id="lastName"
        label="Last name"
        register={register}
        errors={errors}
        disabled={isSending}
        required
      />
      <Input
        id="email"
        label="Email" type="email"
        register={register}
        errors={errors}
        disabled={isSending}
        required
      />
      <Input
        id="password"
        label="Password" type="password"
        register={register}
        errors={errors}
        disabled={isSending}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isSending}
      isOpen={signupModal.isOpen}
      onClose={signupModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Sign Up"
      title="Sign Up"
      subtitle="It's quick and easy."
      body={bodyContent}
    />
  );
};

export default SignupModal;
