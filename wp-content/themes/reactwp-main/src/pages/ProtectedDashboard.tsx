import React, { useEffect } from "react";
import { PageView } from "../types.ts";
import { useNavigation } from "../hooks/useNavigation.ts";

export const ProtectedDashboard: React.FC = () => {
  const { getPath } = useNavigation();

  useEffect(() => {
    window.location.href = getPath(PageView.DASHBOARD);
  }, [getPath]);

  return null;
};
