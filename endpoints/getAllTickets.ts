import { Payment } from "@/constants/types";

export default async function getAllTickets(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets?isViewing=true`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    if(response.ok) {
        const data = await response.json();
        return data.tickets as Payment[];
    }

    return [];
}