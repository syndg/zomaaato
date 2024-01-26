"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import { FormNavigation } from "@/components/forms/form-nav";
import { useRouter } from "next/navigation";

type Img = {
  imageUrl: string;
  utKey: string;
  id: string;
};

interface ResImageUploaderProps {
  resId: string;
  dbImages: Img[];
  maxImages?: number;
}

const ResImageUploader = ({
  resId,
  dbImages,
  maxImages = 3,
}: ResImageUploaderProps) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = React.useState(false);
  const [canUpload, setCanUpload] = React.useState(false);
  const [images, setImages] = React.useState<Img[]>(dbImages);

  const handleDelete = async (key: string, id: string) => {
    axios.delete(`/api/restaurants/${resId}/resImages?id=${id}&utKey=${key}`);
    const filteredImages = images.filter((image) => image.utKey !== key);
    setImages(filteredImages);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/add-new`);
    router.refresh();
  };

  React.useEffect(() => {
    if (images.length < maxImages) {
      setCanUpload(true);
    } else {
      setCanUpload(false);
    }
  }, [images]);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={cn(
          "flex flex-col justify-center items-center h-[72vh] gap-2",
          images.length > 0 && "gap-12",
        )}
      >
        {images.length === 0 && !isUploading && (
          <h1 className="text-md md:text-2xl font-semibold">
            You have not uploaded any images
          </h1>
        )}
        <div className="flex gap-4 flex-wrap">
          {images.map((image) => (
            <div
              key={image.utKey}
              className="relative mx-auto w-32 h-32 md:h-52 md:w-52 lg:w-60 lg:h-60"
            >
              <Link href={image.imageUrl}>
                <Image
                  src={image.imageUrl}
                  alt="Uploaded restaurant image"
                  className="border-2 border-gray-300 rounded-md"
                  fill
                />
              </Link>
              <button
                onClick={() => handleDelete(image.utKey, image.id)}
                className="absolute -top-2 -right-2 bg-white text-gray-500 rounded-full border-2 border-gray-300 hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="grid gap-5">
          {isUploading && <p className="text-xl text-center">Uploading...</p>}
          <div>
            {canUpload && (
              <UploadButton
                className="ut-button:bg-primary/90 hover:ut-button:bg-primary ut-button:ut-uploading:bg-primary/70 ut-button:ut-uploading:after:bg-primary"
                endpoint="imageUploader"
                onUploadProgress={() => setIsUploading(true)}
                onClientUploadComplete={(res) => {
                  setImages((prev) => [
                    ...prev,
                    {
                      imageUrl: res[0].serverData.imageUrl,
                      utKey: res[0].key,
                      id: res[0].serverData.id,
                    },
                  ]);
                  setIsUploading(false);
                }}
                onUploadError={(err) => {
                  console.log(err);
                  setIsUploading(false);
                }}
                input={resId}
              />
            )}
            {canUpload ? (
              <p className="text-center mt-2">
                You can upload{" "}
                <strong
                  className={cn(
                    images.length === 0 ? "text-blue-700" : "text-primary",
                  )}
                >
                  {maxImages - images.length}
                </strong>{" "}
                {images.length > 0 && "more"} image(s).
              </p>
            ) : (
              <p className="text-center mt-2">
                <strong className="text-primary">Delete</strong> one or more
                images to upload again.
              </p>
            )}
            {images.length === 0 && (
              <div className="mt-8 px-6">
                <p className="text-sm text-center px-2 py-3 border border-primary/60 text-gray-500 rounded-md">
                  You have to upload at least{" "}
                  <strong className="text-primary/60">one</strong> image which
                  would be displayed as the main{" "}
                  <strong className="text-primary/60">cover image</strong> of
                  your restaurant.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <FormNavigation loading={images.length === 0} />
    </form>
  );
};

export default ResImageUploader;
