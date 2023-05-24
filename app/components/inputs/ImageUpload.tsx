"use client";

import Image from "next/image";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary"; // for image upload
import { TbPhotoPlus } from "react-icons/tb"; // for image upload icon

// declare global var for cloudinary
declare global {
	var cloudinary: any;
}

// props
interface ImageUploadProps {
	value: string;
	onChange: (value: string) => void;
}

// Image Upload
// upload an image to cloudinary and return the url
// displays uploaded image
const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
	// update form value on upload
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="mn6wsaeb" // cloudinary upload preset
			options={{
				maxFiles: 1,
			}}
		>
			{({ open }) => {
				function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
					e.preventDefault();
					open();
				}
				return (
					<div
						onClick={handleOnClick}
						className="relative flex flex-col items-center justify-center
						gap-4 p-20 mx-auto max-w-[300px] overflow-hidden text-neutral-600 
						rounded-full border-2 border-neutral-300 border-dashed
						cursor-pointer aspect-square hover:opacity-70 transition"
					>
						{/* upload icon */}
						<TbPhotoPlus size={50} />

						<div className="text-lg font-semibold">
							Click to upload
						</div>

						{/* display uploaded image */}
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image
									alt="upload"
									fill
									style={{ objectFit: "cover" }}
									src={value}
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
