import "next-auth";

declare module "next-auth" {
    interface User {
      accessToken: any;
      refreshToken: any;
    }
  
    interface Session {
      email: string | null | undefined;
      accessToken: string;
      roles: Role[];
      error: string;
    }
  }

declare module "next-auth/jwt" {
    interface JWT {
      email: string | null | undefined;
      accessToken: any;
      refreshToken: string;
      roles: Role[];
      error: string;
    }
  }