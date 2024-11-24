import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const highlightsPath = path.join(process.cwd(), "public", "highlights");

  try {
    const years = fs.readdirSync(highlightsPath); // Read year folders

    const data = years.reduce(
      (acc, year) => {
        const yearPath = path.join(highlightsPath, year);
        const files = fs.readdirSync(yearPath);

        files.forEach((file) => {
          const fileData = {
            year,
            file,
            url: `/highlights/${year}/${file}`, // Public URL
          };

          // Separate files based on extension
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
      { videos: [], images: [] } // Initial structure
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading highlights:", error);
    res.status(500).json({ error: "Failed to read highlights." });
  }
}
