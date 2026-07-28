import React from "react";

interface TimelineContentProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  animationNum?: number;
}

export function TimelineContent({
  children,
  as: Component = "div",
  className,
  animationNum,
}: TimelineContentProps) {
  return (
    <Component className={className} data-animation-num={animationNum}>
      {children}
    </Component>
  );
}
