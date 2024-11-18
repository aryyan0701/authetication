import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    });

                    if (!user) {
                        throw new Error('No user found with these credentials');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    session: {
        strategy: "jwt" 
    },
     callbacks: {
    async jwt({ token, user }) {
    console.log("JWT Callback - Token before:", token);
      if (user) {
        token.id = user.id
        token.email = user.email;
      }
      console.log("JWT Callback - Token after:", token);
      return token
    },
    async session({ session, token }) {
        console.log("Session Callback - Token:", token);
      if (session.user) {
        session.user._id = token.id as string
        session.user.email = token.email as string
    }
    console.log("Session Callback - Session:", session);
      return session
    },
  },
    pages: {
        signIn: "/sign-in" 
    },
    secret: process.env.NEXTAUTH_SECRET
});
