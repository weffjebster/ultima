import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "~/design-components/Divider/Divider";

export const Challenges = () => {
  return (
    <Card title={"Challenges"}>
      <CardColumn>
        <FlagSwitch flag="-nmc" label="No Moogle Charms" />
        <FlagSwitch flag="-nee" label="No Exp. Eggs" />
        <FlagSwitch flag="-nil" label="No Illuminas" />
        <FlagSwitch flag="-nfps" label="No Free Paladin Shields" />
        <Divider />
        <FlagSwitch flag="-pd" label="Permadeath" />
        <FlagSwitch flag="-bnds" label="Normalize & Distort Boss Stats" />
        <FlagSwitch
          flag="-srp3"
          helperText="Allow Phunbaba 3 to be shuffled and randomized (Otherwise he will only appear in Mobliz WOR)"
          label="Add Phunbaba 3 to Boss Pool"
        />
      </CardColumn>
    </Card>
  );
};
