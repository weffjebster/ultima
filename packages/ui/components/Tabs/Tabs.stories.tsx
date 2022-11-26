import { useState } from "react";
import { TabItemProps } from "../TabItem/TabItem";
import { Tabs } from "./Tabs";

export default {
  title: "Tabs",
};

const tabs: TabItemProps["item"][] = [
  {
    content: <>Hello world</>,
    id: "game",
    label: "Game",
  },
  {
    content: <input />,
    id: "party",
    label: "Party",
  },
  {
    content: "wow",
    id: "battle",
    label: "Battle",
  },
];

export const Default = () => {
  const [selected, setSelected] = useState(tabs[0]);
  return (
    <div className={"flex flex-col"}>
      <Tabs
        onChange={(item) => setSelected(item)}
        selected={selected}
        tabs={tabs}
      />

      <p>Tab {selected.id} Selected</p>
    </div>
  );
};
