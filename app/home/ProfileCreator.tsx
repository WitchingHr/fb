"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

// components
import Button from "../components/common/Button";
import Input from "../components/inputs/Input";
import ImageUpload from "../components/inputs/ImageUpload";

// props
interface ProfileCreatorProps {
  currentUser: SafeUser;
}

// steps for profile creator
enum STEPS {
  WELCOME=0,
  INFO=1,
  BIO=2,
  PIC=3,
}

// Profile Creator
// walks user through creating a profile
const ProfileCreator: React.FC<ProfileCreatorProps> = ({
  currentUser,
}) => {
  // set initial step
  const [step, setStep] = useState<STEPS>(STEPS.WELCOME);

  // sending state for disabling submit button
  const [isSending, setIsSending] = useState<boolean>(false);
  
  // state for animating heading
  const [showHeading, setShowHeading] = useState<boolean>(false);

  // form data
  const [formData, setFormData] = useState<FieldValues>({
    location: '',
    job: '',
    education: '',
    bio: '',
    image: '',
  });

  // router
  const router = useRouter();

  // fade in on mount
  useEffect(() => {
    setShowHeading(true);
  }, []);

  // form validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      location: '',
      job: '',
      education: '',
      bio: '',
      image: '',
    }
  });

  // save data for each step
  const saveData = (data: FieldValues) => {
    setFormData({
      ...formData,
      ...data
    });

    handleNext();
  };

  // go to next step or submit form
  const handleNext = () => {
    // if on last step, submit form
    if (step === STEPS.PIC) {
      // submit form
      return onSubmit();
    }

    // otherwise, go to next step
    setStep(step + 1);
  };

  // submit form
  const onSubmit = async () => {
    // disable button
    setIsSending(true);

    // send request
    axios.post('/api/profile', {...formData, userId: currentUser.id})
      .then(() => {
        // toast success
        toast.success('Profile created');
        // refresh page
        router.refresh();
      })
      .catch(() => {
        // toast error
        toast.error('Error creating profile');
      })
      .finally(() => {
        // re-enable button
        setIsSending(false);
      });
  };

  // step one content
  let heading = `Welcome to facebook, ${currentUser.name.split(' ')[0]}!`;
  let subheading = "Let's create a profile. Don't worry, it will only take a minute.";
  let body = null;
  
  // step two content
  if (step === STEPS.INFO) {
    heading = "Tell us about yourself";
    subheading = "This information will let your friends know more about you.";
    body = (
      <div className="flex flex-col gap-4 max-w-[400px]">
        <Input
          id="location"
          label="Location"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="job"
          label="Job Title"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="education"
          label="Education"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  
  // step three content
  if (step === STEPS.BIO) {
    heading = "Write a short bio";
    subheading = "This will be shown on your profile.";
    body = (
      <div className="flex flex-col gap-4 max-w-[400px]">
        <textarea
          rows={5}
          placeholder={
            errors.bio
              ? 'Bio required...'
              : 'Describe yourself in a few words...'
          }
          className={`
            p-4 border resize-none dark:bg-[#3a3b3c] dark:text-neutral-400
            ${errors.bio
              ? 'border-red-500 focus:border-red-500 placeholder:text-red-500'
              : 'border-neutral-200 dark:border-0'
            }
          `}
          {...register("bio", { required: true })}
          >
          </textarea>
      </div>
    );
  }

  // step four content
  if (step === STEPS.PIC) {
    heading = "Upload a profile picture";
    subheading = "This will be shown on your profile.";
    body = (
      <div className="flex flex-col gap-4 max-w-[400px]">
        <ImageUpload
          value={formData.image}
          onChange={(value) => setFormData({...formData, image: value})}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 xl:px-20">
      <div
        className={`
          grid grid-cols-1 lg:grid-cols-2 lg:h-screen
          mx-auto px-4 py-16 duration-1000
          ${showHeading ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* heading */}
        <div className="flex flex-col gap-4 pb-8 lg:mt-40 lg:pr-8">
          <h1 className="text-2xl font-medium">
            {heading}
          </h1>
          <p className="text-xl text-neutral-500">
            {subheading}
          </p>
          {/* if on step one */}
          {step === STEPS.WELCOME && (
            <p className="text-lg text-neutral-500">
              Click Next to get started...
            </p>
          )}
        </div>
        <div className="max-w-[400px] mx-auto w-full">
          {/* form */}
          <form
            onSubmit={handleSubmit(saveData)}
            className="flex flex-col justify-between w-full h-full gap-4 mx-auto lg:justify-center"
          >

            {/* form body */}
            {body}

            {/* submit button */}
            <Button
              submit
              disabled={isSending}
              label={step === STEPS.PIC ? 'Finish' : 'Next'}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreator;
