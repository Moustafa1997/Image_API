import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index';
import resizing_image from '../utilities/image_resizing';
const request = supertest(app);

describe('Test endpoint response', () => {
  it(' it returns a 500 error if no parameters are set', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(500);
  });
});

describe('Test image processing', () => {
  const filename = 'fjord';
  const width = '400';
  const height = '300';
  const outputPath =
    path.join(__dirname, '../', '../', 'assets/', 'result/', filename) +
    `-${width}-${height}.jpg`;

  it('resizes an image when all parameters are set in the url', async () => {
    await request.get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(fs.existsSync(outputPath)).toBeTrue();
  });

  it('tests the resizing function to provide resized images', () => {
    expect(resizing_image).not.toThrowError;
  });
});
