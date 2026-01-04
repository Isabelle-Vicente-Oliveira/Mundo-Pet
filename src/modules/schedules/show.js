import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export function schedulesShow({ dailySchedules }) {
    try {
        periodMorning.innerHTML = "";
        periodAfternoon.innerHTML = "";
        periodNight.innerHTML = "";

        dailySchedules.forEach((schedule) => {
            const item = document.createElement("li");
            item.classList.add("appointment-card");

            item.setAttribute("data-id", schedule.id);

            dayjs.extend(utc);
            const hour = dayjs.utc(schedule.when).format("HH:mm");

            item.innerHTML = `
                <div class="appointment-details">
                    <p class="appointment-text">
                        <span class="appointment-time">${hour}</span>
                        ${schedule.pet} /
                        <span class="tutor-name">${schedule.name}</span>
                    </p>
                    <p class="appointment-service">${schedule.description}</p>
                </div>
                <button class="btn-remove">Remover agendamento</button>
            `;

            const hourInt = dayjs(schedule.when).hour();

            if (hourInt < 12) {
                periodMorning.appendChild(item);
            } else if (hourInt >= 12 && hourInt < 18) {
                periodAfternoon.appendChild(item);
            } else {
                periodNight.appendChild(item);
            }
        });
    } catch (error) {
        alert("Não foi possível exibir os agendamentos");
        console.error("error: ", error);
    }
}