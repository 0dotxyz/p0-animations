import { staticFile } from "remotion";

const TOKEN_ICON_BASE =
  "https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens";

/** Remote Supabase URL or local path under public/ */
export const resolveAssetSrc = (src: string) =>
  src.startsWith("http") ? src : staticFile(src);

/** Token icon URL from a Solana mint address (see README). */
export const tokenIconUrl = (mintAddress: string) =>
  `${TOKEN_ICON_BASE}/${mintAddress}.png`;
