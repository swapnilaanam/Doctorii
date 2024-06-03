import { connectDB } from "@/db/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const PATCH = async (req: NextResponse, { params }: { params: { email: string } }) => {
    const { email } = params;

    try {
        await connectDB();

        const updateDoc = {
            $set: {
                doctorRole: 'Regular Doctor'
            }
        };
        const result = await User.findOneAndUpdate({ email: email }, updateDoc);
        return new NextResponse(result, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
};