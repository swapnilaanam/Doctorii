import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

// console.log(process.env.PAYMENT_SECRET_KEY);


export const POST = async (req: NextRequest) => {
    const { price } = await req.json();
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number((price * 100).toFixed(2)),
            currency: "usd",
            payment_method_types: [
                "card"
            ],
        });

        return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error?.message, { status: error?.status });
    }
}