"use client"

import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// hooks
import useSignupModal from "../hooks/useSignupModal";
import { UserContext } from "../providers/UserProvider";

// components
import Button from "../components/Button";
import Input from "../components/inputs/Input";

// Login Client
// login page for client, includes login form and signup modal
const LoginClient = () => {
  // user context
  const { setUser } = useContext(UserContext);

  // reset user
  useEffect(() => {
    setUser({
      id: "",
      name: "",
      image: ""
    });
  }, [setUser]);

  // router
  const router = useRouter();

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
    if (isSending) return;

    // disable button
    setIsSending(true);

    // authenticate user
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((res) => {

      if (res?.ok) {
        // toast success
        toast.success('Logged in successfully');

        // refresh page
        router.refresh();
      }

      if (res?.error) {
        // toast error
        toast.error(res.error);
      }
    }).finally(() => {
      // re-enable button
      setIsSending(false)
  });
  };

  return (
    <div className="flex flex-col h-screen pt-6 md:pt-36">
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
            <Button disabled={isSending}  label="Log In" submit />
          </form>
          <hr />

          {/* open signup modal */}
          <Button label="Create New Account" onClick={signupModal.onOpen} secondary />
        </div>
      </div>
      <div className="mt-auto text-center text-neutral-300">
        <a href="http://github.com/WitchingHr/fb" target="_blank">WitchingHr</a>
      </div>
    </div>
  );
};

export default LoginClient;
