import { ReactNode } from "react";

export interface WithChildren {
  children: ReactNode;
}
export interface ErrorResponse {
  statusCode: number;
  success: boolean;
  message?: string;
}

export type API_RESPONSE<T> = {
  message: string;
  statusCode: number;
  success: boolean;
  data: T;
};

export type ApiPagination<T> = {
  data: T
  pagination: {
    totalPages: number;
    totalItems: number;
  };
  success: boolean;
  message: string;
  statusCode: number;
};

export type PaginationResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type CountResponse = {
  count: number;
};

export interface PaginationParams {
  limit?: string;
  page?: string;
}
