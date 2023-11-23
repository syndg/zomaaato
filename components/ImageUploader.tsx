"use client";
import React from "react";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";

type Image = {
  imageUrl: string;
  utKey: string;
};

interface ImageUploaderProps {
  resId: string;
  dbImages: Image[];
}

const ImageUploader = ({ resId, dbImages }: ImageUploaderProps) => {
  const [canUpload, setCanUpload] = React.useState(false);
  const [images, setImages] = React.useState<Image[]>(dbImages);

  const handleDelete = async (key: string) => {
    // TODO: Add delete API route for images.

    const filteredImages = images.filter((image) => image.utKey !== key);
    setImages(filteredImages);
  };

  React.useEffect(() => {
    if (images.length < 3) {
      setCanUpload(true);
    } else {
      setCanUpload(false);
    }
  }, [images]);

  return (
    <>
      {canUpload && (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImages((prev) => [
              ...prev,
              { imageUrl: res[0].serverData.imageUrl, utKey: res[0].key },
            ]);
          }}
          onUploadError={(err) => {
            console.log(err);
          }}
          input={resId}
        />
      )}
      <div className="grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.utKey}
            className="relative grid place-content-center border-2 border-gray-300 rounded-md"
          >
            <Image
              src={image.imageUrl}
              alt="Uploaded restaurant image"
              width={400}
              height={400}
            />
            <button
              onClick={() => handleDelete(image.utKey)}
              className="absolute right-0"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUploader;
