import { connectDB } from "@/db/connectDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
    const { category } = params;
    let formattedCategory;

    if (category === 'regulardoctors') {
        formattedCategory = 'Regular Doctor';
    }
    else if (category === 'childandgynecologistdoctors') {
        formattedCategory = 'Child And Gynecologist Doctor';
    }
    else if (category === 'heartspecialistdoctors') {
        formattedCategory = 'Heart Specialist Doctor';
    }
    else if (category === 'bonespecialistdoctors') {
        formattedCategory = 'Bone Specialist Doctor';
    }
    else if (category === 'eyespecialistdoctors') {
        formattedCategory = 'Eye Specialist Doctor';
    }

    try {
        await connectDB();

        const result = await User.find({ role: 'Doctor', doctorRole: formattedCategory });
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status })
    }
};