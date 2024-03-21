import "next-auth";

declare module "next-auth" {
    interface User {
      accessToken: any;
    }
  
    interface Session {
      accessToken: string;
      roles: Role[];
      error: string;
    }
  }

declare module "next-auth/jwt" {
    interface JWT {
      accessToken: any;
      roles: Role[];
      error: string;
    }
  }