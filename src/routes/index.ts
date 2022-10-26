import express from 'express';
import fs from 'fs';
import path from 'path';
import imageResize from '../utilities/image_resizing';
import { checkParameters, ParamsInfo } from '../utilities/checkParameters';

const routes = express.Router();

routes.get(
  '/images',
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (checkParameters(req.query as unknown as ParamsInfo)) {
      const filename = req.query.filename as string;

      const width = Number(req.query.width);

      const height = Number(req.query.height);

      const image_resized: string =
        path.join(__dirname, '../', '../', 'assets/', 'result/', filename) +
        `-${width}-${height}.jpg`;

      if (fs.existsSync(image_resized)) {
        res.sendFile(image_resized);
      } else {
        const imageProcessed = await imageResize(
          filename as string,
          width,
          height
        );

        if (!String(imageProcessed).includes('Error')) {
          res.sendFile(imageProcessed);
        } else {
          res
            .status(404)
            .send('There is no such file name on the server,try again.');
        }
      }
    } else {
      res
        .status(500)
        .send(
          'Please set a filename as string, width and height as a number parameters in the url .'
        );
    }
  }
);

export default routes;
