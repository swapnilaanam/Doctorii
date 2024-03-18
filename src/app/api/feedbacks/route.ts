import { connectDB } from "@/db/connectDB";
import Feedback from "@/models/Feedback";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
    try {
        await connectDB();

        const result = await Feedback.find({});
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};

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