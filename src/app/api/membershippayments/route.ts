import { connectDB } from "@/db/connectDB";
import MembershipPayment from "@/models/MembershipPayment";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const membershipPayment = await req.json();

    await connectDB();

    const newMembershipPayment = new MembershipPayment(membershipPayment);

    try {
        const result = await newMembershipPayment.save();
        return new NextResponse(JSON.stringify(result), { status: 201 });
    } catch (error: any) {
        return new NextResponse(error?.message, error?.status);
    }
}; 