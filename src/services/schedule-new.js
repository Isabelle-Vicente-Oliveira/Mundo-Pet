import { apiConfig } from "./api-config";

export async function scheduleNew({ id, name, pet, phone, description, when }) {
    try {
        await fetch(`${apiConfig.baseUrl}/schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                name,
                pet,
                phone,
                description,
                when,
            }),
        });
        alert("Agendamento enviado!");
    } catch (error) {
        alert("Não foi possível agendar. Tente novamente mais tarde");
        console.log("Error:", error);
    }
}