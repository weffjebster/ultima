import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

export const BossAI = () => {
  return (
    <Card title={"Boss AI"}>
      <CardColumn>
        <FlagSwitch flag="-dgne" label="Doom Gaze No Escape" />
        <FlagSwitch flag="-wnz" label="Wrexsoul No Zinger" />
        <FlagSwitch flag="-mmnu" label="MagiMaster No Ultima" />
        <FlagSwitch flag="-cmd" label="Chadarnook More Demon" />
      </CardColumn>
    </Card>
  );
};
