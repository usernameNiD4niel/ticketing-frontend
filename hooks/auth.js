import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";

export const useAuth = () => {
  const router = useRouter();
  const { toast } = useToast();

  const csrf = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };

  const updatePassword = async ({
    setError,
    handleSuccessForgotPassword,
    setIsLoadingButton,
    ...props
  }) => {
    await csrf();
    setError("");

    try {
      console.log("Forgot password PUT LOG: ", props);
      await axios.put("/api/update-password", props);
      handleSuccessForgotPassword();
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoadingButton(false);
  };

  const createTicket = async ({
    setBackendError,
    setIsLoadingButton,
    handleResetBehavior,
    token,
    ...props
  }) => {
    await csrf();
    setBackendError("");

    try {
      console.log(props);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      // axios.defaults.headers.common["Content-Type"] = "application/json";

      console.log(axios.defaults.headers);
      const response = await axios.post("/api/tickets", props);

      if (response.data) {
        toast({
          title: "Success",
          description: "Ticket created successfully",
          duration: 3000,
        });
        handleResetBehavior();
      }
    } catch (error) {
      console.log(error.response.status, error.response.status === 404);
      setBackendError(error.response.data.message);
    }

    setIsLoadingButton(false);
  };

  const getSpecificAccount = async ({
    setIsFetching,
    setError,
    token,
    email,
  }) => {
    await csrf();
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      const response = await axios.post("/api/accounts", { email });

      if (response.data) {
        setError("");
        console.log(response.data.account);
        setIsFetching(false);
        return response.data.account;
      }
    } catch (error) {
      setIsFetching(false);
      console.log("what is the error", error);
      setError(error.response.data.message);
      toast({
        title: "Error Account Not Found",
        description: "Please logout or refresh your browser",
        duration: 3000,
      });
    }
  };

  const getTickets = async ({ setIsFetching, token }) => {
    await csrf();
    try {
      console.log("props");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      const response = await axios.get("/api/tickets");

      if (response.data.success) {
        setIsFetching(false);
        return response.data.data;
      }
    } catch (error) {
      console.log("what is the error", error);
      // toast({
      //   title: "Error",
      //   description: error,
      //   duration: 3000,
      // });
    }
  };

  const login = async ({ setError, setIsLoadingButton, ...props }) => {
    await csrf();
    setError("");

    try {
      const response = await axios.post("/api/login", props);
      const { token } = response.data.data; // Extract the token from the response
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("email", props.email);
      // Save the token (e.g., in a cookie or localStorage)
      // You can use a library like 'js-cookie' for this
      // Example with 'js-cookie':
      // import Cookies from 'js-cookie';
      // Cookies.set('authToken', token, { expires: 7 });

      // Redirect to the desired page after successful login
      router.push("/");
    } catch (error) {
      console.log(error.response.status, error.response.status === 401);
      if (error.response.status === 401) {
        setError(error.response.data.message);
      } else {
        // throw error;
      }
    }
    setIsLoadingButton(false);
  };

  const register = async ({
    setBackendValidationError,
    setIsLoadingButton,
    reset,
    ...props
  }) => {
    await csrf();
    setBackendValidationError("");

    try {
      const response = await axios.post("/api/register", props);

      // Registration was successful, you can handle it as needed
      const { token } = response.data.data;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("email", props.email);
      reset();
      router.push("/");
    } catch (error) {
      console.log(error.response.status === 401, error);
      if (error.response.status === 401) {
        setBackendValidationError(error.response.data.message);
      } else {
        throw error;
      }
    }
    setIsLoadingButton(false);
  };

  const generateOtp = async ({
    setIsLoadingButton,
    setBackendValidationError,
    userObject,
    setUserData,
    ...props
  }) => {
    await csrf();
    setBackendValidationError("");

    try {
      const response = await axios.post("api/otp", props);
      const { otp } = response.data;
      console.log("The otp is: ", otp);
      userObject["otp"] = otp;
      console.log(userObject);
      setUserData(userObject);
      router.push("/register/otp");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.status === 422, "is error is equal to 422");
        console.log("The error is: ", error);
        setBackendValidationError(error.response.data.error);
      } else {
        throw error;
      }
    }
    setIsLoadingButton(false);
  };

  const reGenerateOtp = async ({
    setIsLoadingButton,
    setBackendValidationError,
    setResendOtp,
    ...props
  }) => {
    await csrf();
    setBackendValidationError("");
    try {
      const response = await axios.post("api/otp", props);
      const { otp } = response.data;
      setResendOtp(otp);
    } catch (error) {
      if (error.response.status === 422) {
        setBackendValidationError(error.response.data.error);
      } else {
        setBackendValidationError(
          "You might refresh the page, please click the back button"
        );
        throw error;
      }
    }
    setIsLoadingButton(false);
  };

  const forgotPassword = async ({
    setIsLoadingButton,
    setBackendValidationError,
    setGeneratedOtp,
    email,
  }) => {
    await csrf();

    try {
      const response = await axios.post("api/forgot-otp", { email });
      const { otp } = response.data;

      setGeneratedOtp(otp);
      toast({
        title: `The OTP has been sent to ${email}`,
        description: "Please check your email to see the 6 digit code",
      });
    } catch (error) {
      setBackendValidationError(
        "You might have a poor internet connection, please refresh your browser by pressing 'F5' or 'ctrl + r'"
      );
    }
    setIsLoadingButton(false);
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();
    setErrors([]);
    setStatus(null);

    try {
      const response = await axios.post("/reset-password", {
        token: router.query.token,
        ...props,
      });
      router.push("/login?reset=" + btoa(response.data.status));
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        throw error;
      }
    }
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios.post("/email/verification-notification").then((response) => {
      setStatus(response.data.status);
    });
  };

  const logout = async () => {
    // Perform the logout actions here
    // For example, clearing the token from cookies/localStorage
    // Redirect to the login page
    Cookies.remove("token");
    router.push("/login");
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    generateOtp,
    reGenerateOtp,
    updatePassword,
    createTicket,
    getTickets,
    getSpecificAccount,
  };
};
