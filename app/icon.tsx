import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(
    join(process.cwd(), "public/images/APM_AUFHAUSER_Logo1.png"),
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: 32,
        height: 32,
        overflow: "hidden",
        position: "relative",
        background: "#f6f3ef",
      }}
    >
      <img
        alt=""
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={92}
        height={46}
        style={{ position: "absolute", left: -30, top: -3, maxWidth: 92 }}
      />
    </div>,
    size,
  );
}
