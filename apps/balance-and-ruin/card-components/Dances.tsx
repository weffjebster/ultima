import { Card } from "@ff6wc/ui";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const startingDances: SubflagOption[] = [
  {
    defaultValue: [0, 2],
    flag: "-sdr",
    helperText: "Begin the game with {{ . }} dances learned",
    label: "Random",
    Renderable: ({ children }) => (
      <FlagRange flag="-sdr" helperText="" label={children} />
    ),
  },
];
export const Dances = () => {
  return (
    <Card title={"Dance"}>
      <div className="flex flex-col gap-2">
        <FlagSubflagSelect
          options={startingDances}
          nullable={{
            description: "Begin the game with no dances learned",
            label: "None",
          }}
          label="Starting Dances"
        />
        <FlagSwitch flag="-das" label="Shuffle Abilities" />
        <FlagSwitch flag="-dda" label="Display Abilities" />
        <FlagSwitch flag="-dns" label="No Stumble" />
        <FlagSwitch flag="-del" label="Everyone Learns" />
      </div>
    </Card>
  );
};
