import { connectDB } from "@/db/connectDB";
import Feedback from "@/models/Feedback";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    const feedback = await req.json();

    try {
        await connectDB();

        const newFeedback = new Feedback(feedback);

        const result = await newFeedback.save();
        return new NextResponse(JSON.stringify(result), {status: 201});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};