import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

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
                  const result = await axios.post(
                    `${apiUrl}/Login`,
                    {
                        email,
                        password,
                    }
                  );
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
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token }) {
        session.user = token as any;
        return session;
      },
    },
    pages: {
      signIn: "/"
    },
    session: {
      strategy: "jwt",
    },
  });

export { handler as GET, handler as POST };
