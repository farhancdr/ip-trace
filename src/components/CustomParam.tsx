"use client"

import { onCallServer } from "@/app/actions/game-start";

export const CustomParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get("custom");

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
