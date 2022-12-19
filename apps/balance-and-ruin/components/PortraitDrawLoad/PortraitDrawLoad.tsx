import React from "react";
import useSWRImmutable from "swr/immutable";
import { PortraitDraw } from "~/components/PortraitDraw/PortraitDraw";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type LoadSpriteResponse = {
  palette: number[][];
  sprite: number[];
};

type PortraitDrawLoadProps = {
  portraitId: string | number;
  scale?: number;
};

export default function PortraitDrawLoad({
  portraitId,
  scale = 3,
}: PortraitDrawLoadProps) {
  const { data, error } = useSWRImmutable<LoadSpriteResponse>(
    `/api/portrait/${portraitId}`,
    fetcher
  );

  const { alphaBytes, rgbBytes } = React.useMemo(() => {
    if (!data) {
      return {
        alphaBytes: [],
        rgbBytes: [],
      };
    }
    const { palette = [], sprite = [] } = data;

    const alphaBytes = palette[0];
    const rgbBytes = sprite.map((i) => palette[i]).flat();

    return { alphaBytes, rgbBytes };
  }, [data]);

  const SpriteRender = (
    <PortraitDraw alphaBytes={alphaBytes} rgbBytes={rgbBytes} scale={scale} />
  );

  return <>{SpriteRender}</>;
}
