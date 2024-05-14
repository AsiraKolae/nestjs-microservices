import "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    data: {
      token: string;
      user: {
        id: number;
        email: string;
        name: string;
        status: string;
        user_role: string;
        user_info: {
          phone: string;
          address: string;
        };
        user_img: string;
      };
    };
  }

  interface Session extends DefaultSession {
    user: {
      id: number;
      email: string;
      name: string;
      status: string;
      user_role: string;
      user_info: {
        phone: string;
        address: string;
      };
      user_img: string;
      address: {
        id: number;
        name: string;
        phone: string;
        address: string;
        default: boolean;
      }[];
    };
    expires: string;
    error: string;
  }
}
