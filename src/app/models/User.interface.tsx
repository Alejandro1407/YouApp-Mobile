export interface User {
    id: string;
    nombres?: string;
    apellidos: string;
    email: string;
    username: string;
    birthday?: Date;
    photo?: string;
    fullName?: string;
  }