"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useAvatarModal from "@/app/hooks/useAvatarModal";

import Modal from "./Modal";
import ImageUpload from "../inputs/ImageUpload";

// Avatar Modal
// modal for updating profile picture
const AvatarModal = () => {
  // router
  const router = useRouter();

  // view state, open/close modal
  const avatarModal = useAvatarModal();

  // sending state for disabling inputs
  const [isSending, setIsSending] = useState<boolean>(false);

  // form validation
  const {
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      image: ''
    }
  });

  // get form value to pass to ImageUpload
  const image = watch('image');

  // set custom form value, called by ImageUpload
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  // form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // disable inputs
    setIsSending(true);

    // send data to server
    axios.post('/api/profile/image', data)
      .then(() => {
        // toast success
        toast.success('Profile picture updated');

        // reset form
        reset();

        // close modal
        avatarModal.onClose();

        // refresh page
        router.refresh();
      })
      .catch(() => {
        // toast error
        toast.error("Error updating profile picture");
      })
      .finally(() => {
        // re-enable inputs
        setIsSending(false);
      });
  };

  // form body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={image} // get image form value
        onChange={(value) => setCustomValue('image', value)} // set image form value
      />
    </div>
  );

  return (
    <Modal
      disabled={isSending}
      isOpen={avatarModal.isOpen}
      onClose={avatarModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Update"
      title="Update Profile Picture"
      subtitle="Show yourself off to the world!"
      body={bodyContent}
    />
  );
};

export default AvatarModal;
