export interface PaginationProps {
  page: number;
  limit: number;
}

export interface QueryDates {
  createdAt?: Date;
  startCreatedAt?: string;
  endCreatedAt?: string;
}