"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getExportedTicketsAction(url: string) {
    const token = cookies().get("token")?.value;

    if(!token) {
        redirect("/login");
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.ok) {
        const data = await response.json();

        return {
            success: true,
            tickets: data.tickets as any[]
        }
      }

      return {
        success: false,
        tickets: []
      }
}