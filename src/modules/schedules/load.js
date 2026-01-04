import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "../schedules/show.js"
import dayjs from "dayjs";


const selectedDate = document.getElementById("date")
if (!selectedDate.value) {
    selectedDate.value = dayjs().format("YYYY-MM-DD")
}

export async function schedulesDay() {
    const date = selectedDate.value;
    const dailySchedules = await scheduleFetchByDay({ date });
    schedulesShow({ dailySchedules });
}