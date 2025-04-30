/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const onCallServer = async ({
  payload,
}: {
  payload: any;
}): Promise<string> => {
  try {
    const myParam = payload.myParam;
    console.log("🚀 ~ myParam:", myParam)
    return `Your custom param is ${myParam}`;
  } catch (error) {
    console.log("error: GAME_START: ", JSON.stringify(error));
    return "Error: " + JSON.stringify(error);
  }
};
