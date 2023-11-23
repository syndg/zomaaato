import { createResImages } from "@/actions/createResImages";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

const f = createUploadthing();

const authCheck = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "2MB" } })
    .input(z.string())
    .middleware(({ req, input }) => {
      const userId = authCheck();

      return { userId, resId: input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const imgData = await createResImages(metadata.resId, file.url, file.key);

      if (!imgData) {
        throw new Error("Database upload failed.");
      }

      return { uploadedBy: metadata.userId, ...imgData };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
