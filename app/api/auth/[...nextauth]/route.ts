import axios from "axios";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import httpsProxyFix from "axios-https-proxy-fix";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

const https = require('https');

const axiosInstance = axios.create({
  baseURL: apiUrl,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    // This is a workaround for self-signed certificates in development
    // Remove this if you have a proper certificate
    checkServerIdentity: () => { }
  }),
});


const roleClaims =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

// const refreshAccessToken = async (token: JWT) => {
//   try {
//     const accessToken = token.accessToken;
//     const refreshToken = token.refreshToken;

//     const response = await axios.post(`${apiUrl}/Login/ObtenerRefreshToken`, {
//       accessToken,
//       refreshToken,
//     });

//     token.accessToken = response.data.accessToken;
//     token.refreshToken = response.data.refreshToken;

//     return token;
//   } catch (error) {
//     console.error(error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// };


const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: "Sign In",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) throw new Error("Credenciales inválidas");
               try{ 
                  const result = await axiosInstance.post(
                    `${apiUrl}/Login`,
                    {
                        email,
                        password,
                    }

                  );
                  console.log(result);

                  const user = {
                    ...result.data,
                  };
        
                  return user;
                }catch (error) {
                    throw error;
                }
                
            
            },
            
        }),
    ],
    pages: {
      signIn: "/"
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      // async jwt({ token, user }: { token: JWT; user: User }) {
      //   if (user) {
      //     const parsedToken = JSON.parse(
      //       Buffer.from(user.accessToken.split(".")[1], "base64").toString()
      //     );
      //     token.accessToken = user.accessToken;
      //     token.refreshToken = user.refreshToken;
      //     token.roles = [];
      //     if (parsedToken[roleClaims] instanceof Array)
      //       token.roles = [...parsedToken[roleClaims]];
      //     else token.roles.push(parsedToken[roleClaims]);
  
      //     return token;
      //   }
      //   if (Date.now() / 1000 < token.accessToken.exp) return token;
      //   return refreshAccessToken(token);
      // },
      // async session({ session, token }: { session: Session; token: JWT }) {
      //   if (token) {
      //     session.accessToken = token.accessToken;
      //     session.roles = token.roles;
      //     session.error = token.error;
      //   }
      //   return session;
      
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token }) {
        session.user = token as any;
        return session;
    },
  }

  });

export { handler as GET, handler as POST };
