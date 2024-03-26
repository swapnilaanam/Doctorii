import { connectDB } from "@/db/connectDB";
import Membership from "@/models/Membership";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
    const { email } = params;

    try {
        await connectDB();

        const result = await Membership.findOne({ email: email });
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status })
    }
};