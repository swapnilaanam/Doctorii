"use client";

import HealthtoolsBanner from "@/components/HealttoolsBanner/HealthtoolsBanner"
import { useState } from "react";

const CaloriesConverter = () => {
    const [kilojoulesValue, setKilojoulesValue] = useState(0);

    return (
        <section className="px-4 py-4 md:px-0 md:py-0">
            <HealthtoolsBanner title="Calories Converter" />
            <div>
                <h1 className="text-4xl text-center font-medium py-16">Calories Converter</h1>
                <form className="mb-20 flex flex-col md:flex-row justify-center items-center gap-5">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                        <label htmlFor="calories" className="text-2xl font-medium">
                            Calories:
                        </label>
                        <input type="number" id="calories" name="calories" className="bg-blue-200 py-1 px-2" defaultValue={0} onChange={(e) => setKilojoulesValue(((e.target.value) * 4.184).toFixed(2))} />
                    </div>
                    <div className="text-2xl font-semibold">
                        =
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                        <input type="number" id="kilojoules" name="kilojoules" className="bg-blue-200 py-1 px-2" value={kilojoulesValue} />
                        <label htmlFor="kilojoules" className="text-2xl font-medium">
                            :Kilojoules
                        </label>
                    </div>
                </form>
                <div className="text-center text-2xl font-medium text-green-600 mb-20">
                    <h4>1 Calorie = 4.184 Kilojoules</h4>
                </div>
            </div>
        </section>
    )
}

export default CaloriesConverter