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
  args: [0.01],
  msg: "El precio mínimo es de 0.01"
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
  args: [999_999],
  msg: "El stock máximo es de 999,999."
} as const;

export const minStock: Min = {
  args: [0],
  msg: "El stock del producto llego a 0."
} as const;

export const roleLength: Length = {
  args: [8, 22],
  msg: "Los caracteres permitidos son inválidos."
} as const;

export const typeMovementLength: Length = {
  args: [6, 7],
  msg: "Los caracteres permitidos son inválidos."
} as const;

export const filterKeys = ["pagina", "limite", "id", "name", "uid", "email", "phone", "role", "userId"];

export const baseUrlStorageGoogle = "https://storage.googleapis.com/trailas-texallc.appspot.com/";

export const baseImageUrls = [
  "https://firebasestorage.googleapis.com/v0/b/trailas-texallc.appspot.com/o/images%2Fcategories%2Fnodisponible.jpg?alt=media&token=aa35fbcc-1b02-4d38-a3a5-c76750168ba3",
  "https://firebasestorage.googleapis.com/v0/b/trailas-texallc.appspot.com/o/images%2Fproducts%2Fno-imagen.png?alt=media&token=2f32955a-776a-453d-bc89-f66b0a78725a",
  "https://firebasestorage.googleapis.com/v0/b/trailas-texallc.appspot.com/o/images%2Fprofiles%2Fprofile-user-icon-isolated-on-white-background-eps10-free-vector.jpg?alt=media&token=2f3c8ccc-6c20-4a83-81d6-8bb28b7ac167"
];