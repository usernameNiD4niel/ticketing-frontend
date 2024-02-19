"use server";

import { PaginatedType } from "@/constants/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getPaginatedTicketsAction(url: string) {
    const token = cookies().get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    const response = await fetch(`${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();

        console.log(`success ::: ${JSON.stringify(data, null, 2)}`);
        return {
            data: data as PaginatedType,
            success: true
        };
    }

    console.log(`failed :::`);

    return {
        data: {} as PaginatedType,
        success: false
    };
}