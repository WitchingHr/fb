"use client"

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// hooks
import useProfileModal from "@/app/hooks/useProfileModal";

// components
import Modal from "./Modal";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";

enum STEPS {
  INFO,
  BIO
}

// Profile Modal
// modal for creating a new account
const ProfileModal = () => {
  // router
  const router = useRouter();

  // view state, open/close modal
  const profileModal = useProfileModal();

  // sending state
  const [isSending, setIsSending] = useState<boolean>(false);

  // form step
  const [step, setStep] = useState<STEPS>(STEPS.INFO);

  // form data
  const [formData, setFormData] = useState<FieldValues>({
    location: '',
    job: '',
    education: '',
    bio: ''
  });

  // form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      location: '',
      job: '',
      education: '',
      bio: ''
    }
  });

  // form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // disable inputs
    setIsSending(true);

    // send data to server
    axios.post('/api/profile/update', data)
      .then(() => {
        // toast success
        toast.success('Profile updated!');

        // reset form
        reset();

        // close modal
        profileModal.onClose();

        router.refresh();
      })
      .catch((err) => {
        // toast error
        toast.error(err.response.data.message);
      })
      .finally(() => {
        // re-enable inputs
        setIsSending(false);
      });
  };

  // form body
  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Input id="location" label="Location" register={register} errors={errors} disabled={isSending} required/>
      <Input id="job" label="Job" register={register} errors={errors} disabled={isSending} required/>
      <Input id="education" label="Education" type="education" register={register} errors={errors} disabled={isSending} required/>
    </div>
  );

  if (step === STEPS.BIO) {
    bodyContent = (
      <textarea
        rows={5}
        placeholder={errors.bio ? 'Bio required...' : 'Bio'}
        className={`p-4 border resize-none w-full rounded-md dark:bg-[#3a3b3c] dark:text-neutral-400
          ${errors.bio ? 'border-red-500 focus:border-red-500 placeholder:text-red-500' : 'border-neutral-200 dark:border-0'}
        `}
        {...register("bio", { required: true })}>
      </textarea>
    );
  }

  // handle form step
  const saveData = (data: FieldValues) => {

    setFormData(prevData => {

      // merge previous data with new data
      const updatedData ={
        ...prevData,
        ...data
      };

      // send updated data to next step
      handleNext(updatedData);

      // save updated data to state
      return updatedData;
    });
  };

  // handle next step
  const handleNext = (data: FieldValues) => {
    // if on last step, submit form
    if (step === STEPS.BIO) {
      onSubmit(data);
      // reset step
      setStep(STEPS.INFO);

    } else {
      // otherwise, go to next step
      setStep(s => s + 1);
    }
  };

  return (
    <Modal
      disabled={isSending}
      isOpen={profileModal.isOpen}
      onClose={profileModal.onClose}
      onSubmit={handleSubmit(saveData)}
      actionLabel={`${step === STEPS.BIO ? 'Save changes' : 'Next'}`}
      title="Edit Profile"
      subtitle="Update your profile information"
      body={bodyContent}
    />
  );
};

export default ProfileModal;
