export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface User {
    id: string;
    email: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface AuthToken {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
}
export interface ErrorResponse {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}
export interface PaginationParams {
    page: number;
    limit: number;
    sort?: string;
    order?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}
//# sourceMappingURL=index.d.ts.map