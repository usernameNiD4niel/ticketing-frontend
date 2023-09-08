import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useAuth = () => {
  const router = useRouter();

  const csrf = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };

  const login = async ({ setError, setIsLoadingButton, ...props }) => {
    await csrf();
    setError("");

    try {
      const response = await axios.post("/api/login", props);
      const { token } = response.data.data; // Extract the token from the response
      Cookies.set("token", token, { expires: 7 });
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
    ...props
  }) => {
    await csrf();
    setBackendValidationError("");

    try {
      const response = await axios.post("/api/register", props);
      // Registration was successful, you can handle it as needed
      const { token } = response.data.data;
      Cookies.set("token", token, { expires: 7 });
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

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();
    setErrors([]);
    setStatus(null);

    try {
      const response = await axios.post("/forgot-password", { email });
      setStatus(response.data.status);
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        throw error;
      }
    }
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
  };
};
