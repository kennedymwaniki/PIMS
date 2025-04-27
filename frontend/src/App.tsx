import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import MainDashboard from "./pages/MainDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SummaryPage from "./pages/SummaryPage";
import Patientslist from "./components/Patientslist";
import ProgramsList from "./components/ProgramsList";
import AppointmentsList from "./components/AppointmentsList";

const router = createBrowserRouter([
  {
    path: "/",
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
            path: "programs",
            element: <ProgramsList />,
          },
          {
            path: "appointments",
            element: <AppointmentsList />,
          },
          {
            path: "enrollments",
            element: <div>Enrollments Page</div>, // Temporary placeholder until you create an enrollments component
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
