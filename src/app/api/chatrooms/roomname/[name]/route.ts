import { connectDB } from "@/db/connectDB";
import ChatRoom from "@/models/ChatRoom";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
    const { name } = params;

    try {
        await connectDB();
        const result = await ChatRoom.findOne({ roomName: name });
        const newAllMessages = await result?.allMessages;

        return new NextResponse(JSON.stringify(newAllMessages), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
}

export const PATCH = async (req: NextRequest, { params }: { params: any }) => {
    const { name } = params;
    const { message } = await req.json();

    try {
        await connectDB();
        const result = await ChatRoom.findOne({ roomName: name });
        const allMessages = await result?.allMessages;
        const newAllMessages = [...allMessages, message];
        const updateDoc = {
            $set: {
                allMessages: newAllMessages
            }
        };

        const response = await ChatRoom.findOneAndUpdate({ roomName: name }, updateDoc);
        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { name: string } }) => {
    const { name } = params;

    try {
        await connectDB();

        const result = await ChatRoom.findOneAndDelete({ roomName: name });
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
};