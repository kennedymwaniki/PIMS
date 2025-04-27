import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import MainDashboard from "./pages/MainDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SummaryPage from "./pages/SummaryPage";
import Patientslist from "./components/Patientslist";
import ProgramsList from "./components/ProgramsList";
import AppointmentsList from "./components/AppointmentsList";
import ClientsProfile from "./components/ClientsProfile";
import Enrollmentslist from "./components/Enrollmentslist";
import Registration from "./pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/doctor",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <MainDashboard />,
        children: [
          {
            index: true,
            element: <SummaryPage />,
          },
          {
            path: "clients",
            element: <Patientslist />,
          },
          {
            path: "clients/:clientId",
            element: <ClientsProfile />,
          },
          {
            path: "programs",
            element: <ProgramsList />,
          },
          {
            path: "appointments",
            element: <AppointmentsList />,
          },
          {
            path: "enrollments",
            element: <Enrollmentslist />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
