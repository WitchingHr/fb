"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import usePostModal from "@/app/hooks/usePostModal";

import Modal from "./Modal";
import ImageUpload from "../inputs/ImageUpload";

// Post Modal
// modal for creating a new post
const PostModal = () => {
  // router
  const router = useRouter();

  // view state, open/close modal
  const postModal = usePostModal();

  // add image state, toggle image upload
  const [image, setImage] = useState<boolean>(false);

  // sending state for disabling inputs
  const [isSending, setIsSending] = useState<boolean>(false);

  // form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      content: '',
      postImage: '',
    }
  });

  // get form value to pass to ImageUpload
  const postImage = watch('postImage');

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
    axios.post('/api/post', data)
      .then(() => {
        // toast success
        toast.success('Post created');

        // reset form
        reset();

        // close modal
        postModal.onClose();

        // refresh page
        router.refresh();
      })
      .catch(() => {
        // toast error
        toast.error("Error creating post");
      })
      .finally(() => {
        // re-enable inputs
        setIsSending(false);
      });
  };

  // form body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <textarea
        rows={5}
        disabled={isSending}
        maxLength={240}
        placeholder="What's on your mind?"
        className={`p-4 dark:bg-[#3a3b3c] dark:text-neutral-400
        border dark:border-0 resize-none
        ${errors.content
          ? 'border-red-500 focus:border-red-500 placeholder:text-red-500'
          : 'border-neutral-200'}`}
        {...register("content", { required: true })}
      >
      </textarea>
      {image === false ? (
        // toggle image upload
        <button onClick={() => setImage(true)}>Add image</button>
      ) : (
        <ImageUpload
          value={postImage} // get postImage form value
          onChange={(value) => setCustomValue('postImage', value)} // set postImage form value
        />
      )}
    </div>
  );

  return (
    <Modal
      disabled={isSending}
      isOpen={postModal.isOpen}
      onClose={postModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Submit"
      title="Create post"
      subtitle="Share your thoughts with your friends."
      body={bodyContent}
    />
  );
};

export default PostModal;
