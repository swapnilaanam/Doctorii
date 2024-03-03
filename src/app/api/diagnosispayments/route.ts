import { connectDB } from "@/db/connectDB";
import DiagnosisPayment from "@/models/DiagnosisPayment";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    const diagnosisPayment = await req.json();

    try {
        await connectDB();

        const newDiagnosisPayment = await new DiagnosisPayment(diagnosisPayment);

        await newDiagnosisPayment.save();

        return new NextResponse('New Diagnosis Payment Has Been Added...', {status: 201});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};