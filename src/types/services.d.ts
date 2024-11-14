export type PaginatedListServiceProps<T extends {}> = Partial<T> & {
  pagina: number;
  limite: number;
};