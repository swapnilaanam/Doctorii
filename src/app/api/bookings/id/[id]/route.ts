import { connectDB } from "@/db/connectDB";
import Booking from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, {params}: {params: {id: string}}) => {
    const {id} = params;

    const {diagnosisResult} = await req.json();

    try {
        await connectDB();
        
        const updateDoc = {
            $set: {
                result: diagnosisResult
            }
        };

        const result = await Booking.findByIdAndUpdate(id, updateDoc);
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};