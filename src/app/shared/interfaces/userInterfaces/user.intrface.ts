export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AuthData;
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profile_picture: string;
  role: 'user' | 'admin'; // Adjust if more roles exist
  deletedAt: string | null;
  joining_date: string;
  last_password_update: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
