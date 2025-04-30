import { headers } from "next/headers";

export interface IpInfo {
  ip: string;
  source: string;
}

export async function getUserIp(): Promise<IpInfo> {
  try {
    const hdrs = await headers();
    const forwardedFor = hdrs.get("x-forwarded-for");
    const realIp = hdrs.get("x-real-ip");
    const cfConnectingIp = hdrs.get("cf-connecting-ip");

    if (forwardedFor) {
      return { 
        ip: forwardedFor.split(",")[0].trim(),
        source: "x-forwarded-for"
      };
    }

    if (realIp) {
      return {
        ip: realIp.trim(),
        source: "x-real-ip"
      };
    }

    if (cfConnectingIp) {
      return {
        ip: cfConnectingIp.trim(),
        source: "cf-connecting-ip"
      };
    }

    // Fallback to external service if headers don't provide IP
    const response = await fetch("https://api.ipify.org?format=json", { 
      cache: "no-store" 
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        ip: data.ip,
        source: "ipify-api"
      };
    }

    return { ip: "Unknown", source: "none" };
  } catch (error) {
    console.error("Error getting IP:", error);
    return { ip: "Error", source: "error" };
  }
}
