import { Account, User as AuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/database";
import User from "@/models/user.model";
import { v4 as uuidv4 } from "uuid";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectToDB();
        try {
          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google") {
        await connectToDB();
        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const user_id = uuidv4();

            const newUser = new User({
              id: user_id,
              email: user.email,
              name: user.name,
              image: user.image,
            });

            await newUser.save();
          }
          return true;
        } catch (error: any) {
          console.log("Error saving user", error);
          return false;
        }
      }
    },
  },
};
