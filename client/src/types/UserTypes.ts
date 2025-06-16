export interface UserProps {
    email: string
    password: string
}

export type LoginErrors = Partial<Record<keyof UserProps, string[]>>

export interface CustomJwtPayload {
  UserInfo: {
    email: string;
    roles: number[];
  };
  iat: number;
  exp: number;
}
