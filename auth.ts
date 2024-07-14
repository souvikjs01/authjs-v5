import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { saltAndHashPassword } from "./utils/helper"


export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: 'text', placeholder: 'tyler@gmail.com'},
        password: {label: "Password", type: "password"}
      },
      authorize: async (credentials) => {
        if(!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password)

        let user: any = await db.user.findUnique({
          where: {
            email         
          }
        })

        if(!user) {
          const newUser = await db.user.create({
            data: {
              email,
              hashedPassword: hash
            }
          })
          return newUser;
        } else {
          const isMatch = bcrypt.compareSync(credentials.password as string, user.hashedPassword)
          if(!isMatch){
            throw new Error ('Incorrect password')
          }        
          return user;
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET
})