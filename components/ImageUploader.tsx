"use client";
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import axios from "axios";
import { cn } from "@/lib/utils";

type Image = {
  imageUrl: string;
  utKey: string;
  id: string;
};

interface ImageUploaderProps {
  resId: string;
  dbImages: Image[];
  maxImages?: number;
}

const ImageUploader = ({
  resId,
  dbImages,
  maxImages = 3,
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [canUpload, setCanUpload] = React.useState(false);
  const [images, setImages] = React.useState<Image[]>(dbImages);

  const handleDelete = async (key: string, id: string) => {
    axios.delete(`/api/restaurants/${resId}/resImages?id=${id}&utKey=${key}`);

    const filteredImages = images.filter((image) => image.utKey !== key);
    setImages(filteredImages);
  };

  React.useEffect(() => {
    if (images.length < maxImages) {
      setCanUpload(true);
    } else {
      setCanUpload(false);
    }
  }, [images]);

  return (
    <div
      className={cn(
        "grid h-[80vh] place-content-center gap-2",
        images.length > 0 && "gap-12",
      )}
    >
      {images.length === 0 && !isUploading && (
        <h1 className="text-xl md:text-2xl font-semibold">
          You have not uploaded any images
        </h1>
      )}
      <div className={`grid grid-cols-${images.length} gap-2`}>
        {images.map((image) => (
          <div
            key={image.utKey}
            className="relative grid place-content-center rounded-lg"
          >
            <Image
              src={image.imageUrl}
              alt="Uploaded restaurant image"
              width={300}
              height={300}
              className="border-2 border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleDelete(image.utKey, image.id)}
              className="absolute -top-2 -right-2 bg-white text-gray-500 rounded-md border-2 border-gray-300 hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
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
              image(s).
            </p>
          ) : (
            <p className="text-center mt-2">
              Delete one or more images to upload again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
