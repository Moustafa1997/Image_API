//for resizing an specific image ;
import path from 'path';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import fs2 from 'fs';

const resizing_image = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const image_Input: string =
    path.join(__dirname, '../', '../', 'assets/', 'up_images/', filename) +
    '.jpg';
  const image_Output_File: string = path.join(
    __dirname,
    '../',
    '../',
    'assets/',
    'result/'
  );
  const image_Output: string =
    path.join(__dirname, '../', '../', 'assets/', 'result/', filename) +
    `-${width}-${height}.jpg`;

  if (!fs2.existsSync(image_Output_File)) {
    await fs.mkdir(image_Output_File);
  }

  try {
    await sharp(image_Input).resize(width, height).toFile(image_Output);
    return image_Output;
  } catch (error: any) {
    return error;
  }
};

export default resizing_image;
