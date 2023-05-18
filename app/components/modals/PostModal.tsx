"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// hooks
import usePostModal from "@/app/hooks/usePostModal";

// components
import Modal from "./Modal";

// Post Modal
// modal for creating a new post
const PostModal = () => {
  // router
  const router = useRouter();

  // view state, open/close modal
  const postModal = usePostModal();

  // sending state
  const [isSending, setIsSending] = useState<boolean>(false);

  // form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      content: ''
    }
  });

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
      <textarea
        rows={5}
        disabled={isSending}
        maxLength={240}
        placeholder="What's on your mind?"
        className={`p-4 border resize-none 
          ${errors.content
            ? 'border-red-500 focus:border-red-500 placeholder:text-red-500'
            : 'border-neutral-200'}
        `}
        {...register("content", { required: true })}
        >
        </textarea>
      
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
