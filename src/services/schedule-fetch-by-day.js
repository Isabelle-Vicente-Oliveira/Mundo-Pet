import dayjs from "dayjs";
import { apiConfig } from "./api-config.js"

export async function scheduleFetchByDay({ date }) {
    try {
        const response = await fetch(`${apiConfig.baseUrl}/schedules`)

        const data = await response.json()

        const dailyschedule = data.filter((schedule) =>
            dayjs(date).isSame(schedule.when, "day")
        )

        return dailyschedule;

    } catch (error) {
        console.log(error);
        alert("nao foi possível ver os agendamentos")
    }
}