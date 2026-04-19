import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./app/../styles/index.css";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);