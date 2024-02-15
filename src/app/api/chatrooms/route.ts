import { connectDB } from "@/db/connectDB";
import ChatRoom from "@/models/ChatRoom";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectDB();
        const result = await ChatRoom.find({});
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status })
    }
};

export const POST = async (req: NextRequest) => {
    const chatRoom = await req.json();

    await connectDB();
    const newChatRoom = new ChatRoom(chatRoom);

    try {
        await newChatRoom.save();
        return new NextResponse('New ChatRoom Created...', { status: 201 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
};