import { connectDB } from "@/db/connectDB";
import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, {params}: {params: {id: string}}) => {
    const {id} = params;

    const {appointmentStatus} = await req.json();

    try {
        await connectDB();

        const updateDoc = {
            $set: {
                isAppointmentCompleted: appointmentStatus
            }
        };

        const result = await Appointment.findByIdAndUpdate(id, updateDoc);
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        await connectDB();
        await Appointment.findByIdAndDelete(id);
        return new NextResponse("Appointment Cancelled Successfully!", { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
};