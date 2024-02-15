import { connectDB } from "@/db/connectDB";
import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params}: {params: any}) => {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('user');

    const {email} = params;

    try {
        await connectDB();
        let appointments;
        if(query === 'doctor') {
            appointments = await Appointment.find({doctorEmail: email});
        }

        if(query === 'patient') {
            appointments = await Appointment.find({patientEmail: email});
        }

        return new NextResponse(JSON.stringify(appointments), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status })
    }
}