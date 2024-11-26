export interface ApiResponse<T> {
  success: boolean;
  errors: Array<{
    errorCode: number;
    fieldName: string;
    description: string;
  }>;
  data: T;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}
