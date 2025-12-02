import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { routeConfig } from "./routes";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routeConfig.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppProvider>
    </ToastProvider>
  );
}
