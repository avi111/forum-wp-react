import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { routeConfig } from "./routes";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import { Toast } from "./components/Toast";
import "./index.css";
import { QuestionnairePage } from "./pages/QuestionnairePage";

export default function App() {
  return (
    <ToastProvider>
      <Toast />
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routeConfig.map((route) => (
              <Route
                key={route.path || (route.index ? "index" : "404")}
                path={route.path}
                index={route.index}
                element={route.element}
              />
            ))}
            <Route path="/questionnaire/:id" element={<QuestionnairePage />} />
          </Route>
        </Routes>
      </AppProvider>
    </ToastProvider>
  );
}
