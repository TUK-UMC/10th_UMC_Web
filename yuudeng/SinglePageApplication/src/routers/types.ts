import type { ComponentType, ReactNode } from "react";

export interface RouteProps {
  path: string;
  component: ComponentType;
}

export interface RoutesProps {
  children: ReactNode;
}
