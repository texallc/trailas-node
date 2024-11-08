import { Length, Max, Min } from "../interfaces/models";

export const isEmail: { msg: string; } = {
  msg: "El correo electrónico no es válido."
} as const;

export const phoneLength: Length = {
  args: [10, 10],
  msg: "El número telefónico tiene que ser de 10 dígitos."
} as const;

export const stringLength: Length = {
  args: [0, 255],
  msg: "Los caracteres permitidos son de 3 a 355."
} as const;

export const rfcLength: Length = {
  args: [0, 13],
  msg: "El RFC tiene que ser de 13 caracteres."
} as const;

export const stringLargeLength: Length = {
  args: [0, 3000],
  msg: "Los máximos caracteres permitidos son 3000."
} as const;

export const maxPrice: Max = {
  args: [999999],
  msg: "El precio máximo es de 999,999."
} as const;

export const minPrice: Min = {
  args: [0],
  msg: "El precio mínimo es de 0."
} as const;

export const maxDiscount: Max = {
  args: [100],
  msg: "El descuento máximo es de 100."
} as const;

export const minDiscount: Min = {
  args: [0],
  msg: "El descuento mínimo es de 0."
} as const;

export const maxStock: Max = {
  args: [999999],
  msg: "El stock máximo es de 999,999."
} as const;

export const minStock: Min = {
  args: [0],
  msg: "El stock mínimo es de 0."
} as const;

export const roleLength: Length = {
  args: [8, 22],
  msg: "Los caracteres permitidos son inválidos."
} as const;

export const typeMovementLength: Length = {
  args: [6, 7],
  msg: "Los caracteres permitidos son inválidos."
} as const;