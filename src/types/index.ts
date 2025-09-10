export interface Link {
  id: string;
  originalUrl: string;
  slug: string;
  clicks: number;
  createdAt: string;
}

export interface CreateLinkRequest {
  originalUrl: string;
  slug?: string;
}

export interface CreateLinkResponse {
  id: string;
  originalUrl: string;
  slug: string;
  clicks: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
