import { connectDB } from "@/db/connectDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req: NextRequest, {params}: any) => {
    const {email} = params;

    try {
        await connectDB();
        const user = await User.findOne({email: email});

        if(user?.role === "Doctor") {
            return new NextResponse(true, {status: 200});
        }
        else {
            return new NextResponse(false, {status: 200})
        }
    } catch (error) {
        return new NextResponse("Database Error", {status: 500});
    }
};

export const PATCH = async(req: NextRequest, {params}: any) => {
    const {email} = params;

    const {doctorRole, chamberLocation} = await req.json();

    try {
        await connectDB();

        const updateDoc = {
            $set: {
                doctorRole: doctorRole,
                chamberLocation: chamberLocation
            }
        };

        const result = await User.findOneAndUpdate({email: email}, updateDoc);
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};