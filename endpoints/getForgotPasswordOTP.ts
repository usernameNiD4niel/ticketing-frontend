export default async function getForgotPasswordOTP(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forgot-otp/${email}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let success = false;
  let otp = "";
  const data = await response.json();

  if (response.ok) {
    success = true;
    otp = data.otp;
  }

  return {
    success,
    otp,
    message: data.message as string,
  };
}
