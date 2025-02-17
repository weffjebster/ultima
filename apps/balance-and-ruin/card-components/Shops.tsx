import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import {
  FlagSelect,
  FlagSelectOption,
} from "~/components/FlagSelect/FlagSelect";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import {
  FlagSubflagSelect,
  SubflagOption,
} from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { Divider } from "~/design-components/Divider/Divider";

const inventoryOptions: SubflagOption[] = [
  {
    defaultValue: 20,
    flag: "-sisr",
    helperText:
      "Shop content is shuffled between shops. Items then have a {{.}}% to be randomized. Shops are shuffled by type (i.e. weapon shops are shuffled, armor shops are shuffled, etc…)",
    label: "Shuffle + Random",
    Renderable: ({ children }) => (
      <FlagSlider helperText={""} flag="-sisr" label={children} />
    ),
  },
  {
    defaultValue: true,
    flag: "-sirt",
    helperText:
      "Shop content is categorized by tier and chosen at random. Higher tier items and equipment are less likely to be chosen",
    label: "Random Tiered",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-sie",
    helperText: "All shops are empty",
    label: "Empty",
    isStatic: true,
  },
];

const shopPriceOptions: SubflagOption[] = [
  {
    defaultValue: [0, 65535],
    flag: "-sprv",
    helperText: "Each item's price is set to a value between {{.}}",
    label: "Random Value",
    Renderable: ({ children }) => (
      <FlagRange flag="-sprv" helperText="" label={children} />
    ),
  },
  {
    defaultValue: [75, 125],
    flag: "-sprp",
    helperText:
      "Each item's price is set to a value between {{.}}% of it's original value.",
    label: "Random Percent",
    Renderable: ({ children }) => (
      <FlagRange flag="-sprp" helperText="" label={children} />
    ),
  },
];

const sellPriceOptions: SubflagOption[] = [
  {
    defaultValue: true,
    flag: "-ssf4",
    helperText: "Items sell for 1/4 their price",
    label: "1/4",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-ssf8",
    helperText: "Items sell for 1/8 their price",
    label: "1/8",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-ssf0",
    helperText: "Items sell for 0",
    label: "Zero",
    isStatic: true,
  },
];
export const Shops = () => {
  return (
    <Card title={"Shops"}>
      <CardColumn>
        <FlagSubflagSelect
          options={inventoryOptions}
          label="Contents"
          nullable={{
            description: "Shops are unchanged",
            label: "Original",
          }}
        />
        <FlagSubflagSelect
          options={shopPriceOptions}
          label="Price"
          nullable={{
            description: "Item prices are unchanged",
            label: "Original",
          }}
        />
        <FlagSubflagSelect
          options={sellPriceOptions}
          label="Sell Price"
          nullable={{
            description: "Items sell for 1/2 their price",
            label: "1/2 (Original)",
          }}
        />
        <FlagSwitch flag="-snbr" label="No Breakable Rods" />
        <FlagSwitch
          flag="-sebr"
          helperText="Increases the base price of Poison, Fire, Ice, Thunder, Gravity, and Pearl Rods"
          label="Expensive Breakable Rods"
        />
        <Divider />
        <FlagSwitch flag="-snsb" label="No Super Balls" />
        <FlagSwitch
          flag="-sesb"
          helperText="Increases the base price of Super Balls"
          label="Expensive Super Balls"
        />
        <Divider />
        <FlagSwitch flag="-npi" label="No Priceless Items" />
        <FlagSwitch flag="-snes" label="No Elemental Shields" />
        <FlagSwitch flag="-snee" label="No Exp. Eggs" />
        <FlagSwitch flag="-snil" label="No Illuminas" />
      </CardColumn>
    </Card>
  );
};
