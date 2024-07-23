import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "../../../modules/authentication/controllers/database_connection";
import UserModel from "../../../modules/authentication/models/user_schema";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: "https://accounts.google.com/o/oauth2/v2/auth?prompt=select_account",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const db = await connectToDatabase().catch((err) => {
          err;
        });

        // check if user exists
        const result = await UserModel.findOne({ email: credentials?.email });
        if (!result) {
          throw new Error("User with not found!");
        }

        const checkPassword = await compare(credentials!.password, result.password);

        if (!checkPassword || result.email !== credentials?.email) {
          throw new Error("Username and password do not match!");
        }

        return result;
      },
    }),
  ],
  secret: "8D612ztw+AHITNBRY+kXWBY5ySbM0ejTekbZYyyY2n0=",
});
