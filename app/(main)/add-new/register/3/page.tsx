"use client";

import { UploadButton } from "@/lib/uploadthing";

import { FormNavigation } from "@/components/forms/form-nav";
export default function FormPage3() {
  return (
    <div>
      <h1>Form Page 3</h1>
      <FormNavigation />
      <UploadButton
        className="ut-button:bg-primary"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("URL", res[0].url);
        }}
        onUploadError={(err: Error) => {
          console.log("Error: ", err);
        }}
        input="yo"
      />
      <UploadButton
        endpoint="multipleImages"
        onClientUploadComplete={(res) => {
          res.map((img) => console.log("URL: ", img.url));
        }}
      />
    </div>
  );
}
