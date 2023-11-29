export default async function getOtpGenerated(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/otp/${email}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    return {
      success: true,
      otp: data.otp as string,
      message: data.message as string,
    };
  }

  if (response.status === 422) {
    return {
      success: false,
      otp: "",
      message: data.message as string,
    };
  }

  return {
    success: false,
    otp: "",
    message: "Cannot generate your OTP please try again",
  };
}
