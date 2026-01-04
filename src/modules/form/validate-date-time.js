import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";

const selectedDate = document.getElementById("form-date");
const selectedHour = document.getElementById("form-hour");
const selectedButtonSubmit = document.getElementById("button-submit");

const today = dayjs().format("YYYY-MM-DD");
let unavailableHours = [];

selectedDate.value = today;
selectedDate.min = today;
dayjs.extend(utc);


async function updateHourLimits() {
    const selectedDay = selectedDate.value;
    const isToday = selectedDay === today;

    const dailySchedules = await scheduleFetchByDay({ date: selectedDay });


    unavailableHours = dailySchedules.map(schedule =>
        dayjs.utc(schedule.when).format("HH:mm")
    );

    let minHour = isToday ? dayjs().format("HH:mm") : "09:00";
    selectedHour.min = minHour;
    selectedHour.max = "21:00";

    validateHour();
}

function validateHour() {
    const value = selectedHour.value;
    if (!value) return;

    const isOutOfBounds = value < selectedHour.min || value > selectedHour.max;

    const isOccupied = unavailableHours.includes(value);

    const isInvalid = isOutOfBounds || isOccupied;

    selectedHour.classList.toggle("invalid", isInvalid);
    selectedButtonSubmit.disabled = isInvalid;

    if (isOccupied) {
        alert("Este horário já está agendado! Por favor, escolha outro.");
        selectedHour.value = "";
    }
}
selectedDate.addEventListener("change", async () => {
    selectedHour.value = "";
    await updateHourLimits();
});

selectedHour.addEventListener("input", validateHour);

updateHourLimits();