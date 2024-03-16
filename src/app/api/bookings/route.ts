import { connectDB } from "@/db/connectDB";
import Booking from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectDB();

        const result = await Booking.find({});
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};

export const POST = async (req: NextRequest) => {
    const booking = await req.json();

    try {
        await connectDB();

        const newBooking = new Booking(booking);

        await newBooking.save();

        return new NextResponse('New Booking Has Been Created...', { status: 201 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
}