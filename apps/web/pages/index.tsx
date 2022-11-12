import { QueryBuilder, SnesSession } from "@ff6wc/tracker-core";
import { Button } from "@ff6wc/ui";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import io from "socket.io-client";

const useSnesSession = () => {
  return React.useMemo(() => new SnesSession("ff6wc-tracker"), []);
};

const useTrackerInfo = (session: SnesSession) => {
  return useQuery(
    ["tracker-info"],
    async () => {
      await session.connect();
      const qb = new QueryBuilder(session);
      return qb.send(new GetSaveDataQuery());
    },
    {
      refetchInterval: 1000,
    }
  );
};

export default function Web() {
  const session = useSnesSession();
  const { data } = useTrackerInfo(session);

  useEffect(
    () =>
      void (async function () {
        await fetch("/api/socket");
        const socket = io();

        const onConnect = () => {
          console.log("connected");
        };
        socket.on("connect", onConnect);
        return () => {
          console.log("disconnecting");
          socket.off("connect", onConnect);
        };
      })(),
    []
  );

  return (
    <div>
      <h1>Web</h1>
      <Button />
      <textarea readOnly value={session.logMessages} />
      <textarea readOnly value={data ? JSON.stringify(data) : ""} />
    </div>
  );
}
