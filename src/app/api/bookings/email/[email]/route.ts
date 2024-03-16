import Booking from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
    const { email } = params;

    try {
        const result = await Booking.find({ customerEmail: email });
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
};