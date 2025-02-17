import { Switch as BaseSwitch } from "@headlessui/react";
import { cva } from "cva";

const switchStyles = cva(
  [
    "relative inline-flex h-3 w-8 items-center border-1",
    "focus-visible:shadow-switch-focus",
    "focus-visible:outline-1 outline-black",
  ],
  {
    variants: {
      checked: {
        true: "bg-blue-600 border-blue-600",
        false: "bg-inputs-background border-inputs-border",
      },
    },
  }
);

const buttonStyles = cva(
  ["inline-block h-4 w-4 transform bg-black transition"],
  {
    variants: {
      checked: {
        true: "translate-x-4 bg-black",
        false: "translate-x-0 bg-zinc-400",
      },
    },
  }
);

export type SwitchProps = {
  checked?: boolean;
  description?: string;
  onChange?: (checked: boolean) => void;
};

export const Switch = ({ checked, description, onChange }: SwitchProps) => {
  return (
    <BaseSwitch
      checked={checked}
      onChange={onChange}
      className={switchStyles({ checked })}
    >
      <span className="sr-only">{description}</span>
      <span className={buttonStyles({ checked })} />
    </BaseSwitch>
  );
};
