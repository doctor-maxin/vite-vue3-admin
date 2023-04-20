export type LoginPayload = {
    email: string;
    password: string;
  };
  export type IUser = {
    _id: string;
    name: string;
    email: string;
  };
  
  export type LoginResponse = {
    data?: {
        _id: string;
        email: string;
      };
    token?: string;Q
  };
  