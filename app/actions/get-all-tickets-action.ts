"use server";

import getAllTickets from "@/endpoints/getAllTickets";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getAllTIcketsAction() {
    const token = cookies().get("token")?.value;

    if(!token) {
        redirect("/login");
    }

    return await getAllTickets(token);
}