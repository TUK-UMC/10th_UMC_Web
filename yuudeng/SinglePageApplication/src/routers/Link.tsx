import type { MouseEvent, ReactNode } from "react";

interface LinkProps {
  to: string;
  children: ReactNode;
}

const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a href={to} onClick={handleClick} style={{ padding: "4px" }}>
      {children}
    </a>
  );
};

export default Link;
