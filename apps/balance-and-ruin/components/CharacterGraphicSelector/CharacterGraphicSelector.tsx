import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import SpriteDrawLoad from "~/components/SpriteDrawLoad/SpriteDrawLoad";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

import PortraitDrawLoad from "~/components/PortraitDrawLoad/PortraitDrawLoad";
import { Select, SelectOption } from "~/components/Select/Select";
import {
  defaultSpritePaletteString,
  defaultPaletteString,
  defaultPortraitString,
  defaultSpriteString,
} from "~/constants/graphicConstants";
import { CHARACTER_POSES } from "@ff6wc/ff6-types";

export type LoadPalettesResponse = {
  id: string;
  key: string;
  palette: number[][];
}[];

export type SpriteItem = { id: number; key: string };

export type LoadSpritesResponse = SpriteItem[];

export type CharacterGraphicSelectorProps = {
  id: number;
  Label: React.ReactNode;
  /** 5 for characters, 6 for field sprites */
  paletteOptionCount: 5 | 6;
  palettes: LoadPalettesResponse;
  portraitId: number;
  portraits: LoadSpritesResponse;
  sprites: LoadSpritesResponse;
};

export const CharacterGraphicSelector = ({
  id,
  Label,
  paletteOptionCount,
  portraitId,
  portraits,
  sprites,
}: CharacterGraphicSelectorProps) => {
  const dispatch = useDispatch();

  const rawSpriteString =
    useFlagValueSelector<string>("-cspr") ?? defaultSpriteString;

  const rawPaletteString =
    useFlagValueSelector<string>("-cspp") ?? defaultSpritePaletteString;

  const rawPaletteValuesString =
    useFlagValueSelector<string>("-cpal") ?? defaultPaletteString;

  const rawPortraitString =
    useFlagValueSelector<string>("-cpor") ?? defaultPortraitString;

  // -cspr values
  const spriteValues = rawSpriteString
    .split(".")
    .map((val) => Number.parseInt(val));

  // -cspp values
  const characterPaletteValues = rawPaletteString
    .split(".")
    .map((val) => Number.parseInt(val));

  // -cpal values
  const paletteValues = rawPaletteValuesString
    .split(".")
    .map((val) => Number.parseInt(val));

  // -cpor values
  const portraitValues = rawPortraitString
    .split(".")
    .map((val) => Number.parseInt(val));

  const spriteOptions: SelectOption[] = useMemo(
    () =>
      sprites.map<SelectOption>(({ id, key }) => ({
        label: key,
        value: id.toString(),
      })),
    [sprites]
  );

  const spritesById = spriteOptions.reduce((acc, spriteDef) => {
    acc[spriteDef.value] = spriteDef;
    return acc;
  }, {} as Record<string, SelectOption>);

  const portraitOptions: SelectOption[] = useMemo(
    () =>
      portraits.map<SelectOption>(({ id, key }) => ({
        label: key,
        value: id.toString(),
      })),
    [portraits]
  );

  const portraitsById = portraitOptions.reduce((acc, spriteDef) => {
    acc[spriteDef.value] = spriteDef;
    return acc;
  }, {} as Record<string, SelectOption>);

  const paletteOptions: SelectOption[] = Array.from(
    new Array(paletteOptionCount + 1)
  ).map((_val, idx) => ({
    label: `Palette ${idx}`,
    value: idx.toString(),
  }));

  const palettesById = paletteOptions.reduce((acc, spriteDef) => {
    acc[spriteDef.value] = spriteDef;
    return acc;
  }, {} as Record<string, SelectOption>);

  const [poseId, setPoseId] = useState(1);

  const onSpriteClick = () => {
    const idx = CHARACTER_POSES.indexOf(poseId);
    if (CHARACTER_POSES[idx + 1] != null) {
      setPoseId(CHARACTER_POSES[idx + 1]);
    } else {
      setPoseId(1);
    }
  };

  return (
    <div className="flex gap-8" key={id}>
      <div className="flex flex-col gap-3 items-center min-w-[150px]">
        {/* NAME INPUT */}
        {Label}
        {/* PORTRAIT + SPRITE */}
        <div className="flex justify-evenly items-end w-full">
          {portraitId !== null ? (
            <PortraitDrawLoad portraitId={portraitValues[portraitId]} />
          ) : null}
          <span>
            <SpriteDrawLoad
              onClick={onSpriteClick}
              paletteId={paletteValues[characterPaletteValues[id]]}
              poseId={poseId}
              spriteId={spriteValues[id]}
              scale={3}
            />
          </span>
        </div>
      </div>
      {/* Selects */}
      <div className="flex flex-col gap-3 flex-grow">
        {/* PORTRAIT */}
        {portraitId != null ? (
          <Select
            options={portraitOptions}
            onChange={(val) => {
              if (val) {
                const pors = [...portraitValues];
                pors.splice(portraitId, 1, Number.parseInt(val.value));
                dispatch(
                  setFlag({
                    flag: "-cpor",
                    value: pors.join("."),
                  })
                );
              }
            }}
            value={portraitsById[portraitValues[portraitId]]}
          />
        ) : null}
        {/* SPRITE */}
        <Select
          onChange={(val) => {
            if (val) {
              const sprs = [...spriteValues];
              sprs.splice(id, 1, Number.parseInt(val.value));
              dispatch(
                setFlag({
                  flag: "-cspr",
                  value: sprs.join("."),
                })
              );
            }
          }}
          options={spriteOptions}
          value={spritesById[spriteValues[id]]}
        />
        {/* PALETTE */}
        <Select
          options={paletteOptions}
          onChange={(val) => {
            if (val) {
              const pals = [...characterPaletteValues];
              pals.splice(id, 1, Number.parseInt(val.value));
              dispatch(
                setFlag({
                  flag: "-cspp",
                  value: pals.join("."),
                })
              );
            }
          }}
          value={palettesById[characterPaletteValues[id]]}
        />
      </div>
    </div>
  );
};
