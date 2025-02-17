import { cva, cx } from "cva";
import React from "react";

export type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  contentClassName?: string;
  title: React.ReactNode;
  variant?: "default" | "primary";
};

const containerStyles = cva([
  "bg-panel-background",
  "rounded-none",
  "shadow-[0px_0px_1px_0px_rgba(0,0,0,0.75)]",
]);

const contentStyles = cva([
  "flex flex-col gap-4",
  "mb-6",
  "px-4 py-3",
  "bg-panel-background",
  " border-panel-border",
]);

const headingStyles = cva(["px-4 py-2", "font-medium"], {
  variants: {
    variant: {
      default: ["bg-panel-header-background"],
      primary: ["bg-blue-700", "text-white"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Card = ({
  children,
  className,
  contentClassName,
  title,
  variant = "default",
  ...rest
}: CardProps) => {
  return (
    <div
      className={cx(
        "WC-Card",
        className,
        "col-span-6 inline-block h-fit w-full"
      )}
    >
      <div {...rest} className={cx(containerStyles())}>
        <div className={headingStyles({ variant })}>{title}</div>
        <div className={cx(contentStyles(), contentClassName)}>{children}</div>
      </div>
    </div>
  );
};
