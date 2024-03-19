import { connectDB } from "@/db/connectDB";
import Membership from "@/models/Membership";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const result = await Membership.find({});
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};

export const POST = async (req: NextRequest) => {
    const membership = await req.json();

    await connectDB();
    const newMembership = new Membership(membership);

    try {
        const result = await newMembership.save();
        return new NextResponse(JSON.stringify(result), { status: 201 });
    } catch (error: any) {
        return new NextResponse(error?.message, error?.status);
    }
}; 