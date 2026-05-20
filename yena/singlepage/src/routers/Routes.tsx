import { Children, cloneElement, isValidElement, useMemo, type FC, type ReactNode, type ReactElement } from "react";
import type { RouteProps, RoutesProps } from "../routers/types";
import useCurrentPath from "../routers/useCurrentPath";

export const Routes: FC<RoutesProps> = ({ children }) => {
    const currentPath = useCurrentPath();
    const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
    }, [children, currentPath]);

    if (!activeRoute) return null;
    return cloneElement(activeRoute);
};

function isRouteElement(child: ReactNode): child is ReactElement<RouteProps> {
    return isValidElement(child) && "path" in (child.props as Record<string, unknown>);
}