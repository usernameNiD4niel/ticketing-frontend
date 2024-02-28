export default async function updatePassword(token: string, email: string, {currentPassword, newPassword}:{newPassword: string, currentPassword: string}) {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/${email}/change-password`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({currentPassword, newPassword})
    });

    const data = await response.json();

    if (response.ok) {
        return {
            success: true,
            message: data.message as string
        }
    }

    return {
        success: false,
        message: data.message as string ?? "Cannot update your password, please try again"
    }
}