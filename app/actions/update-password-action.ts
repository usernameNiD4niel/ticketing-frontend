"use server";

import { updatePassword } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updatePasswordAction(newPassword: string, currentPassword: string) {
    const token = cookies().get("token")?.value;
    const email = cookies().get("email")?.value;

    if(!token || !email) {
        redirect("/login");
    }

    const response = await updatePassword(token, email, {newPassword, currentPassword});
    return response;
}