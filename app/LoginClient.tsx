"use client"

import { useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";

// hooks
import useSignupModal from "./hooks/useSignupModal";

// components
import Button from "./components/Button";
import Input from "./components/inputs/Input";

// Login Client
// login page for client, includes login form and signup modal
const LoginClient = () => {
  // view state, open/close modal
  const signupModal = useSignupModal();

  // sending state
  const [isSending, setIsSending] = useState<boolean>(false);

  // form validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSending(true);

    // send data to server
    console.log(data);

  };

  return (
    <div className="pt-6 md:pt-36">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-[1024px] mx-auto">

        {/* logo and subheading */}
        <div className="flex flex-col items-center md:items-start md:pr-8">
          <h1 className="font-bold text-6xl md:pt-16 text-[#1a77f2]">facebook</h1>
          <p className="text-center md:text-start md:text-2xl">Connect with friends and the world around you on Facebook.</p>
        </div>

        {/* login form */}
        <div className="flex flex-col gap-4 bg-white shadow-xl rounded-xl p-4 mx-auto w-full max-w-[400px] mt-8 md:mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email"
              id="email"
              type="email"
              register={register}
              disabled={isSending}
              errors={errors}
              required
            />
            <Input
              label="Password"
              type="password"
              id="password"
              errors={errors}
              register={register}
              disabled={isSending}
              required
            />
            <Button label="Log In" submit />
          </form>
          <hr />

          {/* open signup modal */}
          <Button label="Create New Account" onClick={signupModal.onOpen} secondary />
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
