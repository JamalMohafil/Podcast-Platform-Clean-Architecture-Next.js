import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const fileExtension = path.extname(file.name).toLowerCase() || ".jpg";
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    const imageUrl = `${process.env.API_URL}/uploads/${uniqueFilename}`;
    return imageUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
