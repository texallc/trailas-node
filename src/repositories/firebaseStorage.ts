import { storage } from "../firebase";

export const uploadFile = async (path: string, content: Buffer) => {
  try {
    const file = storage.bucket().file(path);

    await file.save(content);

    const [url] = await file.getSignedUrl({ action: "read", expires: "01-01-2045" });

    return url;
  } catch (error) {
    console.log(error);
    throw new Error("Error al subir el archivo.");
  }
};

export const deleteFile = async (fileName: string) => {
  try {
    const file = storage.bucket().file(fileName);

    await file.delete();
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar el archivo.");
  }
};
