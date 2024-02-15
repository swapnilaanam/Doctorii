'use client';

import HealthtoolsBanner from "@/components/HealttoolsBanner/HealthtoolsBanner";
import { useState } from "react";

const IdealHeartRate = () => {
    const [maxHeartRateValue, setMaxHeartRateValue] = useState(0);
    const [lowIntensityRangeLow, setLowIntensituRangeLow] = useState(0);
    const [lowIntensityRangeHigh, setLowIntensituRangeHigh] = useState(0);
    const [midIntensityRangeLow, setMidIntensituRangeLow] = useState(0);
    const [midIntensityRangeHigh, setMidIntensituRangeHigh] = useState(0);
    const [highIntensityRangeLow, setHighIntensituRangeLow] = useState(0);
    const [highIntensityRangeHigh, setHighIntensituRangeHigh] = useState(0);

    const handleCalculateIdealHeartRate = (e: Event) => {
        e.preventDefault();

        const form = e.target;

        const age = form.age.value;

        const maxHeartRate = 220 - age;

        setMaxHeartRateValue(maxHeartRate);

        setLowIntensituRangeLow(Number((0.5 * maxHeartRate).toFixed(2)));
        setLowIntensituRangeHigh(Number((0.7 * maxHeartRate).toFixed(2)));
        setMidIntensituRangeLow(Number((0.7 * maxHeartRate).toFixed(2)));
        setMidIntensituRangeHigh(Number((0.85 * maxHeartRate).toFixed(2)));
        setHighIntensituRangeLow(Number((0.85 * maxHeartRate).toFixed(2)));
        setHighIntensituRangeHigh(Number(maxHeartRate));
    }

    return (
        <section>
            <HealthtoolsBanner title="Ideal Heart Rate Teller" />
            <div>
                <h1 className="text-4xl text-center font-medium py-16">Ideal Heart Rate Teller</h1>
                <form onSubmit={(e) => handleCalculateIdealHeartRate(e)} className="mb-20 space-y-7">
                    <div className="flex items-center justify-center gap-3">
                        <label htmlFor="age" className="text-2xl font-medium">
                            Your Age:
                        </label>
                        <input type="number" id="age" name="age" className="bg-blue-200 py-1 px-2" />
                    </div>
                    <div className="text-center">
                        <input type="submit" value="Calculate Ideal Heart Rate" className="text-2xl font-medium bg-green-600 text-white px-7 py-1.5 cursor-pointer mt-5 rounded" />
                    </div>
                </form>
                <div className="mb-14 flex flex-col items-center space-y-4">
                    {
                        maxHeartRateValue !== 0 && (
                            <>
                                <h4 className="text-2xl text-green-600 font-medium">
                                    Your Ideal Max Heart Rate: {maxHeartRateValue}
                                </h4>
                                <h4 className="text-2xl text-green-600 font-medium">
                                    Your Ideal Low Intensity Excercise Heart Rate Range: {lowIntensityRangeLow} - {lowIntensityRangeHigh}
                                </h4>
                                <h4 className="text-2xl text-green-600 font-medium">
                                    Your Ideal Mid Intensity Excercise Heart Rate Range: {midIntensityRangeLow} - {midIntensityRangeHigh}
                                </h4>
                                <h4 className="text-2xl text-green-600 font-medium">
                                    Your Ideal High Intensity Excercise Heart Rate Range: {highIntensityRangeLow} - {highIntensityRangeHigh}
                                </h4>
                            </>

                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default IdealHeartRate;