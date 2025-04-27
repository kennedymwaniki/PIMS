import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../app/authSlice";
import { Heart, Pill, Eye, EyeOff } from "lucide-react";
import api from "../axios";
import axios from "axios";
import care from "../assets/doctors.jpeg";
import { toast } from "sonner";

type FormValues = {
  email: string;
  password: string;
};
type Notification = {
  message: string;
  type: "success" | "error";
};
type FormErrors = {
  email: string;
  password: string;
};

const Login = () => {
  const [loading, setIsloading] = useState(false);
  const [error, setError] = useState<FormErrors | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data: FormValues) => {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error("Server responded with an error:", err.response.data);
          throw new Error(err.response.data.message || "Login failed");
        } else if (err.request) {
          console.error("No response received:", err.request);
          throw new Error("No response from server");
        } else {
          console.error("Error setting up request:", err.message);
          throw new Error("Error setting up request");
        }
      } else {
        console.error("An unexpected error occurred:", err);
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsloading(true);

    try {
      const response = await login(data);

      // Check for errors in response
      if (!response || response.error) {
        toast.error(response?.message || "Login failed");
        setError(response?.errors || null);
        setNotification(response.message);
        return;
      }

      dispatch(loginUser({ user: response.user, token: response.token }));
      toast.success("Login successful, welcome back!");

      if (response.user.role === "Doctor") {
        navigate("/doctor");
      }
      if (response.user.role === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      // Error handling
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      toast.error(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsloading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen">
      {/* left side */}
      <div className="hidden md:flex md:flex-col md:w-1/2 bg-[#454BE7] relative">
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${care})` }}
          ></div>
        </div>

        <div className="absolute top-6 left-6 flex items-center z-10 text-white">
          <span className="text-xl font-bold">CHIMS</span>
        </div>

        <div className="absolute bottom-12 left-8 right-8 text-white z-10">
          <h2 className="text-4xl font-bold mb-4 uppercase">
            CEMA - Health information management system
          </h2>
          <p className="text-lg">
            A comprehensive health information management system that provides
            an easier way of managing health records, appointments, and patient
            information.
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="lg:hidden flex items-center justify-center mb-10">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Heart className="text-[#454BE7] absolute" size={24} />
              <Pill className="text-[#454BE7] absolute" size={24} />
            </div>
            <span className="text-xl font-bold text-[#454BE7]">CarePulse</span>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-[#454BE7] mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600 mb-8">
            Sign in to your CarePulse account
          </p>

          {notification && (
            <div
              className={
                notification?.type == "error"
                  ? "text-red-500 mb-4"
                  : "text-green-500 mb-4"
              }
            >
              {notification.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: true })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7]"
                />
              </div>
              {error?.email && (
                <div className="text-red-500 text-sm mt-1">{error.email}</div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-[#454BE7] hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7] pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {error?.password && (
                <div className="text-red-500 text-sm mt-1">
                  {error.password}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#454BE7] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#454BE7]"
                disabled={loading}
              >
                {loading ? "hold on tight ..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[#454BE7] hover:text-indigo-500 font-medium"
              >
                Create account
              </a>
            </p>
          </div>

          <div className="mt-16 text-center text-gray-400 text-sm">
            © 2025 CHIMS. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
