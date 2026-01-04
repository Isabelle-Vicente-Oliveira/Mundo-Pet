import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"


const form = document.querySelector("form");
const tutorName = document.getElementById("tutor")
const petName = document.getElementById("pet")
const tutorPhone = document.getElementById("phone")
const descriptionText = document.getElementById('description')
const selectedDate = document.getElementById("form-date");
const selectedHour = document.getElementById("form-hour");

form.onsubmit = async (event) => {
    event.preventDefault();


    try {
        const name = tutorName.value.trim();
        if (!name) {
            return alert("Informe o nome do tutor");
        }
        const pet = petName.value.trim();
        if (!pet) {
            return alert("Informe o nome do pet");
        }
        const phone = tutorPhone.value.trim();

        if (!phone) {
            return alert("Informe o telefone");
        }
        const description = descriptionText.value.trim();

        if (!description) {
            return alert("Informe a descrição");
        }


        const date = selectedDate.value;
        const time = selectedHour.value;

        if (!date || !time) {
            return alert("Data ou horário inválidos");
        }

        const [hour, minute] = time.split(":");

        dayjs.extend(utc);
        dayjs.extend(timezone);

        const when = dayjs
            .utc(`${date} ${time}`, "YYYY-MM-DD HH:mm")
            .second(0);

        await scheduleNew({
            id: Date.now(),
            name,
            pet,
            phone,
            description,
            when: when.toISOString(),
        });

        await schedulesDay()
    } catch (error) {
        alert("não foi possível realizar o agendamento");
        console.log(error);
    }
};

