import { Model, ModelStatic } from "@sequelize/core";
import { findByPrimaryKeyModel } from "../repositories";
import { uploadImageBase64ToStorage } from "./firebaseStorage";
import { baseImageUrls, baseUrlStorageGoogle } from "../constants/constants";
import { deleteFile } from "../repositories/firebaseStorage";
import { handleErrorFunction } from "../utils/handleError";

export const updateImage = async <T extends { id: number; image?: string; }>(data: T, model: ModelStatic<Model<T, T>>) => {
  const { image, id } = data;

  if (!image) {
    delete data.image;

    return;
  }

  try {
    data.image = await uploadImageBase64ToStorage(image, "users");

    if (!id) return;

    const { image: oldUrl } = (await findByPrimaryKeyModel<T>({ model, attributes: ["image"], primaryKey: id }))?.dataValues!;

    if (!oldUrl || baseImageUrls.includes(oldUrl)) return;

    const fileName = oldUrl.split(baseUrlStorageGoogle)[1].split('?')[0];

    await deleteFile(fileName);
  } catch (error) {
    throw handleErrorFunction(error);
  }
};