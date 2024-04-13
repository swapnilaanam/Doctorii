import { connectDB } from "@/db/connectDB";
import Payment from "@/models/Payment";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
    const { email } = params;

    try {
        await connectDB();

        const result = await Payment.find({email: email});
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};