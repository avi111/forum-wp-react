import { Route, Routes } from "react-router-dom";
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
                key={route.path || (route.index ? "index" : "404")}
                path={route.path}
                index={route.index}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </AppProvider>
    </ToastProvider>
  );
}
