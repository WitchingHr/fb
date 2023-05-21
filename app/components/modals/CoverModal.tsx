"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// hooks
import useCoverModal from "@/app/hooks/useCoverModal";

// components
import Modal from "./Modal";
import ImageUpload from "../inputs/ImageUpload";

// Post Modal
// modal for creating a new post
const CoverModal = () => {
  // router
  const router = useRouter();

  // view state, open/close modal
  const coverModal = useCoverModal();

  // sending state
  const [isSending, setIsSending] = useState<boolean>(false);

  // form validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      cover: ''
    }
  });

  const cover = watch('cover');

  // set custom form value
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
    axios.post('/api/profile/cover', data)
      .then(() => {
        // toast success
        toast.success('Cover updated');

        // reset form
        reset();

        // close modal
        coverModal.onClose();

        // refresh page
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
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={cover} // get cover form value
        onChange={(value) => setCustomValue('cover', value)} // set cover form value
      />
    </div>
  );

  return (
    <Modal
      disabled={isSending}
      isOpen={coverModal.isOpen}
      onClose={coverModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Update"
      title="Update Cover Photo"
      subtitle="Customize your profile with a cover photo that fits you."
      body={bodyContent}
    />
  );
};

export default CoverModal;
