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
        console.log("test", response.data.account);
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
    try {
      console.log("props");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      const response = await axios.get("/api/all-tickets");

      if (response.data.tickets) {
        setIsFetching(false);
        return response.data.tickets;
      }
    } catch (error) {
      console.log("what is the error", error);
    }
  };

  const login = async ({ setError, setIsLoadingButton, ...props }) => {
    await csrf();
    setError("");

    try {
      const response = await axios.post("/api/login", props);
      const { token, role } = response.data.data; // Extract the token from the response
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("email", props.email, { expires: 7 });
      Cookies.set("role", role, { expires: 7 });
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
      setIsLoadingButton(false);
    }
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
      Cookies.set("email", props.email, { expires: 7 });
      Cookies.set("role", props.role, { expires: 7 });
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

  const getPendingRoles = async ({ setIsFetching, setBackendError, token }) => {
    await csrf();
    setBackendError("");

    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get("api/pending-role");

      if (response.data) {
        setBackendError("");
        setIsFetching(false);
        console.log("users: ", response.data.users);
        return response.data.users;
      }
    } catch (error) {}
    setIsFetching(false);
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

  const updatePendingRoles = async ({
    setIsLoadingButton,
    setBackendValidationError,
    emails,
    role,
  }) => {
    await csrf();
    setBackendValidationError("");

    try {
      const response = await axios.post("api/pending-role", {
        emails,
        role,
      });

      if (response.data.message) {
        setIsLoadingButton(false);
        return response.data;
      }
    } catch (error) {
      setBackendValidationError(error.response.data.message);
      setIsLoadingButton(false);
    }
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

  const getUnHandledTickets = async ({ setIsFetching, setError, token }) => {
    await csrf();
    setError("");

    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get("api/unhandled-tickets");

      if (response.data) {
        setIsFetching(false);
        return response.data.tickets;
      } else {
        setError(
          "Please press F5 or refresh or browser, if your're still seeing this try to relogin"
        );
      }
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsFetching(false);
  };

  const getAllChampions = async ({ setError, setChampions, token }) => {
    await csrf();
    setError("");

    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const champions = await axios.get("/api/champions");
      setChampions(champions.data.champions);
    } catch (error) {
      setError("Please press F5 or ctrl + r");
      console.error(error);
    }
  };

  const getSpecificTicketStatus = async ({
    setError,
    setStatus,
    token,
    id,
  }) => {
    await csrf();
    setError("");

    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const status = await axios.get(`/api/tickets/${id}/status`);
      setStatus(status.data.status);
    } catch (error) {
      if (error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError("Please press F5 or ctrl + r");
      }
      console.error(error);
    }
  };

  const getPriority = async ({ setError, setPriority, token, id }) => {
    await csrf();
    setError("");

    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const status = await axios.get(`/api/tickets/${id}/priority`);
      setPriority(status.data.priority);
    } catch (error) {
      if (error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError("Please press F5 or ctrl + r");
      }
      console.error(error);
    }
  };

  const getSpecificAsssignTo = async ({ setError, setAssignTo, token, id }) => {
    await csrf();
    setError("");

    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const status = await axios.get(`/api/tickets/${id}/assigned-to`);
      setAssignTo(status.data.assigned_to);
    } catch (error) {
      if (error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError("Please press F5 or ctrl + r");
      }
      console.error(error);
    }
  };

  const isUserOwnerOfTicket = async ({ setSuccess, token, ...props }) => {
    await csrf();

    console.log("props object: ", props);
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const status = await axios.post(`/api/email-check`, props);
      setSuccess(status.data.success);
    } catch (error) {
      setSuccess(false);
    }
  };

  const getCurrentUserName = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const name = await axios.get("api/name");
      console.log(name.data.name, "current user name");

      return name.data.name;
    } catch (error) {
      throw error;
    }
  };

  const updateSpecifiedTicketField = async ({
    token,
    id,
    setError,
    setIsLoading,
    ...props
  }) => {
    setError("");
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const { data } = await axios.patch(`/api/all-tickets/${id}`, props);
      if (data.message) {
        toast({
          title: "Update Successfully",
          description: "You have successfully updated ticket " + id,
        });
      }
    } catch (error) {
      setError("Please press F5 or ctrl + r to refresh your browser data");
      console.log(error);
    }
    setIsLoading(false);
  };

  const getSpecificTicket = async ({ id, setIsFetching, token }) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/all-tickets/${id}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            Authorization: "Bearer " + token,
            Accept: "Content-Type",
          },
          cache: "no-store",
        }
      ).then((res) => res.json());

      console.log("response: ", response);
      if (response.ticket) {
        setIsFetching(false);
        return response.ticket;
      }
    } catch (error) {
      console.log("fetch error: ", error);
    }
  };

  const getUnsetCounts = async (token) => {
    try {
      const response = fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-count`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          cache: "no-store",
        }
      ).then((res) => res.json());
      return response;
    } catch (error) {
      console.log("getUnsetCounts: ", error);
    }
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
    getPendingRoles,
    updatePendingRoles,
    getUnHandledTickets,
    getAllChampions,
    getSpecificTicketStatus,
    getPriority,
    getSpecificAsssignTo,
    isUserOwnerOfTicket,
    getCurrentUserName,
    updateSpecifiedTicketField,
    getSpecificTicket,
    getUnsetCounts,
  };
};
