"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export const Calendar02 = () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));

    return (
        <Calendar
            mode="single"
            defaultMonth={date}
            numberOfMonths={2}
            selected={date}
            onSelect={setDate}
            className="rounded-lg border shadow-sm"
        />
    );
};
