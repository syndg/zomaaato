import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "2MB" } })
    .input(z.string())
    .middleware(async ({ req, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("Unauthorized");
      }
      console.log(req.url);
      console.log("INPUT", input);

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      console.log("file name", file.name);

      return { uploadedBy: metadata.userId, url: file.url };
    }),

  multipleImages: f({
    image: { maxFileCount: 3, maxFileSize: "2MB" },
  })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("FILE", file);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
