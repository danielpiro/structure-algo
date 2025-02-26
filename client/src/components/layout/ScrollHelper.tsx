import React from "react";

interface ScrollHelperProps {
  children: (handleClick: (elementId: string) => void) => React.ReactNode;
}

export const ScrollHelper: React.FC<ScrollHelperProps> = ({ children }) => {
  const handleClick = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return <>{children(handleClick)}</>;
};
