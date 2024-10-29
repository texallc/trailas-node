import { Response } from "express";

export const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });

export const handleErrorFunction = (error: unknown) => {
  console.log(error);

  if (typeof error === "string") throw new Error(error);

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("Error en el servidor!");
};

export const handleError = (res: Response, error: any) => {
  console.log(error);

  if (error instanceof Error) return res.status(500).json({ error: error.message });

  if (typeof error === "string") return res.status(500).json({ error });

  return res.status(500).json({ error: JSON.stringify(error) });
};

export default handleError;