import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { RecommendationPage } from "./pages/RecommendationPage";
import { ComparisonPage } from "./pages/ComparisonPage";
import { ToolDetailsPage } from "./pages/ToolDetailsPage";
import { AboutPage } from "./pages/AboutPage";
import { WorkflowPage } from "./pages/WorkflowPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><LandingPage /></Layout>,
  },
  {
    path: "/explore",
    element: <Layout><RecommendationPage /></Layout>,
  },
  {
    path: "/compare",
    element: <Layout><ComparisonPage /></Layout>,
  },
  {
    path: "/tool/:toolId",
    element: <Layout><ToolDetailsPage /></Layout>,
  },
  {
    path: "/about",
    element: <Layout><AboutPage /></Layout>,
  },
  {
    path: "/workflow",
    element: <Layout><WorkflowPage /></Layout>,
  },
  {
    path: "*",
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
            <a href="/" className="text-blue-600 hover:underline">Go back home</a>
          </div>
        </div>
      </Layout>
    ),
  },
]);