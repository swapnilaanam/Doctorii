const bcrypt = require('bcryptjs');
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/db/connectDB"
import User from "@/models/User"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials: any) {
                await connectDB();

                try {
                    const user = await User.findOne({ email: credentials.email });

                    if (user) {
                        const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);

                        if (isPasswordMatched) {
                            // console.log(user);
                            return user;
                        }
                        else {
                            throw new Error("Wrong Credentials!");
                        }
                    }
                    else {
                        throw new Error("User Not Found!");
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === 'google') {
                try {
                    await connectDB();

                    const user = await User.findOne({ email: profile?.email })

                    if (!user) {
                        let newUser = new User({ name: profile?.name, email: profile?.email, profilePic: profile?.picture, role: "Patient" });
                        await newUser.save();
                    }
                    return true;
                }
                catch (error) {
                    console.log(error);
                    return false;
                }
            }

            return true;
        },
        async session({ session, token, user }) {
            try {
                await connectDB();

                const userInfo = await User.findOne({ email: session.user?.email });

                if (userInfo) {
                    session.user.image = userInfo?.profilePic
                }

                return session;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    }
})

export { handler as GET, handler as POST };