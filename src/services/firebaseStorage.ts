import { uploadFile } from "../repositories/firebaseStorage";
import { compreesImage } from "../utils/functions";
import { handleErrorFunction } from "../utils/handleError";
import short from "short-uuid";

export const uploadImageBase64ToStorage = async (image: string, pathProp: string) => {
  try {
    const fileBase64 = image.split(",")[1];
    const fileName = `${short.generate()}.jpeg`;
    const path = `images/${pathProp}/${fileName}`;
    const buffer = Buffer.from(fileBase64, "base64");

    const content = await compreesImage(buffer);
    const url = await uploadFile(path, content);

    return url;
  } catch (error) {
    throw handleErrorFunction(error);
  }
};