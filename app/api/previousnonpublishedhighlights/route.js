import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const highlightsPath = path.join(process.cwd(), "public", "kuza memories");

  try {
    const years = fs.readdirSync(highlightsPath);

    const data = years.reduce(
      (acc, year) => {
        const yearPath = path.join(highlightsPath, year);
        const files = fs.readdirSync(yearPath);

        files.forEach((file) => {
          const fileData = {
            year,
            file,
            url: `/kuza memories/${year}/${file}`, // Public URL
          };

          if (file.endsWith(".mp4") || file.endsWith(".mov")) {
            acc.videos.push(fileData);
          } else if (
            file.endsWith(".jpg") ||
            file.endsWith(".jpeg") ||
            file.endsWith(".png") ||
            file.endsWith(".gif")
          ) {
            acc.images.push(fileData);
          }
        });

        return acc;
      },
      { videos: [], images: [] }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading highlights:", error);
    return NextResponse.json({ error: "Failed to read highlights." }, { status: 500 });
  }
}
