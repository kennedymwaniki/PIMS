import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Heart, Pill, Eye, EyeOff } from "lucide-react";
import api from "../axios";
import axios from "axios";
import care from "../assets/doctors.jpeg";
import { toast } from "sonner";

type FormValues = {
  email: string;
  password: string;
  role: "Doctor" | "admin";
  name: string;
  contact: string;
};

type Notification = {
  message: string;
  type: "success" | "error";
};

type FormErrors = {
  email?: string;
  password?: string;
  role?: string;
  name?: string;
  contact?: string;
};

const Registration = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<FormErrors | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      role: "Doctor",
    },
  });
  const navigate = useNavigate();

  const registerUser = async (data: FormValues) => {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error("Server responded with an error:", err.response.data);
          throw new Error(err.response.data.message || "Registration failed");
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
    setIsLoading(true);

    try {
      const response = await registerUser(data);

      // Check for errors in response
      if (!response || response.error) {
        toast.error(response?.message || "Registration failed");
        setError(response?.errors || null);
        setNotification({ message: response.message, type: "error" });
        return;
      }

      toast.success("Registration successful!");
      setNotification({
        message: "Account created successfully! You can now login.",
        type: "success",
      });

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Error handling
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      toast.error(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
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
            Create Account
          </h1>
          <p className="text-gray-600 mb-8">Register to access the system</p>

          {notification && (
            <div
              className={
                notification?.type === "error"
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: true })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7]"
                />
              </div>
              {error?.name && (
                <div className="text-red-500 text-sm mt-1">{error.name}</div>
              )}
            </div>

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
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Number
              </label>
              <div className="relative">
                <input
                  id="contact"
                  type="text"
                  placeholder="1234567890"
                  {...register("contact", { required: true })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7]"
                />
              </div>
              {error?.contact && (
                <div className="text-red-500 text-sm mt-1">{error.contact}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  {...register("role", { required: true })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-[#454BE7] focus:border-[#454BE7]"
                >
                  <option value="Doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {error?.role && (
                <div className="text-red-500 text-sm mt-1">{error.role}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
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
                {loading ? "Processing..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#454BE7] hover:text-indigo-500 font-medium"
              >
                Sign in
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

export default Registration;
