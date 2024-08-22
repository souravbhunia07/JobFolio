import { Button } from "./components/ui/button"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AppLayout from "./layouts/AppLayout.jsx";
import OnBoarding from "./pages/OnBoarding";
import JobListing from "./pages/JobListing";
import Job from "./pages/Job";
import PostJob from "./pages/PostJob";
import SavedJob from "./pages/SavedJob";
import MyJobs from "./pages/MyJobs";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/onboarding',
        element: <OnBoarding />
      },
      {
        path: '/jobs',
        element: <JobListing />
      },
      {
        path: '/job/:id',
        element: <Job />
      },
      {
        path: '/post-job',
        element: <PostJob />
      },
      {
        path: '/saved-job',
        element: <SavedJob />
      },
      {
        path: '/my-jobs',
        element: <MyJobs />
      },
    ]
  }
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App