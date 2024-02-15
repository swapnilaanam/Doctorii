import { connectDB } from "@/db/connectDB";
import ChatRoom from "@/models/ChatRoom";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
    const { name } = params;
    try {
        await connectDB();
        const result = await ChatRoom.find({ doctorName: name });
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
};