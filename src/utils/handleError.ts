import { Response } from "express";

export const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });

export const handleErrorFunction = (error: unknown) => {
  console.log(error);

  if (typeof error === "string") throw error;

  if (error instanceof Error) {
    throw error.message;
  }

  throw "Error en el servidor!";
};

export const handleError = (res: Response, err: any) => {
  console.log(err);

  if (err instanceof Error) return res.status(500).json(err.message);

  if (typeof err === "string") return res.status(500).json(err);

  return res.status(500).json(JSON.stringify(err));
};

export default handleError;