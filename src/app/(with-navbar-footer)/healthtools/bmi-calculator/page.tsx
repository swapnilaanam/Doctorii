'use client';

import HealthtoolsBanner from "@/components/HealttoolsBanner/HealthtoolsBanner";
import { useState } from "react";

const BMICalculator = () => {
    const [BMI, setBMI] = useState(null);

    const handleCalculateBMI = (e: Event) => {
        e.preventDefault();
        const form = e.target;

        const weight = Number(form.yourweight.value);
        const height = Number(form.yourheight.value);

        const bmi = (weight / ((height / 100) * (height / 100)));

        setBMI(bmi.toFixed(1));
    };

    return (
        <section>
            <HealthtoolsBanner title="BMI Calculator" />
            <div>
                <h1 className="text-4xl text-center font-medium py-16">Calculate Your BMI</h1>
                <form onSubmit={(e) => handleCalculateBMI(e)} className="mb-20 space-y-7">
                    <div className="flex items-center justify-center gap-3">
                        <label htmlFor="yourweight" className="text-2xl font-medium">
                            Your Weight:
                        </label>
                        <div className="flex justify-center items-center">
                            <input type="number" id="yourweight" name="yourweight" className="bg-blue-200 py-1 px-2" />
                            <div className="bg-yellow-400 py-1 px-2">in K.G</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <label htmlFor="yourheight" className="ms-1 text-2xl font-medium">
                            Your Height:
                        </label>
                        <div className="flex justify-center items-center">
                            <input type="number" id="yourheight" name="yourheight" className="bg-blue-200 py-1 px-2" />
                            <div className="bg-yellow-400 py-1 px-2">in C.M</div>
                        </div>
                    </div>
                    <div className="text-center">
                        <input type="submit" value="Calculate Your BMI" className="text-2xl font-medium bg-green-600 text-white px-7 py-1.5 cursor-pointer mt-5 rounded" />
                    </div>
                </form>
                <div className="mb-14">
                    {
                        BMI && (
                            <h4 className="text-2xl font-medium text-center">Your BMI Is {BMI}</h4>
                        )
                    }
                    {
                        BMI < 18.5 && <h4 className="text-xl font-medium text-center text-sky-500 mt-4">You are in underweight state. Eat Healty Food.</h4>
                    }
                    {
                        (BMI >= 18.5 && BMI <= 24.9) && <h4 className="text-xl font-medium text-center text-green-600 mt-4">You are in normal state.</h4>
                    }
                    {
                        (BMI >= 25 && BMI <= 29.9) && <h4 className="text-xl font-medium text-center text-yellow-600 mt-4">You are in overweight state. Keep doing excercise.</h4>
                    }
                    {
                        BMI >= 30 && <h4 className="text-xl font-medium text-center text-red-600 mt-4">You are in obesity state. Do Exercise And Improve Your Life Style.</h4>
                    }
                </div>
            </div>
        </section>
    )
}

export default BMICalculator;