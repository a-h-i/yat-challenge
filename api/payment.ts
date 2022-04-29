import fetch from "cross-fetch";
import { Yat } from "./types";

export async function lookupAddress(yat: Yat) {
  const response = await fetch([process.env.API_URL, 'api', 'emoji_id', yat, 'payment'].join('/'));
  return response.json();
}