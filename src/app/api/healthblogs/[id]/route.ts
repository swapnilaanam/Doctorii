import { connectDB } from "@/db/connectDB";
import HealthBlog from "@/models/HealthBlog";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {id} = params;

    try {
        await connectDB();

        const result = await HealthBlog.findById(id);
        return new NextResponse(JSON.stringify(result), {status: 200});
    } catch (error: any) {
        return new NextResponse(error?.message, {status: error?.status});
    }
};