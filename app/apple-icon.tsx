import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Icon() {
  const mark = await readFile(
    join(process.cwd(), "public/images/brand-mark.png"),
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <img
        alt=""
        src={`data:image/png;base64,${mark.toString("base64")}`}
        width={150}
        height={150}
        style={{ display: "block" }}
      />
    </div>,
    size,
  );
}
