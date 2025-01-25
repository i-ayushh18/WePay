import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"phone" | "password", string> | undefined) {
        if (!credentials) {
          return null;
        }

        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone
          }
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number
            };
          } else {
            return null;
          }
        } else {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          try {
            const user = await db.user.create({
              data: {
                number: credentials.phone,
                password: hashedPassword
              }
            });
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.number
            };
          } catch (e) {
            console.error("Error creating user:", e);
            return null;
          }
        }
      }
    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // Type-safe session handling
    async session({ token, session }: { token: any, session: any }) {
      session.user.id = token.sub; // token.sub will be set in jwt callback
      return session;
    },
    // Token handling for NextAuth JWT
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.sub = user.id; // store the user id in token
      }
      return token;
    }
  }
};
