const periods = document.querySelectorAll(".period");
import { scheduleCancel } from "./../../services/schedule-cancel.js";
import { schedulesDay } from "./load.js"


periods.forEach((period) => {
    period.addEventListener("click", async (event) => {
        if (event.target.classList.contains("btn-remove")) {

            const item = event.target.closest("li");

            const id = item.getAttribute("data-id");

            if (id) {
                const isConfirm = confirm("Tem certeza que deseja cancelar este agendamento?");

                if (isConfirm) {

                    await scheduleCancel({ id })
                    schedulesDay()

                }
            }
        }
    });
});