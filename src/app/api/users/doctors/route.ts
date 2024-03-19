import { connectDB } from "@/db/connectDB";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
    try {
        await connectDB();

        const result = await User.find({role: 'Doctor'});
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};