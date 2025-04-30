"use client"

import { onCallServer } from "@/actions/game-start";
import { useEffect, useState } from "react";

export const CustomParam = () => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setValue(urlParams.get("custom"));
  }, []);

  function handleClick() {
    onCallServer({
      payload: {
        myParam: value,
      },
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Call Server action</button>
    </div>
  );
};
