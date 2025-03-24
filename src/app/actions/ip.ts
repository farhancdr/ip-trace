import { headers } from "next/headers";

export async function getUserIp() {
  try {
    const hdrs = await headers();
    let forwardedFor = hdrs.get("x-forwarded-for");
    let realIp = hdrs.get("x-real-ip");

    if (forwardedFor) {
      return forwardedFor.split(",")[0].trim();
    }

    if (realIp) return realIp.trim();
    return "";
  } catch (error) {
    console.error("Error getting IP:", error);
    return "";
  }
}
