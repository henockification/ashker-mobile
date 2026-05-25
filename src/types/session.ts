export type UserSession = {
    id: number;
    role: string;
    rolePath: string;
    firstName: string;
    created: number;
    accessLevel: number;
    iat: number;
    exp: number;
  };  