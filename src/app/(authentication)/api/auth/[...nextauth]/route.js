import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    rolling: false,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const db = await connectDB();
        let currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          currentUser = await db.collection("recruiter").findOne({ email });
        }
        if (!currentUser) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }

        // Add user role to the user object
        const user = {
          ...currentUser,
          role: currentUser?.role, // Default role if none is set
        };

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Add role to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add the user role to the token
      }
      return token;
    },

    // Add role to the session object
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role; // Make role available in the session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
// callbacks: {
//   async signIn({ user, account }) {
//     if (account.provider === "google" || account.provider === "github" || account.provider === "facebook") {
//       const { name, email, image } = user;
//       try {
//         const db = await connectDB();
//         const userCollection = db.collection("users");
//         const userExist = await userCollection.findOne({ email });
//         if (!userExist) {
//           const res = await userCollection.insertOne(user);
//           return user;
//         } else {
//           return user;
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       return user;
//     }
//   },
// },

// });

// export { handler as GET, handler as POST };
