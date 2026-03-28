import type { RouteProps } from "./types";

const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};

export default Route;
